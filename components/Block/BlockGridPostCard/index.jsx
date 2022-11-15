import { Box, Container, Grid } from "@mui/material";
import CardGrid from "../../card/CardGrid";
import SectionWidget from "../../SectionWidget";
import S from "./BlockGridPostCard.module.sass";

const BlockGridPostCard = ({ className, postData, title, ...rest }) => {
  const allPosts = postData;

  return (
    <>
      <Box component={S.__section}>
        <Container className={S.__container} maxWidth="lg">
          <SectionWidget
            className={[S.__recommend, className]}
            title={title}
            {...rest}
          >
            <Grid className={S.__row} container spacing={2}>
              {allPosts &&
                allPosts.map((article) => (
                  <Grid
                    className={S.__col}
                    item
                    key={article._id}
                    xs={12}
                    sm={6}
                    md={3}
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
