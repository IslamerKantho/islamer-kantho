import { Grid } from "@mui/material";
import CardFullWide from "../../card/CardFullWide";
import SectionWidget from "../../SectionWidget";

const BlockCardWide10x = ({ className, title, postData, ...rest }) => {
  return (
    <>
      <SectionWidget className={className} title="সাম্প্রতিক লেখাসমুহ">
        <Grid container spacing={2}>
          {postData &&
            postData.map((post, i) => (
              <Grid item key={i} xs={12} md={12}>
                <CardFullWide key={post._id} postData={post} />
              </Grid>
            ))}
        </Grid>
      </SectionWidget>
    </>
  );
};

export default BlockCardWide10x;
