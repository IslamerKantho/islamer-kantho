import { Box } from "@mui/material";
import HijriCalender from "../../HijriCalender";
import PrayerTime from "../../PrayerTime";
// import CardRecomentdadWebsite from "@/components/card/CardRecomedadWebsite";

const BlockSidebar = () => {
  return (
    <>
      <Box
        className="sticky  top-0 block"
        component="aside"
      >
        <Box className="flex flex-col gap-4">
          <PrayerTime />

          <HijriCalender />
                {/* 
                  <div className="ik_aside_recomendad">
                    <div className="ik__header">
                        <h4 className="ik_title">Recomendad websites</h4>
                    </div>
                    <CardRecomentdadWebsite />
                    <CardRecomentdadWebsite />
                    <CardRecomentdadWebsite />
                </div> */}
        </Box>
      </Box>
    </>
  );
};

export default BlockSidebar;
