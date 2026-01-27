import AppHeader from "./Header";
import AppFooter from "./Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
};

export default RootLayout;
