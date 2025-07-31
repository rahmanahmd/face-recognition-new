import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Stack,
  Alert,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAttendanceSettings,
  useUpdateAttendanceSettings,
} from "../../hooks/useAbsensi";

const parseTime = (timeStr: string) => {
  if (!timeStr) return null;
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return new Date(0, 0, 1, hours, minutes, seconds || 0);
};

const formatTime = (date: Date | null) => {
  if (!date) return "";
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:00`;
};

interface AttendanceSettingsProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const AttendanceSettings: React.FC<AttendanceSettingsProps> = ({
  showSettings,
  setShowSettings,
}) => {
  const { data: settings, isLoading } = useAttendanceSettings();
  const updateSettings = useUpdateAttendanceSettings();
  const [checkInTime, setCheckInTime] = useState("08:00:00");
  const [lateTolerance, setLateTolerance] = useState("00:15:00");
  const [checkOutTime, setCheckOutTime] = useState("17:00:00");
  const [error, setError] = useState("");

  useEffect(() => {
    if (settings) {
      setCheckInTime(settings.check_in_time);
      setLateTolerance(settings.late_tolerance);
      setCheckOutTime(settings.check_out_time);
    }
  }, [settings]);

  const handleSubmit = () => {
    setError(""); // Reset error
    updateSettings.mutate({
      check_in_time: checkInTime,
      late_tolerance: lateTolerance,
      check_out_time: checkOutTime,
      updated_at: new Date().toISOString(),
    });
    setShowSettings(false);
  };

  if (isLoading) return <Typography>Loading settings...</Typography>;

  return showSettings ? (
    <Paper
      elevation={3}
      sx={{
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
        borderRadius: "20px",
        bgcolor: "#ffffff",
        p: 3,
        position: "absolute",
        top: 80,
        right: 20,
        zIndex: 1000,
        minWidth: 350,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon sx={{ color: "#FFD500" }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Attendance Settings
          </Typography>
        </Box>
        <IconButton onClick={() => setShowSettings(false)}>
          <CloseIcon />
        </IconButton>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <TimePicker
          label="Check-in Time"
          value={parseTime(checkInTime)}
          onChange={(time) => setCheckInTime(formatTime(time))}
          slotProps={{ textField: { fullWidth: true } }}
          ampm={false}
        />
        <TimePicker
          label="Late Tolerance"
          value={parseTime(lateTolerance)}
          onChange={(time) => setLateTolerance(formatTime(time))}
          slotProps={{ textField: { fullWidth: true } }}
          ampm={false}
        />
        <TimePicker
          label="Check-out Time"
          value={parseTime(checkOutTime)}
          onChange={(time) => setCheckOutTime(formatTime(time))}
          slotProps={{ textField: { fullWidth: true } }}
          ampm={false}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button
          onClick={handleSubmit}
          sx={{
            bgcolor: "#FFD500",
            color: "#000",
            fontWeight: 600,
            px: 3,
            py: 1,
            borderRadius: 2,
            "&:hover": { bgcolor: "#e6c300" },
          }}
        >
          Save Settings
        </Button>
        <Button
          onClick={() => setShowSettings(false)}
          sx={{
            bgcolor: "#FFD500",
            color: "#000",
            fontWeight: 600,
            px: 3,
            py: 1,
            borderRadius: 2,
            "&:hover": { bgcolor: "#e6c300" },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  ) : null;
};

export default AttendanceSettings;
