import {
  Box,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const LINKS = [
  {
    title: "Team",
    url: "/team",
  },
  {
    title: "Contribute",
    url: "/contribute",
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    title: "Terms",
    url: "/terms",
  },
];
const BlockFooter = ({ className }) => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          padding: "40px 0 20px",
          width: "100%",
          backgroundColor: "rgb(0, 0, 0)",
          color: "rgb(142, 142, 147)",
        }}
      >
        {/* Footer Top */}
        <Box>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexGrow: 1,
              flexDirection: { xs: "column", md: "row" },
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            {/* Logo Wrapper */}
            <Box
              sx={{
                width: "50%",
                marginBottom: { md: "80px" },
              }}
            >
              <Box
                sx={{
                  width: { md: "270px" },
                }}
              >
                <Image
                  src={`/img/branding/logo.png`}
                  alt="Islamer Kantho"
                  height={34.8}
                  width={184}
                />
              </Box>
            </Box>

            {/* Newsletter */}
            <Box
              sx={{
                width: { xs: "100%", md: "304px" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "22px",
                    color: "#FFF",
                    fontSize: "17px",
                    lineHeight: "100%",
                    fontWeight: 500,
                  }}
                >
                  Get updates in your inbox.
                </Typography>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    placeholder="Enter your full email address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    color="secondary"
                    sx={{
                      borderWidth: "1px",
                      borderColor: "#fff",
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#fff",
                    opacity: 0.5,
                  }}
                >
                  You can unsubscribe at any time using the link in your emails.
                  For more details, review our privacy policy.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            marginTop: "40px",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              width: "100%",
              paddingTop: "10px",
              display: "flex",
              flexGrow: 1,
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "10px" },
              justifyContent: { xs: "center", md: "space-between" },
              borderTop: "1px solid #252525",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              &copy; 2020-{new Date().getFullYear()}. All right reserved.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: { xs: 1, sm: 2 },
                justifyContent: "space-between",
              }}
            >
              {LINKS.map((e, i) => (
                <Typography
                  key={i}
                  href={e.url}
                  component={Link}
                  target="_blank"
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.8)",
                    "&:hover": {
                      color: "rgb(255,255,255)",
                    },
                  }}
                >
                  {e.title}
                </Typography>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default BlockFooter;
