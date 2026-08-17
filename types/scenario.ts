export interface ScenarioChoice {
  id: string;
  label: string;
}

/**
 * One civic situation with a single best action. Copy is resolved
 * before it reaches the player so courses, quizzes, and the homepage
 * can all feed the same UI.
 */
export interface Scenario {
  id: string;
  prompt: string;
  image: string;
  imageAlt: string;
  topicLabel?: string;
  choices: ScenarioChoice[];
  correctChoiceId: string;
  explanation: string;
}

export interface ScenarioPlayerCopy {
  progress: string;
  choiceGroupLabel: string;
  confirm: string;
  confirmHint: string;
  correct: string;
  incorrect: string;
  explanationLabel: string;
  next: string;
  finish: string;
  restart: string;
  completeTitle: string;
  completeDescription: string;
  scoreLabel: string;
}

export interface ScenarioResult {
  scenarioId: string;
  choiceId: string;
  correct: boolean;
}
