import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import CardGrid from "../../card/CardGrid";
import SectionWidget from "../../SectionWidget";

const BlockGridPostCard = ({ className, postData, title, ...rest }) => {
  const allPosts = postData;

  return (
    <>
      <Box component="section">
        <Container maxWidth="lg">
          <SectionWidget
            className={`ik_recommend${className ? className : ""}`}
            title={title}
            {...rest}
          >
            <Grid className="ik_recommend__row" container spacing={2}>
              {allPosts &&
                allPosts.map((article) => (
                  <Grid
                    className="ik_recommend__col"
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

BlockGridPostCard.propTypes = {
  className: PropTypes.string,
  postData: PropTypes.array.isRequired,
  sectionTitle: PropTypes.object,
  rest: PropTypes.object,
};

export default BlockGridPostCard;
