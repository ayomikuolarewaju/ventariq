// app/world-cup/match-day-plan/page.tsx

import PlanDetailLayout from "@/components/PlanDetailLayout";

export default function MatchDayPlan() {
  return (
    <PlanDetailLayout
      eyebrow="CUSTOM PLAN"
      title="Custom Match-Day Plan"
      description="Your personalized World Cup experience. We help you plan transport, stadium arrival, food, movement and local support."
      sku="custom_match_day_plan"
      features={[
        "Stadium arrival + departure route planning",
        "Local transport guidance for match day",
        "Food and rest stop recommendations near the venue",
        "On-the-ground visitor support contact",
      ]}
    />
  );
}
