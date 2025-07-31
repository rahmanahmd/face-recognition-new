import { Alert } from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

interface AlertMessageProps {
  message: string;
  severity: "success" | "error";
  onClose: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  severity,
  onClose,
}) => {
  const styles = {
    alert: {
      borderRadius: "12px",
      mx: { xs: 2, sm: 3 },
      mt: 2,
      border: "1px solid",
      borderColor: (theme: any) =>
        theme.palette.mode === "light" ? "#e5e7eb" : "#374151",
      "& .MuiAlert-icon": { alignItems: "center" },
      fontSize: "1rem",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert
        severity={severity}
        sx={styles.alert}
        icon={
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {severity === "success" ? (
              <CheckCircle size={24} />
            ) : (
              <AlertCircle size={24} />
            )}
          </motion.div>
        }
        onClose={onClose}
      >
        {message}
      </Alert>
    </motion.div>
  );
};
