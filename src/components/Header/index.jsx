import { memo } from "react";
import NavigationMenu from "./NavigationMenu";
import SecondaryNavbar from "./SecondaryNavbar";

const Header = () => {
  return (
    <>
      <header className="relative z-30 w-full max-w-full bg-primary text-white">
        {/* Responsive Navigation Menu with Primary Background & Secondary/White Highlights */}
        <NavigationMenu />
      </header>

      {/* Fixed/Sticky Top Bar for Prayer Times & Hijri Calendar across every page view */}
      <SecondaryNavbar />
    </>
  );
};

export default memo(Header);
