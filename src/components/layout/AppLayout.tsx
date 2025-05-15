import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AlertTriangle, BarChart3, CreditCard, Home, Settings, Shield, Users } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center px-6 py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-irish-green" />
              <span className="font-bold text-lg">Irish CU Shield</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="space-y-1 px-3 py-2">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <AlertTriangle className="h-5 w-5 mr-3" />
                Alerts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="h-5 w-5 mr-3" />
                Transactions
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="h-5 w-5 mr-3" />
                Members
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="h-5 w-5 mr-3" />
                Reports
              </Button>
            </div>
          </SidebarContent>
          <SidebarFooter className="px-3 py-2">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <SidebarTrigger />
            <main className="mt-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}