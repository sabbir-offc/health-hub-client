import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const WebTitle = ({ title }) => {
  return (
    <Helmet>
      <title>Diagnostic Center | {title}</title>
    </Helmet>
  );
};
WebTitle.propTypes = {
  title: PropTypes.string,
};
export default WebTitle;
