import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import S from "./SectionWidget.module.sass";

const SectionWidget = ({ className, title, children, ...rest }) => {
  return (
    <Box className={[S.__section, className]} {...rest}>
      {title && (
        <Box className={S.__head}>
          <Container className={S.__headContainer} maxWidth="lg" disableGutters>
            <Typography className={S.__headTitle} variant="h4" component="h4">
              {title}
            </Typography>
          </Container>
        </Box>
      )}

      <Box className={S.__body}>
        <Container className={S.__bodyContainer} maxWidth="lg" disableGutters>
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
