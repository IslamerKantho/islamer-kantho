// Core Components
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import Container from "../container";

const BlockFooter = ({ className }) => {
  return (
    <>
      <footer className={`ik_footer${className ? className : ""}`}>
        <Container dataClasses="mx_auto">
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <Box className="ik_footer_weidget">
                <Box className="footer_image">
                  <Image
                    src={`/img/branding/logo.png`}
                    alt="Islamer Kantho"
                    height={34.8}
                    width={184}
                  />
                </Box>

                <p>
                  ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মুখে ‘আহলে সুন্নাত ওয়াল জামাআত
                  এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে
                  অপব্যাখ্যা ও ভ্রান্ত ধারনা নিরসনের লক্ষ্যে কাজ করা আমাদের
                  একমাত্র উদ্দেশ্য।
                </p>
              </Box>
            </Grid>

            <Grid columns={{ xs: 4, md: 4, sm: 12 }}>
              <Box className="ik_flex ik_justify_center">
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <ul className="ik__list ik_list_0">
                      <li>
                        <Link href={`/`}>About us</Link>
                      </li>

                      <li>
                        <Link href={`/`}>Contact us</Link>
                      </li>

                      <li>
                        <Link href={`/`}>Newsroom</Link>
                      </li>
                    </ul>
                  </Grid>

                  <Grid item lg={12} md={12} sm={24}>
                    <ul className="ik__list ik_list_0">
                      <li>
                        <Link href={`/`}>Contribute</Link>
                      </li>

                      <li>
                        <Link href={`/`}>Advertising</Link>
                      </li>

                      <li>
                        <Link href={`/`}>Privacy Policy</Link>
                      </li>

                      <li>
                        <Link href={`/`}>Terms</Link>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </footer>

      <style jsx>{`
        p {
          font-size: 12px;
          line-height: 18px;
          color: #aeaeb2;
        }
        a {
          text-decoration: none;
        }

        footer {
          padding: 40px 0;
          width: 100%;
          background-color: rgb(0, 0, 0);
          color: rgb(142, 142, 147);
        }
        .ik_container_left {
          width: 100%;
          max-width: 360px;
        }
        .ik_container_middle {
          width: calc(100% / 3);
        }
        .ik_container_right {
          width: 270px;
        }

        .ik_container_left p {
          margin: 20px 0px 40px;
          color: rgb(174, 174, 178);
          font-size: 12px;
          line-height: 1.7;
        }

        .ik__list {
          margin-right: 58px;
        }
        .ik__list:last-of-type {
          margin-right: 0;
        }
        .ik__list li {
          margin-right: 58px;
          font-size: 12px;
          margin: 0px 15px 20px;
          text-transform: capitalize;
        }
        .ik__list li a {
          color: rgb(255, 255, 255);
        }

        .ik_widget_subscribe {
        }
        .ik_widget_subscribe h5 {
          margin-bottom: 10px;
          color: #fff;
        }
        .ik_widget_subscribe p {
          font-size: 12px;
          color: #8e8e93;
        }
        .ik_widget_subscribe {
        }

        .ik_footer_weidget {
        }
        .ik_footer_weidget .v {
          max-width: 300px;
          marign-bottom: 25px !important;
        }
      `}</style>
    </>
  );
};

BlockFooter.propTypes = {
  className: PropTypes.string,
};

export default BlockFooter;
