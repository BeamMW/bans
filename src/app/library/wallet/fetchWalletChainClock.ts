import connector from '@core/connector';

/**
 * Beam API v7.3: `wallet_status` returns `current_height`, `current_state_timestamp` (Unix seconds),
 * same fields as `ev_system_state`. Use when Redux has not received events yet (race on first paint).
 * @see https://github.com/BeamMW/beam/wiki/Beam-wallet-protocol-API-v7.3 — wallet_status, ev_system_state
 */
export type WalletChainClock = {
  current_height: number;
  current_state_timestamp: number;
  tip_height?: number;
  tip_state_timestamp?: number;
};

export async function fetchWalletChainClock(): Promise<WalletChainClock | null> {
  try {
    const ws = await connector.callApi('wallet_status', {});
    if (!ws || typeof ws !== 'object') return null;
    const w = ws as Record<string, unknown>;
    const h = Number(w.current_height ?? 0);
    const ts = Number(w.current_state_timestamp ?? 0);
    const tipH = Number(w.tip_height ?? 0);
    const tipTs = Number(w.tip_state_timestamp ?? 0);
    return {
      current_height: Number.isFinite(h) ? h : 0,
      current_state_timestamp: Number.isFinite(ts) ? ts : 0,
      tip_height: Number.isFinite(tipH) ? tipH : 0,
      tip_state_timestamp: Number.isFinite(tipTs) ? tipTs : 0,
    };
  } catch {
    return null;
  }
}

/** True when we have no block height reference (current and tip both unknown). */
export function needsChainHeight(currentHeight: number, tipHeight: number): boolean {
  return (currentHeight ?? 0) <= 0 && (tipHeight ?? 0) <= 0;
}
