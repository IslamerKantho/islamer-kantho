import { Box, Button, Grid } from "@mui/material";
import CardFullWide from "../../card/CardFullWide";
import SectionWidget from "../../SectionWidget";
import { memo } from "react";
import clsx from "clsx";

const BlockCardWide10x = ({
  className,
  title,
  posts,
  isPaginate,
  loading,
  onLoadMore,
}) => {
  return (
    <SectionWidget className={clsx( className)} title="সাম্প্রতিক লেখাসমুহ">

      {/* Post loop */}
      <Grid container spacing={3}>
        {posts && posts.map((post, i) => (
          <Grid item key={i} xs={12} md={12}>
            <CardFullWide key={post._id} postData={post} />
          </Grid>
        ))}
      </Grid>

      {isPaginate  && (
        <Box
          className="w-full pt-7 flex justify-center items-center"
        >
          <Button
            className="sm:p-2.5 bg-[#055547] hover:bg-[#055547ee]"
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            disabled={loading}
            onClick={onLoadMore}
          >
            {loading ? "Loading..." : "Load more"}
          </Button>
        </Box>
      )}
    </SectionWidget>
  );
};

export default memo(BlockCardWide10x);
