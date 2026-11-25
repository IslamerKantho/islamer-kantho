import { memo } from "react";
import NavigationMenu from "./NavigationMenu";
import SecondaryNavbar from "./SecondaryNavbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-hidden bg-primary text-white shadow-sm">
      {/* Responsive Navigation Menu with Primary Background & Secondary/White Highlights */}
      <NavigationMenu />

      {/* Secondary Nav for Prayer Times & Hijri Calendar */}
      <SecondaryNavbar />
    </header>
  );
};

export default memo(Header);
