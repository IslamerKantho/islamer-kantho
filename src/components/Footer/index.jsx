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
const Footer = ({ className }) => {
  return (
    <>
      <Box
        className="w-full px-0 pt-16 pb-20 bg-[#31313B] text-[#8E8E93]"
        component="footer"
      >


        <Box>
          <Container className="w-full" maxWidth="lg">
            
            <Box className="max-md:w-[278px] md:w-[270px]" >
              <Image
                  className="w-full"
                  src={`/img/branding/logo.png`}
                  alt="Islamer Kantho"
                  height={34.8}
                  width={184}
                />
            </Box>
            </Container>
            
          <Container className="w-full mt-10" maxWidth="lg">
            <Typography className="text-xs">Scientific American is part of Springer Nature, which owns or has commercial relations with thousands of scientific publications (many of them can be found at www.springernature.com/us). Scientific American maintains a strict policy of editorial independence in reporting developments in science to our readers.</Typography>
            
            <Box className="mt-5">
              {/* Footer Links */}
              
                {LINKS.map((item) => (
                  <Typography
                    key={item.title}
                    component={Link}
                    href={item.url}
                    className="text-xs leading-5 font-bold mt-3 me-4 text-[#8E8E93] hover:text-secondary no-underline hover:underline"
                  >
                    {item.title}
                  </Typography>
                ))}
            </Box>
            <Typography className="text-xs leading-5 font-bold mt-3">© 2020–2024. All rights reserved.</Typography>
            <Typography className="text-xs leading-5" >Technical Support <a className="text-secondary" href="https://dot9.dev/" target="_blank" rel="opener referrer"><b>Dot9.dev</b></a></Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
