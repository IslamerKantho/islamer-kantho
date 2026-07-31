import NextLink from "next/link";
import { SIDE_MENU } from "../../db/sidebar_menu.db";
import { memo, useEffect } from "react";
import { CATEGORIES } from "../../db/categories.db";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import ListMenu from "./ListMenu";
import { useRouter } from "next/router";

const MenuDrawer = ({ isVisible, closeHandler }) => {
  const router = useRouter();

  // Close drawer on route changes
  useEffect(() => {
    router.events.on("routeChangeStart", closeHandler);
    return () => {
      router.events.off("routeChangeStart", closeHandler);
    };
  }, [router, closeHandler]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const toggleDrawer = (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    closeHandler();
  };

  const topBar = (
    <div className="sticky top-0 z-10 w-full sm:w-[400px] text-white bg-primary pl-4 border-b border-[#e9ecef] shadow-none flex items-center h-[48px]">
      <NextLink
        href="/"
        className="flex mr-4 text-white font-bold text-[20px] leading-[36px] no-underline items-center"
      >
        ইসলামের কন্ঠ
      </NextLink>

      <button
        onClick={closeHandler}
        className="ml-auto mr-4 text-white p-1 rounded-full bg-[#03483c] hover:bg-black/20 transition-colors"
        aria-label="Close menu"
      >
        <IoCloseOutline size={24} />
      </button>
    </div>
  );

  const footer = (
    <div className="w-[70%] mx-auto mt-[25px] mb-[10px] text-center">
      <p className="text-sm text-gray-600 mb-2">
        All right reserved by the author & the respective writers
      </p>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={closeHandler}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-full sm:w-[400px] bg-white shadow-xl transition-transform duration-300 ease-in-out overflow-y-auto overflow-x-hidden",
          isVisible ? "translate-x-0" : "-translate-x-full"
        )}
        tabIndex="-1"
        onKeyDown={toggleDrawer}
      >
        {topBar}
        
        <div className="py-2">
          {/* Categories */}
          {Object.keys(CATEGORIES).map(
            (k, i) =>
              CATEGORIES[k].list && (
                <ListMenu
                  key={`cat-${i}`}
                  title={CATEGORIES[k].title}
                  list={CATEGORIES[k].list}
                  color={CATEGORIES[k].color}
                />
              )
          )}
          {/* Menu */}
          {Object.keys(SIDE_MENU).map(
            (k, i) =>
              SIDE_MENU[k].list && (
                <ListMenu
                  key={`menu-${i}`}
                  title={SIDE_MENU[k].title}
                  list={SIDE_MENU[k].list}
                  color={SIDE_MENU[k].color}
                />
              )
          )}
        </div>
        
        {footer}
      </div>
    </>
  );
};

export default memo(MenuDrawer);
