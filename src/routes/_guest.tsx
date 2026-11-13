import { Bunting } from "@/components/layout/Bunting";
import { FallingLeaves } from "@/components/layout/FallingLeaves";
import { Footer } from "@/components/layout/Footer";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});

function GuestLayout() {
  return (
    <>
      <FallingLeaves />
      <Bunting />
      <div className="relative z-10 flex-1 overflow-x-clip">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
