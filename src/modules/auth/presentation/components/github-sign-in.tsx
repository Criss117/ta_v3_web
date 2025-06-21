import { GitHub } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GitHubSignIn() {
  return (
    <Button variant="outline" className="w-full">
      <GitHub />
      Iniciar sesion con Github
    </Button>
  );
}
