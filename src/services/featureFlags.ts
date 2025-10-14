/**
 * Feature Flags Service
 * 
 * This service manages feature flags for the application.
 * In a production environment, these would typically come from a backend service,
 * but for this implementation we're using localStorage as a simple stand-in.
 */

// Define all available feature flags
export interface FeatureFlags {
  enableScenarios: boolean;
}

// Default values for all feature flags
const defaultFeatureFlags: FeatureFlags = {
  enableScenarios: false
};

// Load feature flags from localStorage or use defaults
export const getFeatureFlags = (): FeatureFlags => {
  try {
    const storedFlags = localStorage.getItem('featureFlags');
    if (storedFlags) {
      return { ...defaultFeatureFlags, ...JSON.parse(storedFlags) };
    }
  } catch (error) {
    console.error('Error loading feature flags:', error);
  }
  
  return defaultFeatureFlags;
};

// Update a single feature flag
export const updateFeatureFlag = (flagName: keyof FeatureFlags, value: boolean): void => {
  try {
    const currentFlags = getFeatureFlags();
    const updatedFlags = { ...currentFlags, [flagName]: value };
    
    localStorage.setItem('featureFlags', JSON.stringify(updatedFlags));
  } catch (error) {
    console.error('Error updating feature flag:', error);
  }
};

// Check if a specific feature flag is enabled
export const isFeatureEnabled = (flagName: keyof FeatureFlags): boolean => {
  return getFeatureFlags()[flagName];
};
