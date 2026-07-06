// Dashboard route-group layout — authenticated shell; renders dynamic menu from the Module Registry API.
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-shell">
      {/* TODO: dynamic sidebar/menu driven by Module Registry API */}
      <nav aria-label="Modules" />
      <main>{children}</main>
    </div>
  );
}
