import useCountUp from "../hooks/useCountUp";
import { atomicToBdx, formatBdx } from "../format";

const MOTES = Array.from({ length: 9 });

export default function BurnCounter({ pulse, prevBurn, delta, lastUpdated }) {

  const total = atomicToBdx(pulse.burn);
  const deltaBdx = Math.max(0, delta) / 1e9;

  const counted = useCountUp(deltaBdx, 2000);

  return (
    <section className="hero" aria-label="Total BDX burned">
      <div className="motes" key={pulse.timestamp} aria-hidden="true">
        {/* the animationss */}
        {MOTES.map((_, i) => (
          <span
            key={i}
            className="mote"
            style={{
              left: `${6 + i * 10.5}%`,
              animationDelay: `${i * 0.16}s`,
              width: `${5 + (i % 3)}px`,
              height: `${5 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* done */}
      <p className="hero-label">Total BDX burned</p>
      <h2
        className="hero-burn"
        title={
          prevBurn != null
            ? `Previous reading: ${formatBdx(atomicToBdx(prevBurn))} BDX`
            : undefined
        }
      >
        {formatBdx(total)}
        {/* comes from the next/pulse burned amount */}
      </h2>

      <div className="hero-delta">
        <span className="delta-plus">+{formatBdx(counted)}</span>
        <span className="delta-unit">BDX</span>
        <span className="delta-window">in the last 30s</span>
      </div>
      
      {/* done */}
      {lastUpdated && (
        <p className="hero-updated">
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      )}
    </section>
  );
}
