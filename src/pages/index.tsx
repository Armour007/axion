import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const containerRef = React.useRef(null);
  const hasInitialized = React.useRef(false);
  const [isClient, setIsClient] = React.useState(false);
  const [bannerOutput, setBannerOutput] = React.useState<string>('');
  
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
    updateLastHistoryOutput,
  } = useHistory([]);

  // Mark that we're on the client and show banner on page load
  React.useEffect(() => {
    setIsClient(true);
    // Always show banner on component mount (fresh page load)
    if (!hasInitialized.current) {
      setBannerOutput(banner());
      hasInitialized.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history, inputRef]);

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow">
        <div ref={containerRef} className="overflow-y-auto h-full">
          {bannerOutput && (
            <pre className="whitespace-pre-wrap mb-2" style={{ lineHeight: 'normal' }}>
              {bannerOutput}
            </pre>
          )}
          <History history={history} />

          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
            updateLastHistoryOutput={updateLastHistoryOutput}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
