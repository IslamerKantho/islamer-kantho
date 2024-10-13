import { Box, Container, Typography } from "@mui/material";
import { memo } from "react";

const SectionWidget = ({ title, children, ...rest }) => {
  return (
    <Box className="w-full py-10 md:py-12" {...rest} >
      {title && (
        <Box className="w-full" >
          <Container className="max-w-[1280px]" maxWidth="lg" disableGutters>
            <Typography
              className="mb-5 text-[#055547] text-lg font-bold"
              component="h4"
            >
              {title}
            </Typography>
          </Container>
        </Box>
      )}

      <Box className="w-full" >
        <Container className="max-w-[1280px]" maxWidth="lg" disableGutters>
          {children}
        </Container>
      </Box>
    </Box>
  );
};


export default memo(SectionWidget);
