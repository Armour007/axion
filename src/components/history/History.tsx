import React from 'react';
import { History as HistoryInterface } from './interface';
import { Ps1 } from '../Ps1';
import { sanitizeHTML } from '../../utils/sanitize';

export const History: React.FC<{ history: Array<HistoryInterface> }> = ({
  history,
}) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => {
        // Check if this is a demo output (starts with "...")
        const isDemoOutput = entry.command === '' && entry.output.startsWith('...');
        
        return (
          <div key={entry.command + index}>
            {!isDemoOutput && (
              <div className="flex flex-row space-x-2">
                <div className="flex-shrink">
                  <Ps1 />
                </div>

                <div className="flex-grow">{entry.command}</div>
              </div>
            )}

            <p
              className="whitespace-pre-wrap mb-2"
              style={{ lineHeight: 'normal' }}
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(entry.output) }}
            />
          </div>
        );
      })}
    </>
  );
};

export default History;
