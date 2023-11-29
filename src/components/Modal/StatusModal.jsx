import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const StatusModal = ({ setOpen, open, handleSubmit, _id }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Submit Test Result
            </Typography>
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>  </Typography> */}
            <Grid
              id="transition-modal-description"
              component={"form"}
              onSubmit={(e) => handleSubmit(e, _id)}
              sx={{
                p: "5px 4px",
                width: "100%",
              }}
            >
              <TextField
                label={"Enter Test Result"}
                sx={{ mt: 4 }}
                fullWidth
                name="result"
              ></TextField>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
              </Button>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default StatusModal;
