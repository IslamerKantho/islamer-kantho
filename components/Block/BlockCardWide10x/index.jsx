import { Box, Button, Grid } from "@mui/material";
import CardFullWide from "../../card/CardFullWide";
import SectionWidget from "../../SectionWidget";

const BlockCardWide10x = ({
  className,
  title,
  posts,
  isPaginate,
  loading,
  onLoadMore,
  ...rest
}) => {
  return (
    <SectionWidget className={className} title="সাম্প্রতিক লেখাসমুহ">

      {/* Post loop */}
      <Grid container spacing={2}>
        {posts && posts.map((post, i) => (
          <Grid item key={i} xs={12} md={12}>
            <CardFullWide key={post._id} postData={post} />
          </Grid>
        ))}
      </Grid>

      {isPaginate  && (
        <Box
          sx={{
            width: "100%",
            paddingTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            disabled={loading}
            onClick={onLoadMore}
            sx={{
              padding: { sm: "10px" },
              background: "#055547",
              "&:hover": {
                background: "#055547ee",
              },
            }}
          >
            Load more
          </Button>
        </Box>
      )}
    </SectionWidget>
  );
};

export default BlockCardWide10x;
