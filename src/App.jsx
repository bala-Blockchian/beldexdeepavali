import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPulse } from "./api";
import DiyaCluster from "./components/DiyaCluster";
import BurnCounter from "./components/BurnCounter";
import Message from "./components/Message";
import StatsGrid from "./components/StatsGrid";
import "./styles.css";

const POLL_MS = 30000; //every 30 sec

export default function App() {

  const [pulse, setPulse] = useState(null);
  const [prevBurn, setPrevBurn] = useState(null);
  const [delta, setDelta] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const prevBurnRef = useRef(null);

  //done
  const load = useCallback(async () => {
    try {
      const next = await fetchPulse(); //fetch the data from the api endpoint
      const previous = prevBurnRef.current;

      setDelta(previous == null ? 0 : Math.max(0, next.burn - previous)); //used to show the rate of increase
      prevBurnRef.current = next.burn;

      setPrevBurn(previous); //previous 
      setPulse(next); //current
      setLastUpdated(next.timestamp);

      setError(null);

    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS); //every 30 sec
    return () => clearInterval(id);
  }, [load]);

  return (
    <div className="page">
      <div className="rangoli-frame" aria-hidden="true" />

      <main className="shell">
        <header className="masthead">
          <DiyaCluster />
          <p className="eyebrow">Diwali · Festival of Lights</p>
          <h1>
            Diwali with <span className="brand-green">Beldex</span>
          </h1>
          <p className="subhead">Community burn, shared fortune.</p>
        </header>

        <Message />

        {error && pulse && (
          <div className="retry-note" role="status">
            <span>Reconnecting — showing last known data.</span>
            <button type="button" onClick={load}>
              Retry
            </button>
          </div>
        )}

        {pulse ? (
          <>
            <BurnCounter
              pulse={pulse}
              prevBurn={prevBurn}
              delta={delta}
              lastUpdated={lastUpdated}
            />

            <StatsGrid pulse={pulse} />
          </>
        ) : (
          // done
          // if not error and no pulse exist  render the loading screen
          <section className="empty-state">
            {error ? (
              <>
                <p>Unable to reach the Beldex network.</p>
                <button type="button" onClick={load}>
                  Try again
                </button>
              </>
            ) : (
              <p>Lighting the diyas…</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
