/**
 * Demo mode simulation for Axion platform
 * Handles the interactive demo with simulated agent logs
 */

const demoLines = [
  '... GOAL RECEIVED: "{GOAL}" ... ACTIVATED.',
  '... Scanning 10,578 data streams...',
  '... ANOMALY DETECTED: Customer churn spiked 34% in the \'Pro-Tier\' segment in the last 48 hours.',
  '... TRIGGERING ANALYST AGENT.',
  '... ACTIVATED. Initiating root cause analysis.',
  '... Querying Salesforce: \'Pro-Tier\' cancellations...',
  '... Querying Stripe: \'Pro-Tier\' payment failures...',
  '... Querying Zendesk: \'Pro-Tier\' support tickets...',
  '... CORRELATION FOUND: 89% of churned users experienced a new payment failure (Code: 2051) after our new \'3D Secure\' update.',
  '... TRIGGERING STRATEGY AGENT.',
  '... ACTIVATED. Generating 3 potential solutions.',
  '... SIMULATION 1: Do nothing. (90% churn risk)',
  '... SIMULATION 2: Send mass email. (45% churn risk)',
  '... SIMULATION 3: Target affected users with 1-click payment update link. (5% churn risk)',
  '... RECOMMENDATION: Execute Solution 3.',
  '... AWAITING HUMAN-IN-THE-LOOP APPROVAL...',
];

export const startDemo = (
  userGoal: string,
  onApproval: () => void,
  onDeny: () => void,
): string => {
  // Format the first line with the user's goal
  const formattedLines = demoLines.map((line) =>
    line.replace('{GOAL}', userGoal),
  );

  // Store demo state in window for the input component to access
  if (typeof window !== 'undefined') {
    (window as any).__DEMO_STATE__ = {
      lines: formattedLines,
      currentLine: 0,
      userGoal,
      onApproval,
      onDeny,
      approved: false,
    };
  }

  return '__DEMO_ACTIVE__';
};

export const getDemoOutput = (): string => {
  if (typeof window === 'undefined') return '';
  const state = (window as any).__DEMO_STATE__;
  if (!state) return '';

  return state.lines.join('\n');
};

export const approveDemoAction = (): string => {
  return `... APPROVED. Executing action.
... Task complete. 4,180 targeted emails sent.
... GOAL IN PROGRESS. MONITORING...
This was a live simulation. (Type 'request_access' to join the beta)`;
};
