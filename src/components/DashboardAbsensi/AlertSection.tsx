import { Alert, Button } from "@mui/material";

interface AlertSectionProps {
  isBackendActive: boolean;
  cameraStatus: { activeCameras: number } | undefined;
  isCameraLoading: boolean;
}

export const AlertSection: React.FC<AlertSectionProps> = ({
  isBackendActive,
  cameraStatus,
  isCameraLoading,
}) => (
  <>
    {!isBackendActive && (
      <Alert severity="error" sx={{ mb: 4 }}>
        Server Tidak Responsif. Silakan periksa koneksi backend atau coba lagi
        nanti.
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Coba Lagi
        </Button>
      </Alert>
    )}
    {/* {!isCameraLoading && cameraStatus && (
      <Alert
        severity={cameraStatus.activeCameras > 0 ? "success" : "warning"}
        sx={{ mb: 4 }}
      >
        {cameraStatus.activeCameras === 0
          ? "Tidak ada kamera terdeteksi."
          : `Terdeteksi ${cameraStatus.activeCameras} kamera aktif.`}
      </Alert>
    )} */}
  </>
);
