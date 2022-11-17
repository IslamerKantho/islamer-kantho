// import { Row, Col } from ''
import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import FormatterDate from "../FormatterDate";

const ArticleHeader = ({
  className,
  title,
  date,
  author,
  excerpt,
  category,
}) => {
  const style = {
    mainHeader: {
      fontSize: "34px",
      lineHeight: "42px",
      fontWeight: 700,
      color: "#2A2A2A",
    },
    headerRow: {
      height: "100%",
    },
    avater: {
      marginRight: 12,
    },
  };

  return (
    <>
      <div className={`ik_article_header${className ? className : ""} `}>
        <Grid
          container
          spacing={5}
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            height: "100%",
          }}
        >
          <Grid item>
            <Box className="ik_header_top_content" sx={{}}>
              <Box className="ik_meta">
                <Chip
                  label="হাদীস শরীফ"
                  sx={{
                    marginBottom: "10px",
                    fontSize: "13px",
                    lineHeight: "22px",
                    color: "#fff",
                    borderRadius: 0,
                    background: "#1A1A1A",
                  }}
                />
              </Box>

              <Typography
                className={`ik_article__title${className ? className : ""} `}
                variant="h1"
                sx={{
                  marginTop: "10px",
                  fontSize: { xs: "24px", md: "34px" },
                  lineHeight: { xs: "32px", md: "42px" },
                  color: "#000000",
                  fontWeight: 700,
                }}
              >
                {title}
              </Typography>

              <Typography
                className="ik_article__excerpt"
                variant="body2"
                sx={{
                  marginTop: "15px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#000000",
                }}
              >
                {excerpt}
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Stack direction="row" spacing={2}>
              <Box>
                <Avatar alt={author.name} src={author.picture} />
              </Box>

              <Box>
                <Typography
                  className="ik_article__meta__author"
                  variant="body2"
                  style={style.category}
                >
                  {author.name}
                </Typography>

                <Typography className="ik_article__meta__date" variant="body2">
                  <FormatterDate dateString={date} />
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

ArticleHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.object,
  author: PropTypes.object,
  excerpt: PropTypes.string,
  category: PropTypes.object,
};

export default ArticleHeader;
