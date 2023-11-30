import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import {
  Box,
  Container,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllRecommendations } from "../../../api/admin";
import Loader from "../../../components/Loader";

// import required modules

const Recommendation = () => {
  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await getAllRecommendations();
      return res;
    },
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <Typography textAlign={"center"} variant="h4" color={"primary"}>
        Personal Recommandations
      </Typography>
      <Divider sx={{ my: 5, width: "60%", mx: "auto" }} />
      <Box>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {recommendations.map((item) => (
            <SwiperSlide key={item._id}>
              <Box
                sx={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${item.image}) center / cover no-repeat`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Container
                  sx={{
                    height: "100%",
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="p" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default Recommendation;
