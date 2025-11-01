import React from 'react';
import * as bin from './bin';

type CommandFunction = (args: string[]) => Promise<string> | string;
type BinExports = Record<string, CommandFunction>;

export const shell = async (
  command: string,
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  if (args[0] === 'clear') {
    clearHistory();
  } else if (command === '') {
    setHistory('');
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else {
    const commandFn = (bin as BinExports)[args[0]];
    if (typeof commandFn === 'function') {
      const output = await commandFn(args.slice(1));
      // Don't display special command markers
      if (output !== '__DEMO_START__' && output !== '__REQUEST_ACCESS_START__') {
        setHistory(output);
      }
    }
  }

  setCommand('');
};
