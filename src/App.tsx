import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
// import { AbsensiDashboard } from "./pages/AbsensiDashboard";
import { RegisterEmployee } from "./pages/RegisterEmployee";
import KontingenChart from "./pages/KontingenChart";
import { KontingenDetails } from "./pages/KontingenDetails";
import { Sidebar } from "./components/Sidebar";
import { Box } from "@mui/material";
import { startAbsensi, stopAbsensi, checkCameraStatus } from "./api/absensiApi";
import RealTimeClock from "./components/RealTimeClock";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 900px)": {
            marginLeft: "0 !important",
            width: "100% !important",
            paddingTop: "0 !important",
            paddingBottom: "0 !important",
          },
        },
      },
    },
  },
});

function AppContent() {
  const location = useLocation();
  const [isCameraRunning, setIsCameraRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Halaman yang harus menyalakan kamera
  const isCameraPage = ["/", "/dashboard_absensi", "/chart"].includes(
    location.pathname
  );

  const syncCameraStatus = useCallback(async () => {
    try {
      const running = await checkCameraStatus();
      setIsCameraRunning(running);
      return running;
    } catch {
      setIsCameraRunning(false);
      return false;
    }
  }, []);

  const manageCamera = useCallback(async () => {
    const running = await syncCameraStatus();

    if (isCameraPage && !running) {
      await startAbsensi();
      setIsCameraRunning(true);
    } else if (!isCameraPage && running) {
      await stopAbsensi();
      setIsCameraRunning(false);
    }
  }, [isCameraPage, syncCameraStatus]);

  // Sync saat route berubah
  useEffect(() => {
    manageCamera();
  }, [location.pathname, manageCamera]);

  // Visibility & unload events
  useEffect(() => {
    const handleVisibility = async () => {
      if (document.hidden && isCameraRunning) {
        await stopAbsensi();
        setIsCameraRunning(false);
      } else if (!document.hidden && !isCameraRunning && isCameraPage) {
        await startAbsensi();
        setIsCameraRunning(true);
      }
    };

    const handlePageHide = async () => {
      if (isCameraRunning) {
        await stopAbsensi();
        setIsCameraRunning(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);

      if (isCameraRunning) {
        stopAbsensi().finally(() => setIsCameraRunning(false));
      }
    };
  }, [isCameraPage, isCameraRunning]);

  return (
    <Box
      sx={{ display: "flex" }}
      className={isSidebarOpen ? "sidebar-open" : ""}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box
        sx={{
          flexGrow: 1,
          width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <Routes>
          {/* <Route
            path="/dashboard_absensi"
            element={
              <AbsensiDashboard
                sidebarOpen={isSidebarOpen}
                drawerWidth={isSidebarOpen ? 240 : 72}
              />
            }
          /> */}
          <Route
            path="/chart"
            element={<KontingenChart isSidebarOpen={isSidebarOpen} />}
          />
          <Route
            path="/"
            element={<KontingenChart isSidebarOpen={isSidebarOpen} />}
          />
          <Route
            path="/register"
            element={<RegisterEmployee isSidebarOpen={isSidebarOpen} />}
          />

          <Route
            path="/kontingen/:kontingen"
            element={<KontingenDetails isSidebarOpen={isSidebarOpen} />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <RealTimeClock />
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
