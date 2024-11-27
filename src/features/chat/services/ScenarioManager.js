import scenarios from './ChatScenario';

export function getScenarioById(id) {
  return scenarios.find(scenario => scenario.id === id);
}
