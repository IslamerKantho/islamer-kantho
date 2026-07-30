import HijriCalender from "../../HijriCalender";
import PrayerTime from "../../PrayerTime";

const BlockSidebar = () => {
  return (
    <aside className="sticky top-4 block">
      <div className="flex flex-col gap-4">
        <PrayerTime />
        <HijriCalender />
      </div>
    </aside>
  );
};

export default BlockSidebar;
