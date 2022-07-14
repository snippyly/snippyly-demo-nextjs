import { useEffect, useMemo, useState } from 'react';
import { SnippylyContext } from './context/snippylyContext';
import loadSnippyly from './loadSnippyly';

/**
 * @type {import("@snippyly/types").Snippyly}
 */
var Snippyly;

export default function SnippylyWrapper({ children }) {
  const [client, setClient] = useState(null);

  const snippyly = useMemo(() => client, [client]);

  useEffect(() => {
    loadSnippyly(init);
  }, [])

  // Callback function that is called once Snippyly SDK is loaded.
  const init = async () => {
    Snippyly = window.Snippyly;
    const client = await Snippyly.init('4ZkRt6W2Qr6zMuBk04hn', {
      featureAllowList: [], // To allow specific features only
      userIdAllowList: [], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
    }); // Add your Api Key here
    setClient(client);
  }

  return (
    <SnippylyContext.Provider value={{ client: snippyly }}>
      {children}
    </SnippylyContext.Provider>
  );
}