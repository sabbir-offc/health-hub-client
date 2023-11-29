import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {  Grid } from "@mui/material";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const TestCard = ({ test }) => {
  const loacation = useLocation();
  const { title, details, image, _id, slots, date } = test;
  const testDate = new Date(date);
  const modifiedDate = testDate.toLocaleDateString("en-GB");
  return (
    <Grid item>
      <Card sx={{ maxWidth: "290px" }}>
        <CardMedia sx={{ height: 140 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details.slice(0, 60)}...
          </Typography>
          {loacation.pathname === "/tests" && (
            <Grid display={"flex"} justifyContent={"space-between"} mt={1}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                Slots Left: {slots}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                Date: {modifiedDate}
              </Typography>
            </Grid>
          )}
        </CardContent>
        <CardActions>
          <Link to={`/test/${_id}`}>
            <Button size="small" sx={{ color: "#FF9800" }}>
              See more
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};
TestCard.propTypes = {
  test: PropTypes.object,
};

export default TestCard;
