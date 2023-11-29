import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import teams from "../../../../public/teams.json";
const Team = () => {
  return (
    <>
      <Grid my={20} width={"70%"} mx={"auto"}>
        <Typography textAlign={"center"} variant="h4" color={"#FF5722"} mb={5}>
          Meet The Team
        </Typography>
        <Box>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            autoplay={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {teams.map((team) => (
              <SwiperSlide key={team.id}>
                <Box
                  textAlign={"center"}
                  minHeight={"400px"}
                  bgcolor={"#EEEEEE"}
                  p={3}
                  component={Paper}
                  elevation={5}
                >
                  <Avatar
                    src={team.image}
                    alt={team.name}
                    sx={{ width: "80px", height: "80px", mx: "auto" }}
                  ></Avatar>
                  <Box mt={2}>
                    <Box
                      width={"100%"}
                      bgcolor={"#4CAF50"}
                      py={"8px"}
                      borderRadius={"8px"}
                      mb={2}
                    >
                      <Typography variant="h5" color={"white"}>
                        {team.name}
                      </Typography>
                      <Typography variant="p" color={"white"}>
                        {team.role}
                      </Typography>
                    </Box>

                    <Typography variant="p" color={"black"} lineHeight={"16px"}>
                      {team.details}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>
    </>
  );
};

export default Team;
