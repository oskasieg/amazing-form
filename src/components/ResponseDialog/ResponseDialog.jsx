import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ResponseDialog = ({ open, data, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Response"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <pre> {JSON.stringify(data, 0, 2)} </pre>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;
