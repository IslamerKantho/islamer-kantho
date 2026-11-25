import { useState, memo } from "react";
import MenuDrawer from "../MenuDrawer";
import NavigationMenu from "./NavigationMenu";
import SecondaryNavbar from "./SecondaryNavbar";

const Header = () => {
  const [isCatDrawerOpen, setIsCatDrawerOpen] = useState(false);
  const openHandler = () => setIsCatDrawerOpen(true);
  const closeHandler = () => setIsCatDrawerOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-primary text-white shadow-sm">
        {/* Responsive Navigation Menu with Primary Background & Secondary/White Highlights */}
        <NavigationMenu onOpenDrawer={openHandler} />

        {/* Secondary Nav for Prayer Times & Hijri Calendar */}
        <SecondaryNavbar />
      </header>

      <MenuDrawer
        isVisible={isCatDrawerOpen}
        openHandler={openHandler}
        closeHandler={closeHandler}
      />
    </>
  );
};

export default memo(Header);
