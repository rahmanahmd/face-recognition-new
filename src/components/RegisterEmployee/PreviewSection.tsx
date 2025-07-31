import { Box } from "@mui/material";
import { motion } from "framer-motion";

interface PreviewSectionProps {
  imagePreview: string | null;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  imagePreview,
}) => {
  const styles = {
    previewContainer: {
      mt: 3,
      borderRadius: "12px",
      width: "100%",
      maxWidth: "300px",
      mx: "auto",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      border: "1px solid #e5e7eb",
    },
    imagePreview: {
      width: "100%",
      height: "200px",
      objectFit: "cover" as const,
    },
  };

  return imagePreview ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={styles.previewContainer}
    >
      <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
    </motion.div>
  ) : null;
};
