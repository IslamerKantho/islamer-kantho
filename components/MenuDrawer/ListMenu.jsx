import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import { IconContext } from "react-icons";
import { SIDEBAR_CATAGORY } from "../../db/categories.db";
import { ImBook } from "react-icons/im";

const ListMenu = ({ title, list, color }) => {
  return (
    <>
      <Box
        sx={{
          marginBottom: "10px",
        }}
      >
        {/* Section Heading */}
        <Box
          sx={{
            padding: "16px 0 10px 16px",
          }}
        >
          <Typography
            sx={{
              paddingBottom: "8px",
              color: color ? color : "#111",
              fontSize: "16px",
              lineHeight: "16px",
              fontWeight: 700,
              borderBottom: `1px solid ${color ? `${color}38` : "#eee"}`,
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Categories*/}
        <Box sx={{}}>
          <Box
            component="ul"
            sx={{
              width: "100%",
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "inline-block",
              float: "left",
            }}
          >
            {list.map((e, i) => (
              <Box
                key={i}
                component="li"
                sx={{
                  width: "50%",
                  display: "inline-block",
                  float: "left",
                }}
              >
                <Box
                  href={`/category/${e.slug}`}
                  component={Link}
                  sx={{
                    padding: "7px 0 7px 16px",
                    color: "#111",
                    position: "relative",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "14px",
                    lineHeight: "36px",
                    transform: "translate3d(0, 0, 0)",
                    borderRight: "1px solid #eee",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "36px",
                      height: "36px",
                      marginRight: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#E8E8E8",
                      borderRadius: "50%",
                    }}
                  >
                    <IconContext.Provider
                      value={{
                        // color: "#333",
                        color: color ? color : "#333",
                        style: {
                          width: "16px",
                          height: "16px",
                        },
                      }}
                    >
                      <ImBook />
                    </IconContext.Provider>
                  </Box>

                  {e.title}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ListMenu;
