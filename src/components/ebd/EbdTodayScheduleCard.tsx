"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { getSaoPauloDateKey } from "@/lib/ebd-schedule";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type EbdTodayScheduleCardProps = {
  children: ReactNode;
  className: string;
  date?: string | null;
  todayClassName: string;
};

function subscribeToDateChanges(onStoreChange: () => void) {
  const interval = window.setInterval(onStoreChange, 60 * 1000);

  return () => window.clearInterval(interval);
}

function getTodaySnapshot() {
  return getSaoPauloDateKey();
}

function getServerTodaySnapshot() {
  return null;
}

export default function EbdTodayScheduleCard({
  children,
  className,
  date,
  todayClassName,
}: EbdTodayScheduleCardProps) {
  const today = useSyncExternalStore(
    subscribeToDateChanges,
    getTodaySnapshot,
    getServerTodaySnapshot
  );
  const isToday = Boolean(date) && date === today;

  return (
    <div
      aria-current={isToday ? "date" : undefined}
      className={joinClasses(className, isToday && todayClassName)}
      data-ebd-schedule-date={date ?? undefined}
      data-ebd-schedule-today={isToday ? "true" : undefined}
    >
      <span
        aria-hidden={!isToday}
        className={joinClasses(
          "absolute top-3 right-3 rounded-full px-2 py-1 text-[10px] font-bold tracking-widest uppercase transition-opacity",
          isToday
            ? "bg-[#ef5350] text-white opacity-100"
            : "pointer-events-none bg-transparent text-transparent opacity-0"
        )}
      >
        Hoje
      </span>
      {children}
    </div>
  );
}
