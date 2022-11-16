import { Box, Grid } from "@mui/material";
import HijriCalender from "../../HijriCalender";
import PrayerTime from "../../PrayerTime";

const BlockSidebar = () => {
  return (
    <>
      <Box
        component="aside"
        sx={{
          width: "100%",
          padding: "40px 0",
          position: "relative",
          display: "block",
        }}
      >
        <Grid container spacing={2}>
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
