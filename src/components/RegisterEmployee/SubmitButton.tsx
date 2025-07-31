import { Button, Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  const styles = {
    submitButton: {
      py: 1.5,
      borderRadius: "12px",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      bgcolor: "#ffd500",
      color: "#1f2937",
      "&:hover": {
        bgcolor: "#e6c200",
        boxShadow: "0 8px 20px rgba(255, 213, 0, 0.3)",
        transform: "translateY(-2px)",
      },
      "&:disabled": { bgcolor: "#d1d5db", color: "#6b7280" },
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
      width: "100%",
      maxWidth: "300px",
      mx: "auto",
      mt: 3,
    },
    loadingContainer: {
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    },
  };

  return (
    <motion.div
      whileHover={!isLoading ? { scale: 1.02 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
    >
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={styles.submitButton}
      >
        {isLoading ? (
          <Box sx={styles.loadingContainer}>
            <CircularProgress size={20} color="inherit" thickness={5} />
            <Typography component="span">Processing...</Typography>
          </Box>
        ) : (
          "Register Employee"
        )}
      </Button>
    </motion.div>
  );
};
