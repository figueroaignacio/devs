"use client";

// Hooks
import { locales, usePathname, useRouter } from "@/config/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState, useTransition } from "react";

// Componetns
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

// Utils
import { Locale } from "@/lib/types";

export function UserPreferences() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("settings.preferences");
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [_, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  function onLocaleChange(newLocale: Locale) {
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  }

  if (!mounted) {
    return null;
  }

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="language">{t("language")}</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="language"
              className="flex items-center gap-2 w-full justify-between"
              variant="outline"
            >
              <div className="flex items-center gap-2">
                <Languages size={16} />
                <span>{locale.toUpperCase()}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {locales.map((localeOption) => (
              <DropdownMenuItem
                key={localeOption}
                onClick={() => onLocaleChange(localeOption as Locale)}
                className={`flex items-center justify-between ${
                  locale === localeOption ? "text-accent-foreground" : ""
                }`}
              >
                {localeOption.toUpperCase()}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2">
        <Label htmlFor="theme">{t("theme")}</Label>
        <Select onValueChange={setTheme} defaultValue={theme}>
          <SelectTrigger id="theme">
            <SelectValue placeholder={t("selectTheme")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">{t("themes.light")}</SelectItem>
            <SelectItem value="dark">{t("themes.dark")}</SelectItem>
            <SelectItem value="system">{t("themes.system")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}