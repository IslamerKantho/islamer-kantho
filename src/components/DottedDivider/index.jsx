import { Box, Container } from "@mui/material";

function DottedDivider() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Box
        className="dotted-devider"
        sx={{
          backgroundImage: "radial-gradient( #055547 20%, transparent 0)",
          backgroundPosition: "0 0",
          backgroundSize: "3px 3px",
          height: "9px",
          width: "100%",
        }}
      ></Box>
    </Container>
  );
}

export default DottedDivider;
