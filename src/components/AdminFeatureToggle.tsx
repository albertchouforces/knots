import { useState, useEffect } from 'react';
import { isFeatureEnabled, updateFeatureFlag } from '../services/featureFlags';
import { Settings } from 'lucide-react';

interface AdminFeatureToggleProps {
  className?: string;
}

export const AdminFeatureToggle = ({ className = '' }: AdminFeatureToggleProps) => {
  const [showPanel, setShowPanel] = useState(false);
  const [enableScenarios, setEnableScenarios] = useState(false);

  useEffect(() => {
    // Load current settings
    setEnableScenarios(isFeatureEnabled('enableScenarios'));
  }, [showPanel]);

  const handleScenariosToggle = () => {
    const newValue = !enableScenarios;
    updateFeatureFlag('enableScenarios', newValue);
    setEnableScenarios(newValue);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        title="Admin Settings"
      >
        <Settings size={18} />
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-2 p-4 bg-white shadow-lg rounded-lg border border-gray-200 z-50 w-64">
          <div className="text-sm font-medium text-gray-800 mb-3 pb-2 border-b">Admin Feature Toggles</div>
          
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="scenarios-toggle" className="text-sm text-gray-700">
              Enable Scenarios
            </label>
            <button
              id="scenarios-toggle"
              onClick={handleScenariosToggle}
              className={`w-10 h-5 rounded-full flex items-center transition-colors ${
                enableScenarios ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <span className={`w-4 h-4 rounded-full mx-0.5 bg-white shadow-md`}></span>
            </button>
          </div>
          
          <div className="mt-4 pt-2 border-t border-gray-100 text-xs text-gray-500">
            Changes take effect immediately
          </div>
        </div>
      )}
    </div>
  );
};
