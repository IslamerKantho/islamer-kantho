import NextLink from "next/link";
import { ImBook } from "react-icons/im";
import { memo } from "react";

const ListMenu = ({ title, list, ...rest }) => {
  return (
    <div className="mb-3" {...rest}>
      {/* Section Heading */}
      <div className="pt-4 pb-2 px-4">
        <h3 className="pb-2 text-sm leading-5 font-bold text-primary border-b-2 border-secondary/60">
          {title}
        </h3>
      </div>

      {/* Categories */}
      <div className="w-full">
        <ul className="m-0 p-0 list-none grid grid-cols-2">
          {list.map((e, i) => (
            <li key={i} className="m-0">
              <NextLink
                href={e.slug ? `/category/${e.slug}` : e.url}
                className="py-2 pl-4 pr-2 text-slate-800 hover:text-primary flex justify-start items-center text-sm leading-8 no-underline border-r border-b border-slate-100 overflow-hidden hover:bg-secondary/15 transition-colors group"
              >
                {/* Menu Icon */}
                <span className="w-8 h-8 mr-2.5 flex justify-center items-center bg-secondary/25 text-primary group-hover:bg-primary group-hover:text-secondary rounded-lg shrink-0 transition-colors">
                  <ImBook className="w-3.5 h-3.5" />
                </span>

                {/* Menu Title */}
                <span className="truncate font-medium">{e.title}</span>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(ListMenu);
