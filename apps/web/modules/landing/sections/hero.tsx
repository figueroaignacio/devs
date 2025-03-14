// Hooks
import { useTranslations } from "next-intl";

// Components
import { Link } from "@/config/i18n/routing";
import { Button } from "@repo/ui/components/button";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="py-20 sm:py-32 max-w-3xl px-4 lg:pl-14">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        {t.rich("hero.title", {
          span: (chunks) => <span>{chunks}</span>,
        })}
      </h1>
      <h2 className="mt-6 text-muted-foreground">{t("hero.subtitle")}</h2>
      <div className="mt-10 gap-4 flex">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/auth/register">{t("hero.ctaPrimary")}</Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/blog">{t("hero.ctaSecondary")}</Link>
        </Button>
      </div>
    </section>
  );
}
