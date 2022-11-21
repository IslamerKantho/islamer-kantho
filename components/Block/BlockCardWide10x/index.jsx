import { Box, Button, Grid } from "@mui/material";
import CardFullWide from "../../card/CardFullWide";
import SectionWidget from "../../SectionWidget";

const BlockCardWide10x = ({
  className,
  title,
  postData,
  nextPage,
  page,
  totalPage,
  ...rest
}) => {
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

        {page < totalPage && (
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
              onClick={nextPage}
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
    </>
  );
};

export default BlockCardWide10x;
