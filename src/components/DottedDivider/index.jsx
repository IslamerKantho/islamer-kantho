import { Box, Container } from "@mui/material";

function DottedDivider() {
  return (
    <Container className="max-w-[1280px] px-5"
      maxWidth="xl"
    >
      <Box
        className="dotted-devider w-full h-2.5 bg-[radial-gradient(#055547_20%,_transparent_0)] [background-position:0_0] [background-size:3px_3px]"
      ></Box>
    </Container>
  );
}

export default DottedDivider;
