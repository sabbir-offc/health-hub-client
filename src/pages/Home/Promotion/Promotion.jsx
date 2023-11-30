import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import promotions from "../../../../public/promotions.json";
const Promotion = () => {
  return (
    <>
      <Grid my={"30px"}>
        <Typography
          display={"inline-block"}
          fontSize={30}
          fontWeight={500}
          color={"#4CAF50"}
        >
          Get Discount
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container gap={5} sx={{ placeItems: "center" }}>
          {promotions.map((card) => (
            <Grid item key={card.id}>
              <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card?.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Typography>Discount: {card.discount}</Typography>
                    <Typography>ExpireDate: {card.expiryDate}</Typography>
                  </Box>
                  <br></br>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "block",
                      ml: "10px",
                    }}
                  >
                    See More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Promotion;
