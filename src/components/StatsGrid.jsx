import { formatInt } from "../format";

export default function StatsGrid({ pulse }) {
  const stats = [
    { label: "Block Height", value: formatInt(pulse.height) },
    { label: "Total Transactions", value: formatInt(pulse.txCount) },
    { label: "BNS Names", value: formatInt(pulse.bnsCount) },
    {
      label: "Circulating Supply",
      value: `${formatInt(pulse.circulatingSupply)} BDX`,
    },
    {
      label: "Hard Fork",
      value: pulse.hfVersion != null ? `v${pulse.hfVersion} · ${pulse.codename}` : "—",
    },
  ];

  return (
    <section className="stats" aria-label="Network statistics">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-label">{stat.label}</span>
          <span className="stat-value">{stat.value}</span>
        </div>
      ))}
    </section>
  );
}
