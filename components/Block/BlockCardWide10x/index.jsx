import { Grid } from "@mui/material";
import CardFullWide from "../../card/CardFullWide";
import SectionWidget from "../../SectionWidget";
import S from "./BlockCardWide10x.module.sass";

const BlockCardWide10x = ({ className, title, postData, ...rest }) => {
  return (
    <>
      <SectionWidget className={S.__articles} title="সাম্প্রতিক লেখাসমুহ">
        <Grid className={S.__grid} container spacing={2}>
          {postData &&
            postData.map((post, i) => (
              <Grid className={S.__gridItem} item key={i} xs={12} md={12}>
                <CardFullWide key={post._id} postData={post} />
              </Grid>
            ))}
        </Grid>
      </SectionWidget>
    </>
  );
};

export default BlockCardWide10x;
