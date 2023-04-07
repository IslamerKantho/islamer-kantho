import { Box, Container, Grid } from "@mui/material";
import CardGrid from "../../card/CardGrid";
import SectionWidget from "../../SectionWidget";

const BlockGridPostCard = ({ className, posts, title, ...rest }) => {
  return (
    <>
      <Box component="section">
        <Container maxWidth="lg">
          <SectionWidget title={title} {...rest}>
            <Grid container spacing={2}>
              {posts &&
                posts?.map((article) => (
                  <Grid
                    item
                    key={article._id}
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ width: "100%" }}
                  >
                    <CardGrid cardData={article} />
                  </Grid>
                ))}
            </Grid>
          </SectionWidget>
        </Container>
      </Box>
    </>
  );
};

export default BlockGridPostCard;
