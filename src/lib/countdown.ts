export type CountdownState =
  | {
      type: "future";
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | { type: "live" }
  | { type: "ended" };

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export function getCountdownState(
  targetIso: string,
  endIso: string,
  nowMs = Date.now()
): CountdownState {
  const targetMs = Date.parse(targetIso);
  const endMs = Date.parse(endIso);

  if (!Number.isFinite(targetMs) || !Number.isFinite(endMs) || endMs <= targetMs) {
    return { type: "ended" };
  }

  if (nowMs >= endMs) {
    return { type: "ended" };
  }

  if (nowMs >= targetMs) {
    return { type: "live" };
  }

  const remainingMs = targetMs - nowMs;
  const remainingSeconds = Math.ceil(remainingMs / SECOND_MS);

  return {
    type: "future",
    days: Math.floor(remainingSeconds / (DAY_MS / SECOND_MS)),
    hours: Math.floor(
      (remainingSeconds % (DAY_MS / SECOND_MS)) / (HOUR_MS / SECOND_MS)
    ),
    minutes: Math.floor(
      (remainingSeconds % (HOUR_MS / SECOND_MS)) / (MINUTE_MS / SECOND_MS)
    ),
    seconds: remainingSeconds % (MINUTE_MS / SECOND_MS),
  };
}
