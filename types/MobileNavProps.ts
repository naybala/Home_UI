export interface MobileNavProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

export interface LanguageSwitcherProps {
    className?: string;
}

export interface NavLinksProps {
    className?: string;
    onClick?: () => void;
}