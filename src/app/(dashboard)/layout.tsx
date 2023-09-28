import Header from "@/components/layout/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
};

export default DashboardLayout;
