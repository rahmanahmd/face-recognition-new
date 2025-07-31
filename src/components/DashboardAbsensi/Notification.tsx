import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

interface NotificationProps {
  data: {
    nama: string;
    attendance_type: string;
    waktu_absen: string;
    camera_id: number;
  };
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  data,
  onClose,
}) => {
  const isClockIn = data.attendance_type === "IN";

  const formattedTime = new Date(data.waktu_absen).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500); // masih responsif tapi memberi waktu baca

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: 280,
        maxWidth: 360,
        bgcolor: isClockIn ? "#22c55e" : "#3b82f6",
        color: "#fff",
        borderRadius: "10px",
        padding: "16px 20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        textAlign: "center",
        zIndex: 1500,
        animation: "fadeInOut 1.4s ease-in-out forwards",
        "@keyframes fadeInOut": {
          "0%": { opacity: 0, transform: "translate(-50%, -12px)" },
          "20%": { opacity: 1, transform: "translate(-50%, 0)" },
          "80%": { opacity: 1, transform: "translate(-50%, 0)" },
          "100%": { opacity: 0, transform: "translate(-50%, -12px)" },
        },
      }}
    >
      <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, mb: 1 }}>
        {isClockIn ? "Clock IN" : "Clock OUT"} Berhasil
      </Typography>
      <Typography sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
        {data.nama}
      </Typography>
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 400 }}>
        {formattedTime}
      </Typography>
    </Box>
  );
};


// import { useEffect } from "react";
// import { Box, Typography } from "@mui/material";

// interface NotificationProps {
//   data: {
//     nama: string;
//     attendance_type: string;
//     waktu_absen: string;
//     camera_id: number;
//   };
//   onClose: () => void;
// }

// export const Notification: React.FC<NotificationProps> = ({
//   data,
//   onClose,
// }) => {
//   const isClockIn = data.attendance_type === "IN";

//   const formattedTime = new Date(data.waktu_absen).toLocaleTimeString("id-ID", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 1200); // hanya 1.2 detik untuk respon cepat
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 20,
//         left: "50%",
//         transform: "translateX(-50%)",
//         minWidth: 260,
//         maxWidth: 320,
//         bgcolor: isClockIn ? "#22c55e" : "#3b82f6",
//         color: "#fff",
//         borderRadius: "8px",
//         padding: "12px 16px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//         textAlign: "center",
//         fontSize: "0.95rem",
//         zIndex: 1500,
//         animation: "fadeInOut 1.2s ease-in-out forwards",
//         "@keyframes fadeInOut": {
//           "0%": { opacity: 0, transform: "translate(-50%, -10px)" },
//           "20%": { opacity: 1, transform: "translate(-50%, 0)" },
//           "80%": { opacity: 1, transform: "translate(-50%, 0)" },
//           "100%": { opacity: 0, transform: "translate(-50%, -10px)" },
//         },
//       }}
//     >
//       <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
//         {isClockIn ? "Clock IN" : "Clock OUT"} Berhasil
//       </Typography>
//       <Typography>{data.nama}</Typography>
//       <Typography sx={{ fontSize: "0.8rem" }}>{formattedTime}</Typography>
//     </Box>
//   );
// };


// TANPA NOTIF GAMBAR
// import { useEffect } from "react";
// import { Box, Typography } from "@mui/material";

// declare global {
//   interface Window {
//     confetti?: (...args: any[]) => void;
//   }
// }

// interface NotificationProps {
//   data: {
//     nama: string;
//     face_image_url: string;
//     attendance_type: string;
//     waktu_absen: string;
//     camera_id: number;
//   };
//   onClose: () => void;
// }

// export const Notification: React.FC<NotificationProps> = ({
//   data,
//   onClose,
// }) => {
//   const isClockIn = data.attendance_type === "IN";
//   const formattedTime = new Date(data.waktu_absen).toLocaleTimeString("id-ID", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   });
//   const formattedDate = new Date(data.waktu_absen).toLocaleDateString("id-ID", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const positionStyle =
//     data.camera_id === 0
//       ? { left: "50%", transform: "translateX(-380px)" }
//       : { left: "50%", transform: "translateX(20px)" };

//   useEffect(() => {
//     if (!window.confetti) {
//       const script = document.createElement("script");
//       script.src =
//         "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
//       document.head.appendChild(script);
//     } else {
//       window.confetti({
//         particleCount: 3,
//         angle: data.camera_id === 0 ? 60 : 120,
//         spread: 50,
//         origin: { x: data.camera_id === 0 ? 0.3 : 0.7 },
//         colors: isClockIn ? ["#22c55e", "#16a34a"] : ["#3b82f6", "#2563eb"],
//         gravity: 0.8,
//         scalar: 1,
//       });
//     }

