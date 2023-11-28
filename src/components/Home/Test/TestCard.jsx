import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TestCard = ({ test }) => {
  const { title, details, image, _id } = test;
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
