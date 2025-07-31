import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
} from "@mui/material";
import { Camera, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface ImageInputSwitcherProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const ImageInputSwitcher: React.FC<ImageInputSwitcherProps> = ({
  onImageSelect,
  disabled,
  inputRef,
}) => {
  const [mode, setMode] = useState<"camera" | "file">("file");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 }, // Increased for larger display
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Failed to access camera:", error);
      }
    };

    if (mode === "camera" && !disabled) {
      startCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [mode, disabled]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", {
              type: "image/jpeg",
            });
            onImageSelect(file);
            setMode("file");
          }
        }, "image/jpeg");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const styles = {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 3,
    },
    toggleGroup: {
      width: "100%",
      borderRadius: "10px",
      mb: 2,
      "& .MuiToggleButton-root": {
        flex: 1,
        py: 1.5,
      },
    },
    toggleButton: {
      textTransform: "none",
      borderRadius: "10px",
      display: "flex",
      gap: 1.5,
      color: "#64748b",
      "&.Mui-selected": {
        backgroundColor: "rgba(255, 213, 0, 0.08)",
        color: "#ffd500",
        "&:hover": {
          backgroundColor: "rgba(255, 213, 0, 0.12)",
        },
      },
    },
    buttonText: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    fileUploadContainer: {
      width: "100%",
    },
    uploadArea: {
      border: "2px dashed #e2e8f0",
      borderRadius: "12px",
      padding: 4,
      cursor: "pointer",
      backgroundColor: "#f8fafc",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#ffd500",
        backgroundColor: "#fefce8",
      },
    },
    uploadContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 4,
      gap: 1.5,
    },
    uploadText: {
      fontSize: "1.1rem",
      fontWeight: 500,
      color: "#475569",
      mt: 1,
    },
    cameraContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
    },
    videoWrapper: {
      width: "100%",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#f1f5f9",
      border: "1px solid #e2e8f0",
    },
    video: {
      width: "100%",
      height: "400px", // Increased for larger display
      objectFit: "cover" as const,
      backgroundColor: "#0f172a",
    },
    captureButton: {
      mt: 1.5,
      py: 1.5,
      px: 4,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: "10px",
      backgroundColor: "#ffd500",
      color: "#1f2937",
      "&:hover": {
        backgroundColor: "#e6c200",
        boxShadow: "0 4px 12px rgba(255, 213, 0, 0.3)",
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, newMode) => newMode && setMode(newMode)}
        disabled={disabled}
        sx={styles.toggleGroup}
        aria-label="Choose upload method"
      >
        <ToggleButton
          value="file"
          aria-label="Upload file"
          sx={styles.toggleButton}
        >
          <Upload size={18} />
          <Typography sx={styles.buttonText}>Upload</Typography>
        </ToggleButton>
        <ToggleButton
          value="camera"
          aria-label="Use camera"
          sx={styles.toggleButton}
        >
          <Camera size={18} />
          <Typography sx={styles.buttonText}>Camera</Typography>
        </ToggleButton>
      </ToggleButtonGroup>

      {mode === "file" ? (
        <Box sx={styles.fileUploadContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Paper
            elevation={0}
            sx={styles.uploadArea}
            onClick={disabled ? undefined : triggerFileInput}
          >
            <motion.div
              whileHover={{ scale: disabled ? 1 : 1.02 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
            >
              <Box sx={styles.uploadContent}>
                <Upload size={40} color="#64748b" />
                <Typography sx={styles.uploadText}>
                  Click to browse files
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  PNG, JPG or JPEG (max. 5MB)
                </Typography>
              </Box>
            </motion.div>
          </Paper>
        </Box>
      ) : (
        <Box sx={styles.cameraContainer}>
          <Paper elevation={0} sx={styles.videoWrapper}>
            <video ref={videoRef} style={styles.video} muted playsInline />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </Paper>
          <motion.div
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
          >
            <Button
              onClick={handleCapture}
              variant="contained"
              disabled={disabled}
              startIcon={<Camera size={18} />}
              sx={styles.captureButton}
            >
              Capture Photo
            </Button>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};
