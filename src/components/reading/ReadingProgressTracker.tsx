"use client";

import { useEffect } from "react";
import { useReadingPlanProgress } from "@/hooks/useReadingPlanProgress";

type ReadingProgressTrackerProps = {
  planSlug: string;
  day: number;
};

export default function ReadingProgressTracker({
  planSlug,
  day,
}: ReadingProgressTrackerProps) {
  const { saveLastOpenedDay } = useReadingPlanProgress(planSlug);

  useEffect(() => {
    saveLastOpenedDay(day);
  }, [day, saveLastOpenedDay]);

  return null;
}
