import { Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface AttendanceSettingsButtonProps {
  showSettings: boolean;
  onClick: () => void;
}

const AttendanceSettingsButton: React.FC<AttendanceSettingsButtonProps> = ({
  showSettings,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      startIcon={<AccessTimeIcon />}
      sx={{
        bgcolor: "#FFD500",
        color: "#000000",
        fontWeight: 600,
        px: 3,
        py: 1,
        borderRadius: 2,
        "&:hover": { bgcolor: "#e6c300" },
        position: "absolute",
        top: 24,
        right: 40,
        zIndex: 1001,
        boxShadow: 2,
      }}
    >
      {showSettings ? "Sembunyikan Pengaturan" : "Atur Waktu Absensi"}
    </Button>
  );
};

export default AttendanceSettingsButton;
