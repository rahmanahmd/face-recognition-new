// import { useMemo, useRef, useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import { useAbsensi, useBackendStatus } from "../hooks/useAbsensi";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Notification } from "../components/DashboardAbsensi/Notification";
// import { HeaderSection } from "../components/DashboardAbsensi/HeaderSection";
// import { AlertSection } from "../components/DashboardAbsensi/AlertSection";
// import { AbsensiGrid } from "../components/DashboardAbsensi/AbsensiGrid";
// import type { Absensi, GroupedAbsensi } from "../types";

// const fetchCameraStatus = async (): Promise<{ activeCameras: number }> => {
//   const response = await axios.get(
//     `${import.meta.env.VITE_API_URL}/api/absensi/camera_status`
//   );
//   return response.data;
// };

// interface AbsensiDashboardProps {
//   sidebarOpen: boolean;
//   drawerWidth: number;
// }

// export const AbsensiDashboard: React.FC<AbsensiDashboardProps> = ({
//   sidebarOpen,
//   drawerWidth,
// }) => {
//   const { data: absensi = [], isLoading, error } = useAbsensi();
//   const { data: isBackendActive = true } = useBackendStatus();
//   const { data: cameraStatus, isLoading: isCameraLoading } = useQuery({
//     queryKey: ["cameraStatus"],
//     queryFn: fetchCameraStatus,
//     retry: 1,
//     retryDelay: 1000,
//     refetchInterval: 10000,
//   });
//   const statusCache = useRef<Map<string, boolean>>(new Map());
//   const prevAbsensiIds = useRef<Set<number>>(new Set());
//   const [notifications, setNotifications] = useState<
//     Array<{
//       id: string;
//       data: {
//         nama: string;
//         face_image_url: string;
//         attendance_type: string;
//         waktu_absen: string;
//         camera_id: number;
//       };
//     }>
//   >([]);
//   const notificationQueue = useRef<
//     Array<{
//       id: string;
//       data: {
//         nama: string;
//         face_image_url: string;
//         attendance_type: string;
//         waktu_absen: string;
//         camera_id: number;
//       };
//     }>
//   >([]);
//   const MAX_NOTIFICATIONS = 3;
//   const MAX_QUEUE_SIZE = 5;

//   useEffect(() => {
//     // Proses record baru
//     if (absensi.length > 0) {
//       const newRecords = absensi.filter(
//         (item) => !prevAbsensiIds.current.has(item.id)
//       );

//       if (newRecords.length > 0) {
//         newRecords.forEach((record) => {
//           try {
//             const recordTime = new Date(record.waktu_absen);
//             const now = new Date();
//             if ((now.getTime() - recordTime.getTime()) / 1000 < 5) {
//               notificationQueue.current.push({
//                 id: `${record.id}-${Date.now()}`,
//                 data: {
//                   nama: record.nama,
//                   face_image_url: record.face_image_url,
//                   attendance_type: record.attendance_type,
//                   waktu_absen: record.waktu_absen,
//                   camera_id: record.camera_id,
//                 },
//               });
//             }
//           } catch (e) {
//             console.error("Error parsing waktu_absen:", record.waktu_absen, e);
//           }
//         });

//         // Batasi ukuran antrian
//         if (notificationQueue.current.length > MAX_QUEUE_SIZE) {
//           notificationQueue.current = notificationQueue.current.slice(
//             -MAX_QUEUE_SIZE
//           );
//           console.warn("Notification queue trimmed to", MAX_QUEUE_SIZE);
//         }

//         // Update notifikasi
//         setNotifications((prev) => {
//           const currentCount = prev.length;
//           const availableSlots = MAX_NOTIFICATIONS - currentCount;
//           if (availableSlots <= 0) return prev;

//           const newNotifications = notificationQueue.current.slice(
//             0,
//             availableSlots
//           );
//           notificationQueue.current =
//             notificationQueue.current.slice(availableSlots);
//           return [...prev, ...newNotifications];
//         });

//         // Update prevAbsensiIds
//         prevAbsensiIds.current = new Set(absensi.map((item) => item.id));
//       }
//     }
//   }, [absensi]);

//   useEffect(() => {
//     // Proses antrian secara bertahap
//     const interval = setInterval(() => {
//       if (
//         notifications.length < MAX_NOTIFICATIONS &&
//         notificationQueue.current.length > 0
//       ) {
//         setNotifications((prev) => {
//           const availableSlots = MAX_NOTIFICATIONS - prev.length;
//           const newNotifications = notificationQueue.current.slice(
//             0,
//             availableSlots
//           );
//           notificationQueue.current =
//             notificationQueue.current.slice(availableSlots);
//           return [...prev, ...newNotifications];
//         });
//       }
//     }, 500); // Cek antrian setiap 0.5 detik

//     return () => clearInterval(interval);
//   }, [notifications]);

//   const groupedAbsensi = useMemo(() => {
//     const grouped = absensi.reduce(
//       (acc: { [key: string]: GroupedAbsensi }, curr) => {
//         if (!acc[curr.employee_id]) {
//           acc[curr.employee_id] = {
//             employee_id: curr.employee_id,
//             nama: curr.nama,
//             face_image_url: curr.face_image_url,
//             history: [],
//           };
//         }
//         acc[curr.employee_id].history.push({
//           type: curr.attendance_type,
//           time: curr.waktu_absen,
//         });
//         return acc;
//       },
//       {}
//     );

//     Object.values(grouped).forEach((item: GroupedAbsensi) => {
//       item.history.sort(
//         (a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf()
//       );
//       const lastIn = item.history.find((h) => h.type === "IN") || null;
//       const lastOut = item.history.find((h) => h.type === "OUT") || null;
//       const isCurrentlyIn =
//         !!lastIn &&
//         (!lastOut || new Date(lastIn.time) > new Date(lastOut.time));
//       statusCache.current.set(String(item.employee_id), Boolean(isCurrentlyIn));
//     });

//     return Object.values(grouped).sort((a, b) => {
//       const latestA = a.history[0]?.time || "1970-01-01";
//       const latestB = b.history[0]?.time || "1970-01-01";
//       return new Date(latestB).valueOf() - new Date(latestA).valueOf();
//     });
//   }, [absensi]);

//   return (
//     <Box
//       sx={{
//         p: 6,
//         bgcolor: "#f5f5f5",
//         minHeight: "100vh",
//         pl: { xs: sidebarOpen ? `${drawerWidth + 16}px` : "88px" },
//         pr: { xs: sidebarOpen ? 8 : 6 },
//         transition: "padding-left 0.3s, padding-right 0.3s",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Box sx={{ maxWidth: "1400px", width: "100%" }}>
//         <HeaderSection isLoading={isLoading} />
//         <AlertSection
//           isBackendActive={isBackendActive}
//           cameraStatus={cameraStatus}
//           isCameraLoading={isCameraLoading}
//         />
//         {notifications.map((notification) => (
//           <Notification
//             key={notification.id}
//             data={notification.data}
//             onClose={() =>
//               setNotifications((prev) =>
//                 prev.filter((n) => n.id !== notification.id)
//               )
//             }
//           />
//         ))}
//         <AbsensiGrid
//           isLoading={isLoading}
//           error={error}
//           absensi={groupedAbsensi}
//           statusCache={statusCache.current}
//         />
//       </Box>
//     </Box>
//   );
// };
