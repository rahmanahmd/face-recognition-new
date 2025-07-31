import { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";

interface CameraCaptureProps {
  onCapture: (blob: Blob) => void;
}

export const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [streaming, setStreaming] = useState(false);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 }, // Increased for larger display
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        streamRef.current = stream;
        setStreaming(true);
      } catch (err) {
        console.error("Gagal akses kamera:", err);
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && streaming) {
        console.log("Tab tidak aktif, matikan webcam");
        stopCamera();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [streaming]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          onCapture(blob);
          stopCamera();
        }
      }, "image/jpeg");
    }
  };

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "400px", // Increased for larger display
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          objectFit: "cover",
        }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Button
        variant="contained"
        onClick={capturePhoto}
        disabled={!streaming}
        sx={{
          mt: 2,
          width: "100%",
          py: 1.5,
          bgcolor: "#ffd500",
          color: "#1f2937",
          "&:hover": { bgcolor: "#e6c200" },
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        Capture Photo
      </Button>
    </div>
  );
};