//     const timer = setTimeout(() => {
//       onClose();
//     }, 1500); // lebih cepat (1.5 detik)

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [data, onClose, isClockIn]);

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: "20px",
//         ...positionStyle,
//         width: "340px",
//         bgcolor: "#ffffff",
//         borderRadius: "12px",
//         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//         animation: "fadeIn 0.2s ease-out, fadeOut 0.2s ease-in 1.3s forwards",
//         "@keyframes fadeIn": {
//           from: { opacity: 0, transform: "scale(0.9)" },
//           to: { opacity: 1, transform: "scale(1)" },
//         },
//         "@keyframes fadeOut": {
//           from: { opacity: 1, transform: "scale(1)" },
//           to: { opacity: 0, transform: "scale(0.9)" },
//         },
//         zIndex: 1300,
//       }}
//     >
//       <Box
//         sx={{
//           fontSize: "1.2rem",
//           fontWeight: 600,
//           color: "#1f2937",
//           padding: "1rem",
//           background: isClockIn ? "#22c55e" : "#3b82f6",
//           borderRadius: "12px 12px 0 0",
//           textAlign: "center",
//         }}
//       >
//         {isClockIn ? "Clock IN" : "Clock OUT"} Berhasil
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "1rem",
//           gap: "0.5rem",
//         }}
//       >
//         <Typography
//           sx={{ fontSize: "1.2rem", fontWeight: 600, color: "#111827" }}
//         >
//           {data.nama}
//         </Typography>
//         <Typography sx={{ fontSize: "1rem", color: "#4b5563" }}>
//           {formattedTime}
//         </Typography>
//         <Typography sx={{ fontSize: "0.8rem", color: "#6b7280" }}>
//           {formattedDate}
//         </Typography>
//         <Typography
//           sx={{
//             fontSize: "1.2rem",
//             fontWeight: 600,
//             padding: "0.5rem 1.5rem",
//             borderRadius: "20px",
//             background: isClockIn ? "#22c55e" : "#3b82f6",
//             color: "#ffffff",
//           }}
//         >
//           {isClockIn ? "MASUK" : "PULANG"}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// ORIGINAL CODE (commented out for reference)
// import { useEffect } from "react";
// import { Box, Typography } from "@mui/material";

// declare global {
//   interface Window {
//     confetti?: (...args: any[]) => void;
//   }
// }

// interface NotificationProps {
//   data: {
//     nama: string;
//     face_image_url: string;
//     attendance_type: string;
//     waktu_absen: string;
//     camera_id: number;
//   };
//   onClose: () => void;
// }

// export const Notification: React.FC<NotificationProps> = ({
//   data,
//   onClose,
// }) => {
//   const isClockIn = data.attendance_type === "IN";
//   const formattedTime = new Date(data.waktu_absen).toLocaleTimeString("id-ID", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   });
//   const formattedDate = new Date(data.waktu_absen).toLocaleDateString("id-ID", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const positionStyle =
//     data.camera_id === 0
//       ? { left: "50%", transform: "translateX(-380px)" }
//       : { left: "50%", transform: "translateX(20px)" };

//   useEffect(() => {
//     if (!window.confetti) {
//       const script = document.createElement("script");
//       script.src =
//         "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
//       document.head.appendChild(script);
//     }

//     const timer = setTimeout(() => {
//       onClose();
//     }, 2000); // Kurangi durasi ke 2 detik

//     const confettiTimer = setTimeout(() => {
//       if (window.confetti) {
//         window.confetti({
//           particleCount: 3, // Kurangi jumlah partikel
//           angle: data.camera_id === 0 ? 60 : 120,
//           spread: 50, // Kurangi spread
//           origin: { x: data.camera_id === 0 ? 0.3 : 0.7 },
//           colors: isClockIn ? ["#22c55e", "#16a34a"] : ["#3b82f6", "#2563eb"],
//           gravity: 0.8,
//           scalar: 1,
//         });
//       }
//     }, 100); // Mulai confetti lebih cepat

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(confettiTimer);
//     };
//   }, [data, onClose, isClockIn]);

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: "20px",
//         ...positionStyle,
//         width: "340px",
//         bgcolor: "#ffffff",
//         borderRadius: "12px",
//         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//         animation: "fadeIn 0.3s ease-out, fadeOut 0.3s ease-in 1.7s forwards",
//         "@keyframes fadeIn": {
//           from: { opacity: 0, transform: "scale(0.9)" },
//           to: { opacity: 1, transform: "scale(1)" },
//         },
//         "@keyframes fadeOut": {
//           from: { opacity: 1, transform: "scale(1)" },
//           to: { opacity: 0, transform: "scale(0.9)" },
//         },
//         zIndex: 1300,
//       }}
//     >
//       <Box
//         sx={{
//           fontSize: "1.2rem",
//           fontWeight: 600,
//           color: "#1f2937",
//           padding: "1rem",
//           background: isClockIn ? "#22c55e" : "#3b82f6",
//           borderRadius: "12px 12px 0 0",
//           textAlign: "center",
//         }}
//       >
//         {isClockIn ? "Clock IN" : "Clock OUT"} Berhasil
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "1rem",
//           gap: "1rem",
//         }}
//       >
//         <Box sx={{ textAlign: "center" }}>
//           <Typography
//             sx={{ fontSize: "1.2rem", fontWeight: 600, color: "#111827" }}
//           >
//             {data.nama}
//           </Typography>
//           <Typography sx={{ fontSize: "1rem", color: "#4b5563" }}>
//             {formattedTime}
//           </Typography>
//           <Typography sx={{ fontSize: "0.8rem", color: "#6b7280" }}>
//             {formattedDate}
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             width: "200px",
//             height: "240px",
//             borderRadius: "12px",
//             overflow: "hidden",
//             border: `2px solid ${isClockIn ? "#22c55e" : "#3b82f6"}`,
//           }}
//         >
//           <img
//             src={`${import.meta.env.VITE_API_URL}${data.face_image_url}`}
//             alt={`Foto ${data.nama}`}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//             onError={(e) =>
//               (e.currentTarget.src =
//                 "https://via.placeholder.com/200x240?text=No+Image")
//             }
//           />
//         </Box>
//         <Typography
//           sx={{
//             fontSize: "1.2rem",
//             fontWeight: 600,
//             padding: "0.5rem 1.5rem",
//             borderRadius: "20px",
//             background: isClockIn ? "#22c55e" : "#3b82f6",
//             color: "#ffffff",
//           }}
//         >
//           {isClockIn ? "MASUK" : "PULANG"}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };
