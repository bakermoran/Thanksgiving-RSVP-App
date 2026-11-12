import { adminLogOut } from "@/functions/adminAuth.functions";
import { Button } from "@/ui/button";
import { useRouter } from "@tanstack/react-router";

export const AdminLogOutButton = () => {
  const router = useRouter();

  const onClick = async () => {
    await adminLogOut();
    router.clearCache();
    await router.navigate({ to: "/admin" });
  };

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      Log out
    </Button>
  );
};
