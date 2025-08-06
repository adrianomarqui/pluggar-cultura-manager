import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, supabase } from '../lib/supabase'
import { Plus, Calendar, Users, LogOut, Edit, Trash2, Search } from 'lucide-react'
import CreateMeetingModal from './CreateMeetingModal'

function Dashboard({ user }) {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadMeetings()
  }, [])

  const loadMeetings = async () => {
    try {
      const data = await db.getMeetings(user.id)
      setMeetings(data)
    } catch (error) {
      console.error('Erro ao carregar reuniões:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMeeting = async (meetingData) => {
    try {
      const newMeeting = await db.createMeeting({
        ...meetingData,
        user_id: user.id,
      })
      setMeetings([newMeeting, ...meetings])
      setShowCreateModal(false)
    } catch (error) {
      console.error('Erro ao criar reunião:', error)
      alert('Erro ao criar reunião. Tente novamente.')
    }
  }

  const handleDeleteMeeting = async (meetingId) => {
    if (!confirm('Tem certeza que deseja excluir esta reunião?')) return

    try {
      await db.deleteMeeting(meetingId)
      setMeetings(meetings.filter(m => m.id !== meetingId))
    } catch (error) {
      console.error('Erro ao excluir reunião:', error)
      alert('Erro ao excluir reunião. Tente novamente.')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    if (score >= 40) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excelente'
    if (score >= 60) return 'Bom'
    if (score >= 40) return 'Regular'
    return 'Inicial'
  }

  const filteredMeetings = meetings.filter(meeting =>
    meeting.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar reuniões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary px-4 py-2 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Reunião
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Reuniões</p>
                <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reuniões Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {meetings.filter(m => m.cultural_score > 0).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">%</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Score Médio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {meetings.length > 0
                    ? Math.round(meetings.reduce((acc, m) => acc + (m.cultural_score || 0), 0) / meetings.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meetings List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Suas Reuniões</h3>
          </div>
          
          {filteredMeetings.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">
                {meetings.length === 0
                  ? 'Nenhuma reunião criada ainda. Clique em "Nova Reunião" para começar.'
                  : 'Nenhuma reunião encontrada com esse termo de busca.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMeetings.map((meeting) => (
                <div key={meeting.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {meeting.name}
                        </h4>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getScoreColor(meeting.cultural_score || 0)
                        }`}>
                          {meeting.cultural_score || 0}% - {getScoreLabel(meeting.cultural_score || 0)}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(meeting.created_at)}
                        </span>
                        {meeting.observations && (
                          <span className="text-gray-400">• Com observações</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/meeting/${meeting.id}`)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteMeeting(meeting.id)}
                        className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <CreateMeetingModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateMeeting}
        />
      )}
    </div>
  )
}

export default Dashboard