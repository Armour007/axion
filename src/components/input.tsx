import React from 'react';
import { commandExists } from '../utils/commandExists';
import { shell } from '../utils/shell';
import { handleTabCompletion } from '../utils/tabCompletion';
import { Ps1 } from './Ps1';
import { History } from './history/interface';

interface InputProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement>;
  command: string;
  history: Array<History>;
  lastCommandIndex: number;
  setCommand: React.Dispatch<React.SetStateAction<string>>;
  setHistory: (value: string) => void;
  setLastCommandIndex: React.Dispatch<React.SetStateAction<number>>;
  clearHistory: () => void;
  updateLastHistoryOutput?: (value: string) => void;
}

// Intent recognition keywords
const GROWTH_KEYWORDS = ['increase', 'grow', 'sales', 'revenue', 'market', 'new customers', 'acquisition', 'scale', 'expansion'];
const REACTIVE_KEYWORDS = ['fix', 'reduce churn', 'error', 'bug', 'problem', 'stop', 'crash', 'fail', 'down', 'broken', 'issue'];

const detectIntent = (goal: string): 'growth' | 'reactive' | 'ambiguous' => {
  const lowerGoal = goal.toLowerCase();
  
  const hasGrowthKeyword = GROWTH_KEYWORDS.some(keyword => lowerGoal.includes(keyword));
  const hasReactiveKeyword = REACTIVE_KEYWORDS.some(keyword => lowerGoal.includes(keyword));
  
  if (hasGrowthKeyword && !hasReactiveKeyword) {
    return 'growth';
  } else if (hasReactiveKeyword && !hasGrowthKeyword) {
    return 'reactive';
  } else if (hasGrowthKeyword && hasReactiveKeyword) {
    return 'ambiguous';
  } else {
    return 'ambiguous';
  }
};

const growthLines = [
  `... GOAL RECEIVED: "{GOAL}"`,
  `... PARSING INTENT: Proactive Strategic Growth.`,
  `... ACTIVATING AGENT CREW. Orchestrating 4 autonomous agents.`,
  `... MONITOR AGENT: Task accepted. Analyzing historical sales data (Q1-Q3) vs. 3-month goal.`,
  `... MONITOR AGENT: Identifying key growth levers...`,
  `... TRIGGERING ANALYST AGENT.`,
  `... ANALYST AGENT: Task accepted. Initiating multi-domain analysis.`,
  `... ANALYST AGENT: Querying Salesforce: 'Cross-referencing LTV vs. Customer Acquisition Cost by segment.'`,
  `... ANALYST AGENT: Querying External Market Data: 'Identifying total addressable market for untapped segments.'`,
  `... ANALYST AGENT: CORRELATION FOUND (96% confidence): The 'Mid-Market (250-500 employees)' segment has a 3.2x higher LTV than your current 'SMB' focus, but has only 8% market penetration. This is your primary growth vector.`,
  `... TRIGGERING STRATEGY AGENT.`,
  `... STRATEGY AGENT: Task accepted. Generating 3-month growth plan.`,
  `... SIMULATION 1: 'Aggressive Ad Spend'. (Result: 50% cost increase, 15% sales increase. FAILED)`,
  `... SIMULATION 2: 'Discounting'. (Result: 20% sales increase, 40% margin loss. FAILED)`,
  `... SIMULATION 3: 'Targeted Segment Campaign'. (Result: 62% sales increase at 70% margin. SUCCESS)`,
  `... RECOMMENDATION: Execute Solution 3.`,
  `... PLAN:`,
  `... 1. (Marketing) Launch 3-month targeted LinkedIn campaign for 'Mid-Market' segment.`,
  `... 2. (Sales) Arm sales team with new pitch deck & battlecards focused on 'Mid-Market' pain points.`,
  `... 3. (Web) Launch new "Business Plus" pricing tier on website.`,
  `... AWAITING HUMAN-IN-THE-LOOP APPROVAL...`,
];

