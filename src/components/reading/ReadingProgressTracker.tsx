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
  const { saveProgress } = useReadingPlanProgress(planSlug);

  useEffect(() => {
    saveProgress(day);
  }, [day, saveProgress]);

  return null;
}
