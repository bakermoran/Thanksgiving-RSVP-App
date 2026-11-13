import { Illustration } from "@/ui/guest/illustration";

export const Footer = () => (
  <footer className="relative z-10 flex items-center justify-center gap-2 py-6 text-sm font-medium text-cocoa">
    <Illustration name="pie" className="h-6" />
    Made with extra gravy
    <Illustration name="pie" className="h-6" />
  </footer>
);
