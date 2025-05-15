import { AppLayout } from "@/components/layout/AppLayout";
import { FraudDashboard } from "@/components/dashboard/FraudDashboard";

const Index = () => {
  return (
    <AppLayout>
      <FraudDashboard />
    </AppLayout>
  );
};

export default Index;