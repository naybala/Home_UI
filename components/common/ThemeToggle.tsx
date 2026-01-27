import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeToggle({ onClick }: { onClick?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    toggleTheme();
    if (onClick) onClick();
  };

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <div className="theme-toggle-wrapper" onClick={handleClick}>
      <div className={`toggle ${theme}`}>
        <div className="icon sun">☀️</div>
        <div className="icon moon">🌙</div>
        <div className="ball" />
      </div>
    </div>
  );
}
