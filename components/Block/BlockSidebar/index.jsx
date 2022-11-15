// Core Components
// Custom Components
import { Box, Grid } from "@mui/material";
import HijriCalender from "../../HijriCalender";
import PrayerTime from "../../PrayerTime";
import S from "./BlockSidebar.module.sass";

const BlockSidebar = () => {
  return (
    <>
      <Box className={S.__section} component="aside">
        <Grid className={S.__grid} container spacing={2}>
          {/* Prayer Time */}
          <PrayerTime />

          {/* Hijro Calender */}
          <HijriCalender />

          {/* <div className="ik_aside_recomendad">
                    <div className="ik__header">
                        <h4 className="ik_title">Recomendad websites</h4>
                    </div>
                    <CardRecomentdadWebsite />
                    <CardRecomentdadWebsite />
                    <CardRecomentdadWebsite />
                </div> */}
        </Grid>
      </Box>
    </>
  );
};

export default BlockSidebar;
