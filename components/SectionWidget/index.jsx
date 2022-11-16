import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const SectionWidget = ({ title, children, ...rest }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "40px 0",
      }}
      {...rest}
    >
      {title && (
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Container maxWidth="lg" disableGutters>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                marginBottom: "20px",
                color: "#055547",
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
          </Container>
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Container maxWidth="lg" disableGutters>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

SectionWidget.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  rest: PropTypes.object,
};

export default SectionWidget;
