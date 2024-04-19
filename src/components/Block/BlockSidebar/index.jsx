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
          padding: { xs: "0 10px 20px 20px", sm: "50px 0" },
          position: "sticky",
          top: 0,
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
