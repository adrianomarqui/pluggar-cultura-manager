import { Save, MessageSquare } from 'lucide-react'

function ObservationsSection({ observations, onObservationsChange, onSave, saving }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="h-5 w-5 text-primary-500" />
        <h3 className="text-lg font-semibold text-gray-900">Observações da Reunião</h3>
      </div>
      
      <div className="space-y-4">
        <textarea
          value={observations}
          onChange={(e) => onObservationsChange(e.target.value)}
          placeholder="Adicione observações importantes sobre esta reunião de avaliação cultural..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 resize-none"
          rows={4}
        />
        
        <div className="flex justify-end">
          <button
            onClick={onSave}
            disabled={saving}
            className="btn btn-primary px-4 py-2 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Observações'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ObservationsSection