import "./GenericDialog.scss";
import CloseIconButton from "../../assets/images/icon-close.svg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const GenericDialog = ({ title, subtitle, children, open, setOpen, onClose }: any) => {

  const handleClose = (event?: object, reason?: string) => {
    if (reason && reason === "backdropClick") {
      return ;
    }

    onClose();

    setOpen(false);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        className="version-button-dialog"
        open={open}
        disableEscapeKeyDown
      >
        <DialogTitle
          sx={{
            fontFamily: "var(--main-font-family) !important",
            fontSize: 24,
            fontWeight: 600,
            m: 0,
            marginBottom: "30px",
            p: 0,
            textAlign: "center"
          }}
          id="customized-dialog-title"
          className="dialog-title"
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 30,
            top: 30,
            padding: "0",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <img src={CloseIconButton} alt="" />
        </IconButton>
        <DialogContent
          sx={{
            padding: "0",
          }}
        >
          <Typography
            gutterBottom
            sx={{
              fontSize: "14px",
              fontFamily: "var(--main-font-family)",
              fontWeight: "400",
              lineHeight: "27px"
            }}
          >
            {subtitle}
          </Typography>

          {children}

        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenericDialog;