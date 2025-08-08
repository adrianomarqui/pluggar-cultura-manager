import { TrendingUp, Users, Target, Award } from 'lucide-react'

function CulturalSummary({ implementedItems, totalItems, implementationRate, culturalScore }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-200'
    if (score >= 40) return 'text-orange-600 bg-orange-100 border-orange-200'
    return 'text-red-600 bg-red-100 border-red-200'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excelente'
    if (score >= 60) return 'Bom'
    if (score >= 40) return 'Regular'
    return 'Inicial'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-5 w-5 text-primary-500" />
        <h3 className="text-lg font-semibold text-gray-900">Resumo Cultural</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-primary-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Itens Avaliados</p>
              <p className="text-xl font-bold text-gray-900">{implementedItems}/{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Implementação</p>
              <p className="text-xl font-bold text-gray-900">{implementationRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Award className="h-6 w-6 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Score Cultural</p>
              <p className="text-xl font-bold text-gray-900">{culturalScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(culturalScore)}`}>
              {getScoreLabel(culturalScore)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h4 className="font-medium text-primary-800 mb-2">Interpretação do Score</h4>
        <div className="text-sm text-primary-700 space-y-1">
          <p><strong>80-100%:</strong> Cultura organizacional excelente, valores bem estabelecidos</p>
          <p><strong>60-79%:</strong> Boa aderência cultural, algumas áreas para desenvolvimento</p>
          <p><strong>40-59%:</strong> Cultura em desenvolvimento, necessita atenção e melhorias</p>
          <p><strong>0-39%:</strong> Cultura inicial, requer trabalho intensivo de alinhamento</p>
        </div>
      </div>
    </div>
  )
}

export default CulturalSummary