// app/world-cup/family-muslim-plan/page.tsx

import PlanDetailLayout from "@/components/PlanDetailLayout";

export default function FamilyMuslimPlan() {
  return (
    <PlanDetailLayout
      eyebrow="FAMILY & VISITOR SUPPORT"
      title="Family & Muslim Traveller Plan"
      description="Travel support built around family logistics and religious accommodation — so the details are handled before you land."
      sku="family_muslim_plan"
      features={[
        "Prayer space and mosque locations near your hotel and stadium",
        "Halal food recommendations across your host city",
        "Family-friendly accommodation guidance",
        "Scheduling built around match times and prayer times",
      ]}
    />
  );
}