const reactiveLines = [
  `... GOAL RECEIVED: "{GOAL}"`,
  `... PARSING INTENT: Reactive Diagnostic.`,
  `... ACTIVATING AGENT CREW. Orchestrating 4 autonomous agents.`,
  `... MONITOR AGENT: Task accepted. Scanning 45,000+ real-time data streams.`,
  `... MONITOR AGENT: ANOMALY DETECTED: Cart abandonment rate spiked from 15% to 70% in the last 2 hours.`,
  `... TRIGGERING ANALYST AGENT.`,
  `... ANALYST AGENT: Task accepted. Initiating root cause analysis.`,
  `... ANALYST AGENT: Querying Stripe: 'Payment failures increasing...'`,
  `... ANALYST AGENT: Querying GitHub: 'Reviewing recent deployments...'`,
  `... ANALYST AGENT: Querying Browser Logs: 'Filtering for Safari users...'`,
  `... ANALYST AGENT: CORRELATION FOUND (99% confidence): A 'v3.4.2' frontend deployment 2 hours ago has a JavaScript bug. The payment modal is failing to load on all Safari-based browsers.`,
  `... TRIGGERING STRATEGY AGENT.`,
  `... STRATEGY AGENT: Task accepted. Generating 3 potential solutions.`,
  `... SIMULATION 1: Do nothing. (Est. $400k/hr revenue loss)`,
  `... SIMULATION 2: Revert entire 'v3.4.2' deployment. (Fixes bug, but loses 3 new features)`,
  `... SIMULATION 3: Deploy immediate hotfix for Safari-specific JS module. (Minimal disruption)`,
  `... RECOMMENDATION: Execute Solution 3.`,
  `... AWAITING HUMAN-IN-THE-LOOP APPROVAL...`,
];

const growthApprovalLines = [
  `... APPROVED. Executing multi-agent action.`,
  `... ACTION AGENT (Marketing): Task accepted. Allocating $50k ad budget via LinkedIn API.`,
  `... ACTION AGENT (Sales): Task accepted. Pushing new battlecards & leads list to Salesforce.`,
  `... ACTION AGENT (Web): Task accepted. Deploying 'Business Plus' pricing page via CI/CD pipeline.`,
  `... ALL ACTIONS COMPLETE. GOAL IN PROGRESS.`,
  `... MONITOR AGENT: Now tracking 15 new KPIs for this 3-month goal.`,
  ``,
  `This was a live simulation of the Axion Agentic Workflow.`,
  `The era of the dashboard is over. (Type 'request_access' to join the beta).`,
];

const reactiveApprovalLines = [
  `... APPROVED. Executing action.`,
  `... ACTION AGENT: Task accepted.`,
  `... ACTION AGENT: Executing hotfix. (Triggering CI/CD pipeline...)`,
  `... ACTION AGENT: Task complete. Fix deployed.`,
  `... MONITOR AGENT: Cart abandonment rate returning to 15% baseline.`,
  `... GOAL COMPLETE.`,
  ``,
  `This was a live simulation of the Axion Agentic Workflow.`,
  `The era of the dashboard is over. (Type 'request_access' to join the beta).`,
];

