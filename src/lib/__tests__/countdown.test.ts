import { describe, expect, it } from "vitest";
import { getCountdownState } from "../countdown";

const TARGET = "2026-08-29T22:00:00-03:00";
const END = "2026-08-30T06:00:00-03:00";

describe("getCountdownState", () => {
  it("separa o tempo restante em dias, horas, minutos e segundos", () => {
    const now = new Date("2026-08-28T20:58:59-03:00").getTime();

    expect(getCountdownState(TARGET, END, now)).toEqual({
      type: "future",
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
    });
  });

  it("indica que o evento esta acontecendo entre inicio e fim", () => {
    const now = new Date("2026-08-30T01:00:00-03:00").getTime();

    expect(getCountdownState(TARGET, END, now)).toEqual({ type: "live" });
  });

  it("mantem o ultimo segundo visivel ate o horario de inicio", () => {
    const now = new Date(TARGET).getTime() - 1;

    expect(getCountdownState(TARGET, END, now)).toMatchObject({
      type: "future",
      seconds: 1,
    });
  });

  it("encerra a contagem depois do fim do evento", () => {
    const now = new Date(END).getTime();

    expect(getCountdownState(TARGET, END, now)).toEqual({ type: "ended" });
  });
});
