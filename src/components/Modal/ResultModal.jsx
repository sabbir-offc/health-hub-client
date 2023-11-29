import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ResultModal = ({ setOpen, open, result }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Here Is Your Test Result
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Link to={result}>{result}</Link>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

ResultModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  result: PropTypes.string,
};

export default ResultModal;
