const TIMEZONE_OFFSET = "-03:00";

type DateParts = {
  startDay: number;
  endDay?: number;
  month: number;
  year: number;
};

type TimeParts = {
  startHour: number;
  startMinute: number;
  endHour?: number;
  endMinute?: number;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function parseDateParts(data: string, year: number): DateParts {
  const match = data.match(/(\d{1,2})(?:\s*[–-]\s*(\d{1,2}))?\/(\d{1,2})/);

  if (!match) {
    throw new Error(`Data de evento inválida: ${data}`);
  }

  return {
    startDay: parseInt(match[1], 10),
    endDay: match[2] ? parseInt(match[2], 10) : undefined,
    month: parseInt(match[3], 10),
    year,
  };
}

function parseTimeParts(horario?: string): TimeParts | null {
  if (!horario) return null;

  const match = horario.match(
    /(\d{1,2})h(?:(\d{2}))?(?:\s*[–-]\s*(\d{1,2})h(?:(\d{2}))?)?/
  );

  if (!match) return null;

  return {
    startHour: parseInt(match[1], 10),
    startMinute: match[2] ? parseInt(match[2], 10) : 0,
    endHour: match[3] ? parseInt(match[3], 10) : undefined,
    endMinute: match[4] ? parseInt(match[4], 10) : 0,
  };
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function formatDateTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
) {
  return `${formatDate(year, month, day)}T${pad(hour)}:${pad(minute)}:00${TIMEZONE_OFFSET}`;
}

export function buildEventSchedule(
  data: string,
  horario: string | undefined,
  year: number
) {
  const dateParts = parseDateParts(data, year);
  const timeParts = parseTimeParts(horario);

  const startDate = timeParts
    ? formatDateTime(
        dateParts.year,
        dateParts.month,
        dateParts.startDay,
        timeParts.startHour,
        timeParts.startMinute
      )
    : formatDate(dateParts.year, dateParts.month, dateParts.startDay);

  let endDate: string | undefined;

  if (dateParts.endDay) {
    endDate = timeParts && typeof timeParts.endHour === "number"
      ? formatDateTime(
          dateParts.year,
          dateParts.month,
          dateParts.endDay,
          timeParts.endHour,
          timeParts.endMinute ?? 0
        )
      : formatDate(dateParts.year, dateParts.month, dateParts.endDay);
  } else if (
    timeParts &&
    typeof timeParts.endHour === "number" &&
    typeof timeParts.endMinute === "number"
  ) {
    endDate = formatDateTime(
      dateParts.year,
      dateParts.month,
      dateParts.startDay,
      timeParts.endHour,
      timeParts.endMinute
    );
  }

  return {
    startDate,
    endDate,
  };
}
