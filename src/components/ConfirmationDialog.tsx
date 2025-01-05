import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const ConfirmationDialog = (props: {
    heading: String,
    body: String,
    open: boolean,
    onClose: (value?: string) => void,
    onConfirm: () => void,
}) => {
    const { heading, body, open, onClose, onConfirm} = props;

    const handleCancel = () => {
        onClose();
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    }
  
    return (
      <>
        <Dialog
          open={open}
          onClose={handleCancel}
        >
          <DialogTitle>
            {heading}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}