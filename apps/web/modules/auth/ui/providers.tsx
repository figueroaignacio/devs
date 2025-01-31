"use client";

// Hooks
import { useCallback, useTransition } from "react";

// Components
import { Github } from "@/components/shared/tech-icons";
import { Button } from "@repo/ui/components/button";
import { Loader2 } from "lucide-react";

// Utils
import { signIn } from "next-auth/react";

export function Providers() {
  const [isPending, startTransition] = useTransition();

  const onClick = useCallback((provider: "github") => {
    startTransition(async () => {
      try {
        await signIn(provider, {
          callbackUrl: "/hub",
        });
      } catch (error) {}
    });
  }, []);

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full flex items-center gap-x-2"
        variant="outline"
        onClick={() => onClick("github")}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github />
        )}
        {isPending ? "Connecting..." : "Continue with GitHub"}
      </Button>
    </div>
  );
}
