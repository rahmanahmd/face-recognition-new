import { Box, Typography } from "@mui/material";
import { ImageInputSwitcher } from "../ImageInputSwitcher";

interface ImageSectionProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  onImageSelect,
  isLoading,
  inputRef,
}) => {
  const styles = {
    imageSection: {
      padding: { xs: "32px", sm: "40px" },
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontWeight: 600,
      color: "#1f2937",
      mb: 2,
      fontSize: "1.2rem",
    },
    helperText: {
      color: "#6b7280",
      mb: 3,
      fontSize: "1rem",
    },
    imageInputContainer: {
      width: "100%",
      maxWidth: "600px",
      mx: "auto",
    },
  };

  return (
    <Box sx={styles.imageSection}>
      <Typography variant="subtitle1" sx={styles.sectionTitle}>
        Face Photo
      </Typography>
      <Typography variant="body2" sx={styles.helperText}>
        Upload or capture a clear photo of the employee's face (min. 100×100px,
        max 5MB)
      </Typography>
      <Box sx={styles.imageInputContainer}>
        <ImageInputSwitcher
          onImageSelect={onImageSelect}
          disabled={isLoading}
          inputRef={inputRef}
        />
      </Box>
    </Box>
  );
};
