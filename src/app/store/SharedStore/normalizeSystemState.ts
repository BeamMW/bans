/**
 * Wallet `ev_system_state` payloads may use slightly different field names across versions.
 * Keep canonical keys expected by DomainPresenter (`current_height`, `current_state_timestamp`, tip_*).
 */
function num(v: unknown): number | undefined {
  if (v === null || v === undefined || v === '') return undefined;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function normalizeWalletSystemState(payload: unknown): any {
  if (!payload || typeof payload !== 'object') return payload;
  const p = payload as Record<string, unknown>;

  const current_height =
    num(p.current_height) ??
    num(p.height) ??
    num(p.chain_height) ??
    0;

  const current_state_timestamp =
    num(p.current_state_timestamp) ??
    num(p.state_timestamp) ??
    num(p.timestamp) ??
    0;

  const tip_height = num(p.tip_height) ?? num(p.tipHeight) ?? 0;
  const tip_state_timestamp =
    num(p.tip_state_timestamp) ?? num(p.tipStateTimestamp) ?? 0;

  return {
    ...p,
    current_height,
    current_state_timestamp,
    tip_height,
    tip_state_timestamp,
  };
}