export const Input: React.FC<InputProps> = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
  updateLastHistoryOutput,
}) => {
  const [isDemoMode, setIsDemoMode] = React.useState(false);
  const [demoApprovalPending, setDemoApprovalPending] = React.useState(false);
  const [isRequestAccessMode, setIsRequestAccessMode] = React.useState(false);
  const [demoStreamActive, setDemoStreamActive] = React.useState(false);
  const [approvalStreamActive, setApprovalStreamActive] = React.useState(false);
  const [currentSimulationType, setCurrentSimulationType] = React.useState<'growth' | 'reactive' | null>(null);
  const streamIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startDemoStream = (userGoal: string, simulationType: 'growth' | 'reactive') => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }

    const demoLines = simulationType === 'growth' ? growthLines : reactiveLines;
    
    let lineIndex = 0;
    const formattedLines = demoLines.map((line) =>
      line.replace('{GOAL}', userGoal),
    );

    let accumulatedOutput = '';
    accumulatedOutput = formattedLines[0];
    setHistory(accumulatedOutput);
    lineIndex = 1;

    streamIntervalRef.current = setInterval(() => {
      if (lineIndex < formattedLines.length) {
        accumulatedOutput += '\n' + formattedLines[lineIndex];
        if (updateLastHistoryOutput) {
          updateLastHistoryOutput(accumulatedOutput);
        }
        lineIndex++;
      } else {
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
        setDemoStreamActive(false);
        setDemoApprovalPending(true);
      }
    }, 750);

    setDemoStreamActive(true);
  };

  const startApprovalStream = () => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }

    const approvalLines = currentSimulationType === 'growth' ? growthApprovalLines : reactiveApprovalLines;
    
    let lineIndex = 0;
    let accumulatedOutput = '';

    accumulatedOutput = approvalLines[0];
    setHistory(accumulatedOutput);
    lineIndex = 1;

    streamIntervalRef.current = setInterval(() => {
      if (lineIndex < approvalLines.length) {
        accumulatedOutput += '\n' + approvalLines[lineIndex];
        if (updateLastHistoryOutput) {
          updateLastHistoryOutput(accumulatedOutput);
        }
        lineIndex++;
      } else {
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
        setApprovalStreamActive(false);
        setIsDemoMode(false);
        setDemoApprovalPending(false);
        setCurrentSimulationType(null);
      }
    }, 750);

    setApprovalStreamActive(true);
  };

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: any[] = history
      .map(({ command }: any) => command)
      .filter((command: string) => command);

    // Handle request_access mode (email input)
    if (isRequestAccessMode) {
      if (event.key === 'Enter' || event.code === '13') {
        event.preventDefault();
        const email = command;
        setCommand('');
        setHistory(`... Thank you. We will be in touch.`);
        setIsRequestAccessMode(false);
      }
      return;
    }

    // Handle demo mode input (goal entry)
    if (isDemoMode && !demoApprovalPending && !demoStreamActive) {
      if (event.key === 'Enter' || event.code === '13') {
        event.preventDefault();
        const userGoal = command;
        const intent = detectIntent(userGoal);
        
        if (intent === 'ambiguous') {
          setHistory(`... AGENT ERROR: Goal is ambiguous. Please specify a clear business objective (e.g., 'Increase Q4 sales' or 'Fix high cart abandonment').`);
          setCommand('');
          setIsDemoMode(false);
          return;
        }
        
        setCommand('');
        setCurrentSimulationType(intent);
        startDemoStream(userGoal, intent);
      }
      return;
    }

    // Handle demo approval
    if (demoApprovalPending && !approvalStreamActive) {
      const input = command.toLowerCase().trim();
      if (event.key === 'y' || event.key === 'Y' || input === 'yes') {
        event.preventDefault();
        setCommand('');
        startApprovalStream();
        return;
      } else if (event.key === 'n' || event.key === 'N' || input === 'no') {
        event.preventDefault();
        const denialMessage = `... ACTION DENIED. Halting workflow. Awaiting new directive. This was a live simulation. (Type 'request_access' to join the beta).`;
        setHistory(denialMessage);
        setCommand('');
        setIsDemoMode(false);
        setDemoApprovalPending(false);
        setCurrentSimulationType(null);
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
        return;
      }
    }

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      setHistory('');
      setLastCommandIndex(0);
      setIsDemoMode(false);
      setDemoApprovalPending(false);
      setDemoStreamActive(false);
      setApprovalStreamActive(false);
      setIsRequestAccessMode(false);
      setCurrentSimulationType(null);
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
      setIsDemoMode(false);
      setDemoApprovalPending(false);
      setDemoStreamActive(false);
      setApprovalStreamActive(false);
      setIsRequestAccessMode(false);
      setCurrentSimulationType(null);
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      setLastCommandIndex(0);
      await shell(command, setHistory, clearHistory, setCommand);
      
      // Check if demo was triggered
      if (command.toLowerCase().trim() === 'demo' || command.toLowerCase().trim() === 'solution') {
        clearHistory();
        setIsDemoMode(true);
        setHistory('[user@axion-sandbox]$ Enter a business goal:');
      }

      // Check if request_access was triggered
      if (command.toLowerCase().trim() === 'request_access') {
        setIsRequestAccessMode(true);
        setHistory('The Axion private beta is live. We are onboarding our first partners. YC S26 Batch. Request access:');
      }
      
      if (containerRef.current) {
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex + 1;
      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex - 1;
      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
  };

  const getPromptText = () => {
    if (isRequestAccessMode) {
      return 'Email: ';
    }
    if (isDemoMode && !demoApprovalPending) {
      return '[user@axion-sandbox]$ ';
    }
    if (demoApprovalPending) {
      return '» Approve? (Y/N): ';
    }
    return <Ps1 />;
  };

  return (
    <div className="flex flex-row space-x-2">
      <label htmlFor="prompt" className="flex-shrink">
        {typeof getPromptText() === 'string' ? (
          <span>{getPromptText()}</span>
        ) : (
          getPromptText()
        )}
      </label>

      <input
        ref={inputRef}
        id="prompt"
        type={isRequestAccessMode ? 'email' : 'text'}
        className={`bg-light-background dark:bg-dark-background focus:outline-none flex-grow ${
          isRequestAccessMode || isDemoMode || demoApprovalPending
            ? 'text-light-yellow dark:text-dark-yellow'
            : commandExists(command) || command === ''
            ? 'text-dark-green'
            : 'text-dark-red'
        }`}
        value={command}
        onChange={onChange}
        autoFocus
        onKeyDown={onSubmit}
        autoComplete={isRequestAccessMode ? 'email' : 'off'}
        spellCheck="false"
        placeholder={isRequestAccessMode ? 'your@email.com' : ''}
        disabled={demoStreamActive || approvalStreamActive}
      />
    </div>
  );
};

export default Input;
