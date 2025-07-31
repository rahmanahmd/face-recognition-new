import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDownloadAttendance } from "../../hooks/useAbsensi";
import { format } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { motion } from "framer-motion";

const DownloadButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState<"specific" | "all">(
    "specific"
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const downloadAttendance = useDownloadAttendance();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    if (downloadMode === "specific" && !selectedDate) {
      alert("Please select a date");
      return;
    }
    const params =
      downloadMode === "specific" && selectedDate
        ? { date: format(selectedDate, "yyyy-MM-dd") }
        : { all: true };
    downloadAttendance.mutate(params, {
      onSuccess: () => {
        console.log("CSV downloaded successfully");
        handleClose();
      },
      onError: (error: any) => {
        alert(`Failed to download CSV: ${error.message}`);
      },
    });
  };

  return (
    <>
      <Button
        sx={{
          mt: 2,
          bgcolor: "#ffd500",
          color: "#000000",
          fontWeight: 700,
          fontSize: "1rem",
          px: 3,
          py: 1.5,
          borderRadius: "8px",
          "&:hover": { bgcolor: "#ffd500" },
        }}
        onClick={handleOpen}
      >
        Download Attendance
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download Attendance CSV</DialogTitle>
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* SELECT */}
              <FormControl
                fullWidth
                sx={{
                  mt: 2,
                  mb: 2,
                  "& label.Mui-focused": { color: "#000000" },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "#000000" },
                  },
                }}
              >
                <InputLabel>Download Mode</InputLabel>
                <Select
                  value={downloadMode}
                  onChange={(e) =>
                    setDownloadMode(e.target.value as "specific" | "all")
                  }
                  label="Download Mode"
                >
                  <MenuItem value="specific">Tanggal Spesifik</MenuItem>
                  <MenuItem value="all">Semua Data</MenuItem>
                </Select>
              </FormControl>

              {/* DATE PICKER */}
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disabled={downloadMode === "all"}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      mt: 2,
                      "& label.Mui-focused": { color: "#000000" },
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": { borderColor: "#000000" },
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </motion.div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "#ffd500",
              color: "#000000",
              fontWeight: 700,
              fontSize: "1rem",
              px: 3,
              py: 1,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#ffd500" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            sx={{
              bgcolor: "#ffd500",
              color: "#000000",
              fontWeight: 700,
              fontSize: "1rem",
              px: 3,
              py: 1,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#ffd500" },
            }}
            disabled={
              downloadAttendance.isPending ||
              (downloadMode === "specific" && !selectedDate)
            }
          >
            {downloadAttendance.isPending ? "Downloading..." : "Download"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DownloadButton;
