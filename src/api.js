const BASE = "https://explorer.beldex.io/api";

//done
export async function fetchPulse() {
  // make the request
  const [emissionRes, networkRes, supplyRes] = await Promise.all([
    fetch(`${BASE}/emission`),
    fetch(`${BASE}/networkinfo`),
    fetch(`${BASE}/circulating_supply`), //returns only the circulting supply
  ]);

  if (!emissionRes.ok) throw new Error(`emission request failed (${emissionRes.status})`);
  if (!networkRes.ok) throw new Error(`networkinfo request failed (${networkRes.status})`);
  if (!supplyRes.ok) throw new Error(`circulating supply request failed (${supplyRes.status})`);

  const [emissionJson, networkJson, supply] = await Promise.all([
    emissionRes.json(),
    networkRes.json(),
    supplyRes.json(),
  ]);

  // using only the emission and the network as the json object
  const emission = emissionJson.data ?? {};
  const network = networkJson.data ?? {};

  return {
    burn: emission.burn ?? 0,
    blockNumber: emission.blk_no ?? null,

    height: network.height ?? null,
    txCount: network.tx_count ?? 0,
    bnsCount: network.bns_counts ?? 0,

    circulatingSupply: Number(supply) || 0,

    fee: emission.fee ?? 0,
    timestamp: Date.now(),
    // get from the network info
    hfVersion: network.current_hf_version ?? null,
    codename: network.release_codename ?? "",
    peers:
      (network.incoming_connections_count ?? 0) + (network.outgoing_connections_count ?? 0),
  };
}
