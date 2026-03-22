import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "theme";

const getInitialIsDark = () => {
  if (typeof window === "undefined") return false;

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ToggleDark = () => {
  const [isDark, setIsDark] = useState(getInitialIsDark);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDark);
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm">
      <Sun className={`h-4 w-4 transition-colors ${isDark ? "text-muted-foreground" : "text-primary"}`} />
      <Switch
        checked={isDark}
        onCheckedChange={setIsDark}
        aria-label="Toggle dark mode"
        className="data-checked:bg-primary data-unchecked:bg-zinc-300 dark:data-unchecked:bg-zinc-700"
      />
      <Moon className={`h-4 w-4 transition-colors ${isDark ? "text-primary" : "text-muted-foreground"}`} />
    </label>
  );
};

export default ToggleDark;