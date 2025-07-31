import { useState, useMemo, useRef, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  useKontingenDistribution,
  useStatistics,
  useAbsensi,
  useBackendStatus,
} from "../hooks/useAbsensi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AttendanceSettings from "../components/DashboardChart/AttendanceSettings";
import PieChartContainer from "../components/DashboardChart/PieChartContainer";
import SummaryStats from "../components/DashboardChart/SummaryStats";
import AbsensiInTable from "../components/DashboardChart/AbsensiInTable";
import AbsensiOutTable from "../components/DashboardChart/AbsensiOutTable";
import AttendanceSettingsButton from "../components/AttendanceSettingsButton";
import { Notification } from "../components/DashboardAbsensi/Notification";
import { AlertSection } from "../components/DashboardAbsensi/AlertSection";
import type { Absensi, GroupedAbsensi, StatisticsData } from "../types";

const fetchCameraStatus = async (): Promise<{ activeCameras: number }> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/absensi/camera_status`
  );
  return response.data;
};

interface KontingenChartProps {
  isSidebarOpen: boolean;
}

const KontingenChart = ({ isSidebarOpen }: KontingenChartProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const queryClient = useQueryClient();

  // Kontingen hooks
  const {
    data: kontingenData,
    isLoading: kontingenLoading,
    isError: kontingenError,
    error: kontingenErrorObj,
  } = useKontingenDistribution();
  const {
    data: stats = {
      total_employees: 224,
      total_attendance_today: 13,
      face_encoding_percent: 0,
    },
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorObj,
  } = useStatistics();

  // Absensi hooks
  const {
    data: absensi = [],
    isLoading: absensiLoading,
    error: absensiError,
  } = useAbsensi();
  const { data: isBackendActive = true } = useBackendStatus();
  const { data: cameraStatus, isLoading: isCameraLoading } = useQuery({
    queryKey: ["cameraStatus"],
    queryFn: fetchCameraStatus,
    retry: 1,
    retryDelay: 1000,
    refetchInterval: 10000,
  });

  // Hitung persentase masuk dan pulang dari absensi
  const { persentaseMasuk, persentasePulang } = useMemo(() => {
    const today = new Date("2025-07-31");
    const absensiMasuk = absensi.filter(
      (a) =>
        a.attendance_type === "IN" &&
        new Date(a.waktu_absen).toDateString() === today.toDateString()
    ).length;
    const absensiPulang = absensi.filter(
      (a) =>
        a.attendance_type === "OUT" &&
        new Date(a.waktu_absen).toDateString() === today.toDateString()
    ).length;
    return {
      persentaseMasuk:
        stats.total_employees > 0
          ? (absensiMasuk / stats.total_employees) * 100
          : 0,
      persentasePulang:
        stats.total_employees > 0
          ? (absensiPulang / stats.total_employees) * 100
          : 0,
    };
  }, [absensi, stats.total_employees]);

  // Absensi state and refs
  const statusCache = useRef<Map<string, boolean>>(new Map());
  const prevAbsensi = useRef<Absensi[]>([]);
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      data: {
        nama: string;
        face_image_url: string;
        attendance_type: string;
        waktu_absen: string;
        camera_id: number;
      };
    }>
  >([]);

  // Effect untuk mendeteksi absensi baru dan memperbarui chart
  useEffect(() => {
    if (absensi.length > 0) {
      const newRecords = absensi.filter(
        (item) =>
          !prevAbsensi.current.some(
            (prev) =>
              prev.id === item.id ||
              (prev.employee_id === item.employee_id &&
                prev.waktu_absen === item.waktu_absen)
          )
      );

      if (newRecords.length > 0) {
        console.log("New absensi detected:", newRecords);
        newRecords.forEach((record) => {
          try {
            const recordTime = new Date(record.waktu_absen);
            const now = new Date();
            if ((now.getTime() - recordTime.getTime()) / 1000 < 5) {
              setNotifications((prev) => [
                ...prev,
                {
                  id: `${record.id}-${Date.now()}`,
                  data: {
                    nama: record.nama,
                    face_image_url: record.face_image_url,
                    attendance_type: record.attendance_type,
                    waktu_absen: record.waktu_absen,
                    camera_id: record.camera_id,
                  },
                },
              ]);
            }
          } catch (e) {
            console.error("Error parsing waktu_absen:", record.waktu_absen, e);
          }
        });

        queryClient.invalidateQueries({
          queryKey: ["attendanceChartData", undefined],
        });
        queryClient.invalidateQueries({ queryKey: ["absensi"] }); // Invalidate absensi data
        queryClient.invalidateQueries({ queryKey: ["statistics"] });
      }
    }
    prevAbsensi.current = [...absensi];
  }, [absensi, queryClient]);

  // Logika grouping absensi
  const groupedAbsensi = useMemo(() => {
    const map = new Map<number, GroupedAbsensi>();
    absensi.forEach((curr) => {
      if (!map.has(curr.employee_id)) {
        map.set(curr.employee_id, {
          employee_id: curr.employee_id,
          nama: curr.nama,
          face_image_url: curr.face_image_url,
          history: [],
        });
      }
      map.get(curr.employee_id)!.history.push({
        type: curr.attendance_type as "IN" | "OUT",
        time: curr.waktu_absen,
      });
    });
    return Array.from(map.values());
  }, [absensi]);


  // Styling dinamis
  const dynamicStyles = {
    container: {
      padding: { xs: "40px", md: "10px" },
      margin: "0 auto", // Center container explicitly
      maxWidth: "1400px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      left: 0,
      right: 0,
      transition: "none", // Disable transitions to prevent sidebar following
      "&.kontingen-chart-container": {
        margin: "0 auto",
        width: "100%",
        maxWidth: "1400px",
        paddingTop: { xs: "40px", md: "10px" },
        paddingBottom: { xs: "40px", md: "10px" },
      },
      "&.css-ii6gp1-MuiContainer-root": {
        margin: "0 auto !important", // Override media query
        width: "100% !important",
        maxWidth: "1400px !important",
        paddingTop: { xs: "40px", md: "10px" } + " !important",
        paddingBottom: { xs: "40px", md: "10px" } + " !important",
      },
      "@media (min-width: 900px)": {
        margin: "0 auto !important",
        width: "100% !important",
        maxWidth: "1400px !important",
        paddingTop: "50px !important",
        paddingBottom: "50px !important",
      },
    },
    topSection: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
      justifyContent: "center", // Center content
      alignItems: { xs: "center", md: "center" },
      marginBottom: "20px", // Reduced from 80px for tighter layout
      width: "100%",
      maxWidth: "1400px",
    },
    mainBox: {
      marginTop: { xs: "10px", md: "20px" },
      width: "100%",
      maxWidth: "1400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
    },
    error: {
      color: "red",
      textAlign: "center",
      width: "100%",
    },
    settingsButtonWrapper: {
      display: "flex",
      justifyContent: "center",
      width: { xs: "100%", md: "auto" },
      maxWidth: "200px", // Constrain button width
    },
    tableSection: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" }, // Stack on mobile, side-by-side on desktop
      gap: "20px", // Jarak antar tabel
      width: "100%",
      maxWidth: "1400px",
      justifyContent: "center",
      mt: 4, // Margin top untuk memisahkan dari bagian atas
      px: { xs: 2, md: 0 }, // Padding horizontal untuk mobile
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        maxWidth={false}
        sx={dynamicStyles.container}
        className="kontingen-chart-container"
      >
        <Box sx={dynamicStyles.topSection}>
          <Box sx={dynamicStyles.settingsButtonWrapper}>
            <AttendanceSettingsButton
              showSettings={showSettings}
              onClick={() => setShowSettings(!showSettings)}
            />
          </Box>
          {kontingenLoading || statsLoading ? (
            <Typography sx={dynamicStyles.error}>
              Loading kontingen data...
            </Typography>
          ) : kontingenError || statsError ? (
            <Typography sx={dynamicStyles.error}>
              Error: {kontingenErrorObj?.message || statsErrorObj?.message}
            </Typography>
          ) : (
            <SummaryStats
              totalKaryawan={stats.total_employees}
              absensiHariIni={stats.total_attendance_today}
              persentaseMasuk={persentaseMasuk}
              persentasePulang={persentasePulang}
              cameraStatus={cameraStatus}
              isCameraLoading={isCameraLoading}
            />
          )}
        </Box>
        <Box sx={dynamicStyles.tableSection}>
          <AbsensiInTable data={groupedAbsensi} />
          <AbsensiOutTable data={groupedAbsensi} />
        </Box>
        <AttendanceSettings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Box sx={dynamicStyles.mainBox}>
            <PieChartContainer selectedDate={null} />
            <AlertSection
              isBackendActive={isBackendActive}
              cameraStatus={cameraStatus}
              isCameraLoading={isCameraLoading}
            />
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                data={notification.data}
                onClose={() =>
                  setNotifications((prev) =>
                    prev.filter((n) => n.id !== notification.id)
                  )
                }
              />
            ))}
          </Box>
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
};

export default KontingenChart;
