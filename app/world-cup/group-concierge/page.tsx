// app/world-cup/group-concierge/page.tsx

import PlanDetailLayout from "@/components/PlanDetailLayout";

export default function GroupConciergePlan() {
  return (
    <PlanDetailLayout
      eyebrow="GROUP TRAVEL"
      title="Group Concierge"
      description="Traveling with a crew? One point of contact coordinates transport, hotels, and match-day logistics for the whole group."
      sku="group_concierge_plan"
      features={[
        "Dedicated concierge for group coordination",
        "Group transport and multi-room hotel booking support",
        "Synced match-day schedule across the group",
        "Priority visitor support during the event",
      ]}
    />
  );
}
