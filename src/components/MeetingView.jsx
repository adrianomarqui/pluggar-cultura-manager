import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../lib/supabase'
import { ArrowLeft, Save, RotateCcw, MessageSquare } from 'lucide-react'
import { cultureSections } from '../data/cultureData'
import ChecklistSection from './ChecklistSection'
import ObservationsSection from './ObservationsSection'
import CulturalSummary from './CulturalSummary'

function MeetingView({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meeting, setMeeting] = useState(null)
  const [evaluations, setEvaluations] = useState({})
  const [observations, setObservations] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadMeetingData()
  }, [id])

  const loadMeetingData = async () => {
    try {
      const [meetingData, evaluationsData] = await Promise.all([
        db.getMeeting(id, user.id),
        db.getMeetingEvaluations(id)
      ])

      setMeeting(meetingData)
      setObservations(meetingData.observations || '')
      
      // Convert evaluations array to object
      const evaluationsObj = {}
      evaluationsData.forEach(eval => {
        evaluationsObj[eval.culture_item_id] = eval.is_implemented
      })
      setEvaluations(evaluationsObj)
    } catch (error) {
      console.error('Erro ao carregar dados da reunião:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleEvaluationChange = async (itemId, value) => {
    try {
      // Update local state immediately
      setEvaluations(prev => ({
        ...prev,
        [itemId]: value
      }))

      // Save to database
      await db.upsertEvaluation({
        meeting_id: id,
        culture_item_id: itemId,
        is_implemented: value
      })

      // Update meeting score
      updateCulturalScore()
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error)
    }
  }

  const updateCulturalScore = async () => {
    const totalItems = cultureSections.reduce((sum, section) => sum + section.items.length, 0)
    const implementedItems = Object.values(evaluations).filter(Boolean).length
    const score = Math.round((implementedItems / totalItems) * 100)

    try {
      await db.updateMeeting(id, {
        cultural_score: score
      })
      setMeeting(prev => ({ ...prev, cultural_score: score }))
    } catch (error) {
      console.error('Erro ao atualizar score cultural:', error)
    }
  }

  const handleSaveObservations = async () => {
    setSaving(true)
    try {
      await db.updateMeeting(id, {
        observations: observations
      })
      setMeeting(prev => ({ ...prev, observations }))
    } catch (error) {
      console.error('Erro ao salvar observações:', error)
      alert('Erro ao salvar observações. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const handleClearAll = async () => {
    if (!confirm('Tem certeza que deseja limpar todas as avaliações?')) return

    try {
      setEvaluations({})
      // Here you would also clear from database
      // For now, we'll just update the UI and score
      await db.updateMeeting(id, { cultural_score: 0 })
      setMeeting(prev => ({ ...prev, cultural_score: 0 }))
    } catch (error) {
      console.error('Erro ao limpar avaliações:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Reunião não encontrada.</p>
      </div>
    )
  }

  const totalItems = cultureSections.reduce((sum, section) => sum + section.items.length, 0)
  const implementedItems = Object.values(evaluations).filter(Boolean).length
  const implementationRate = Math.round((implementedItems / totalItems) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-400 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-primary-500 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  🚀 Checklist Cultura Pluggar
                </h1>
                <p className="text-primary-100 mt-1">
                  Avaliação Cultural Organizacional – Gente & Cultura
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meeting Info & Progress */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{meeting.name}</h2>
            <button
              onClick={handleClearAll}
              className="btn btn-danger px-4 py-2 flex items-center text-sm"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpar Todos
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {implementedItems} de {totalItems} itens concluídos ({implementationRate}%)
          </div>
        </div>

        {/* Checklist Sections */}
        <div className="space-y-8">
          {cultureSections.map((section) => (
            <ChecklistSection
              key={section.id}
              section={section}
              evaluations={evaluations}
              onEvaluationChange={handleEvaluationChange}
            />
          ))}
        </div>

        {/* Observations Section */}
        <ObservationsSection
          observations={observations}
          onObservationsChange={setObservations}
          onSave={handleSaveObservations}
          saving={saving}
        />

        {/* Cultural Summary */}
        <CulturalSummary
          implementedItems={implementedItems}
          totalItems={totalItems}
          implementationRate={implementationRate}
          culturalScore={meeting.cultural_score || 0}
        />
      </main>
    </div>
  )
}

export default MeetingView