import { Check, X } from 'lucide-react'

function ChecklistSection({ section, evaluations, onEvaluationChange }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="section-header">
        <span className="text-2xl">{section.icon}</span>
        <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
      </div>
      
      <div className="space-y-4">
        {section.items.map((item) => (
          <div key={item.id} className="checklist-item">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEvaluationChange(item.id, true)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  evaluations[item.id] === true
                    ? 'status-vivemos'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <Check className="h-3 w-3 mr-1" />
                VIVEMOS
              </button>
              
              <button
                onClick={() => onEvaluationChange(item.id, false)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  evaluations[item.id] === false
                    ? 'status-nao-vivemos'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                <X className="h-3 w-3 mr-1" />
                NÃO VIVEMOS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChecklistSection