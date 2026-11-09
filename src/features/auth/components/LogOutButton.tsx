import { logOut } from "@/features/auth/auth.functions";
import { Button } from "@/ui/button";
import { useRouter } from "@tanstack/react-router";

export const LogOutButton = ({ name }: { name: string }) => {
  const router = useRouter();

  const onClick = async () => {
    await logOut();
    router.clearCache();
    await router.navigate({ to: "/" });
  };

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      Not ${name}?
    </Button>
  );
};
