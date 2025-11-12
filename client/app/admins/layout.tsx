"use client";
import { Toaster } from "@/app/v1/components/ui/sonner";
import LeftSidebar from "./_pages/sidebar/leftSide";
import { Sidebar, SidebarProvider } from "@/app/v1/components/ui/sidebar";
import { FcmProvider } from "./_pages/sidebar/FcmContext";
import { DashboardDataProvider } from "./_pages/sidebar/DashboardDataContext";
import { useRouter } from "next/router";
import { Capacitor } from "@capacitor/core";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const platform = Capacitor.getPlatform();

  useEffect(() => {
    if (platform === "ios" || platform === "android") {
      router.push("/signin"); // Redirect to sign-in page
    }
  }, [platform, router]);

  return (
    <div className="flex h-screen w-full  bg-linear-to-b from-app-dark-blue via-app-blue to-app-blue ">
      <DashboardDataProvider>
        <FcmProvider>
          <Toaster position="top-right" richColors closeButton />
          <SidebarProvider>
            <Sidebar variant={"sidebar"} className="">
              <LeftSidebar />
            </Sidebar>
            <main className="bg-sidebar flex-1  bg-linear-to-b from-app-dark-blue to-app-blue ">
              {children}
            </main>
          </SidebarProvider>
        </FcmProvider>
      </DashboardDataProvider>
    </div>
  );
}
