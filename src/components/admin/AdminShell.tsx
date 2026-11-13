import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { AdminLogOutButton } from "@/components/adminAuth/AdminLogOutButton";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ListChecks, Users } from "lucide-react";

const nav = [
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/guests", label: "Guests", icon: Users },
  { to: "/admin/obligations", label: "Obligations", icon: ListChecks },
] as const;

interface AdminShellProps {
  email: string;
  children: React.ReactNode;
}

export const AdminShell = ({ email, children }: AdminShellProps) => (
  <div className="flex flex-1 flex-col md:flex-row">
    <aside className="flex shrink-0 flex-col border-b bg-muted/40 md:sticky md:top-0 md:h-dvh md:w-56 md:border-r md:border-b-0">
      <div className="flex h-14 items-center gap-2 px-4">
        <span className="font-semibold tracking-tight">Event management</span>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:pb-0">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto hidden flex-col gap-2 border-t p-3 md:flex">
        <ThemeToggle className="self-start" />
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs text-muted-foreground" title={email}>
            {email}
          </p>
          <AdminLogOutButton />
        </div>
      </div>
    </aside>

    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-12 items-center justify-end gap-3 border-b px-4 md:hidden">
        <ThemeToggle />
        <p className="truncate text-xs text-muted-foreground">{email}</p>
        <AdminLogOutButton />
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  </div>
);
