import { Box, Divider, Grid, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const Promotion = () => {
  const logo = [
    "https://mbluxury1.s3.amazonaws.com/2022/02/25172616/chanel-1.jpg",
    "https://mbluxury1.s3.amazonaws.com/2022/02/25172711/versace.jpg",
    "https://mbluxury1.s3.amazonaws.com/2022/02/25172702/ralph-lauren.jpg",
    "https://typogram.co/blog/media/posts/14//burberry-4.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Caltex_brand_logo.svg/800px-Caltex_brand_logo.svg.png",
    "https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png",
    "https://1000logos.net/wp-content/uploads/2021/11/logo-Converse.png",
  ];
  return (
    <>
      <Grid my={"30px"}>
        <Typography
          display={"inline-block"}
          fontSize={30}
          fontWeight={500}
          color={"#4CAF50"}
        >
          Meet Our Sponsors
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box height={"200px"} width={"70%"} mx={"auto"} overflow={"hidden"}>
          <Marquee>
            {logo.map((ig) => (
              <img
                src={ig}
                alt=""
                key={ig}
                style={{ height: "200px", marginRight: "20px" }}
              />
            ))}
          </Marquee>
        </Box>
      </Grid>
    </>
  );
};

export default Promotion;
