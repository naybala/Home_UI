import AppHeader from "./Header";
import AppFooter from "./Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
};

export default RootLayout;
