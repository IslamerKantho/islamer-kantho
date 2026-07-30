import NextLink from "next/link";
import { IconContext } from "react-icons";
import { ImBook } from "react-icons/im";
import { memo } from "react";

const ListMenu = ({ title, list, color, ...rest }) => {
  const customColor = color || "#111";
  const customBorderColor = color ? `${color}38` : "#eee";

  return (
    <div className="mb-2.5" {...rest}>
      {/* Section Heading */}
      <div className="pt-4 pb-2.5 pl-4 pr-4">
        <h3
          className="pb-2 text-base leading-4 font-bold border-b"
          style={{ color: customColor, borderBottomColor: customBorderColor }}
        >
          {title}
        </h3>
      </div>

      {/* Categories*/}
      <div className="w-full">
        <ul className="m-0 p-0 list-none grid grid-cols-2">
          {list.map((e, i) => (
            <li key={i}>
              <NextLink
                href={e.slug ? `/category/${e.slug}` : e.url}
                className="py-[7px] pl-4 pr-2 text-[#111] flex justify-start items-center text-sm leading-[36px] no-underline border-r border-[#eee] overflow-hidden hover:bg-gray-50 transition-colors"
              >
                {/* Menu Icon */}
                <span className="w-9 h-9 mr-3 flex justify-center items-center bg-[#E8E8E8] rounded-full shrink-0">
                  <IconContext.Provider
                    value={{
                      color: color ? color : "#333",
                      style: {
                        width: "16px",
                        height: "16px",
                      },
                    }}
                  >
                    <ImBook />
                  </IconContext.Provider>
                </span>

                {/* Menu Title */}
                <span className="truncate">{e.title}</span>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(ListMenu);
