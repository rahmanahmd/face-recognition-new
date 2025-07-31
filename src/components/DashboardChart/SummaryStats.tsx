import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Camera,
} from "lucide-react";

interface SummaryStatsProps {
  totalKaryawan: number;
  absensiHariIni: number;
  persentaseMasuk: number;
  persentasePulang: number;
  cameraStatus?: { activeCameras: number };
  isCameraLoading: boolean;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
  totalKaryawan,
  absensiHariIni,
  persentaseMasuk,
  persentasePulang,
  cameraStatus,
  isCameraLoading,
}) => {
  const statsData = [
    {
      title: "Total Karyawan",
      value: totalKaryawan,
      icon: Users,
      color: "#3b82f6",
      bgGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      shadowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      title: "Absensi Hari Ini",
      value: absensiHariIni,
      icon: Calendar,
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      shadowColor: "rgba(16, 185, 129, 0.4)",
    },
    {
      title: "Masuk",
      value: `${persentaseMasuk.toFixed(0)}%`,
      icon: TrendingUp,
      color: "#f59e0b",
      bgGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      shadowColor: "rgba(245, 158, 11, 0.4)",
    },
    {
      title: "Pulang",
      value: `${persentasePulang.toFixed(0)}%`,
      icon: TrendingDown,
      color: "#ef4444",
      bgGradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      shadowColor: "rgba(239, 68, 68, 0.4)",
    },
    {
      title: "Kamera Aktif",
      value: isCameraLoading ? "..." : cameraStatus?.activeCameras || 0,
      icon: Camera,
      color: "#8b5cf6",
      bgGradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      shadowColor: "rgba(139, 92, 246, 0.4)",
    },
  ];

  const styles = {
    summaryContainer: {
      mt: 0,
      mb: 2,
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    summaryBox: {
      p: { xs: 2, sm: 2.5, md: 3 },
      bgcolor: "transparent",
      border: "none",
      boxShadow: "none",
      position: "relative",
      overflow: "hidden",
      width: "100%",
      maxWidth: "1400px",
    },
    headerSection: {
      mb: 2,
      textAlign: "center",
    },
    headerTitle: {
      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
      fontWeight: 700,
      color: "#1f2937",
      mb: 1,
      background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    headerSubtitle: {
      fontSize: { xs: "0.875rem", sm: "1rem" },
      color: "#6b7280",
      fontWeight: 500,
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(5, 1fr)",
      },
      gap: { xs: 2, sm: 2.5, md: 3 },
      justifyContent: "center",
      width: "100%",
    },
    statCard: {
      position: "relative",
      p: { xs: 2, sm: 2.5, md: 3 },
      borderRadius: "24px",
      background: "#ffffff",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow:
        "0 8px 16px -2px rgba(0, 0, 0, 0.1), 0 4px 8px -1px rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      overflow: "hidden",
      minHeight: { xs: "160px", sm: "180px", md: "200px" },
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      "&:hover": {
        transform: "translateY(-12px) scale(1.04)",
        boxShadow: "0 35px 70px -15px rgba(0, 0, 0, 0.3)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        transition: "opacity 0.3s ease",
        borderRadius: "24px",
      },
      "&:hover::before": {
        opacity: 0.15,
      },
    },
    iconContainer: {
      width: { xs: 64, sm: 72, md: 80 },
      height: { xs: 64, sm: 72, md: 80 },
      borderRadius: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mb: { xs: 1.5, sm: 2, md: 2.5 },
      mx: "auto",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "24px",
        padding: "2px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "xor",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
      },
    },
    statTitle: {
      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
      fontWeight: 600,
      color: "#6b7280",
      textAlign: "center",
      mb: { xs: 1, sm: 1.2 },
      letterSpacing: "0.03em",
      textTransform: "uppercase",
      whiteSpace: "normal",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    },
    statValue: {
      fontSize: { xs: "2rem", sm: "2.25rem", md: "2.75rem" },
      fontWeight: 800,
      textAlign: "center",
      background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      lineHeight: 1.2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    },
    loadingDots: {
      display: "inline-flex",
      gap: "3px",
      "& span": {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "#6b7280",
        animation: "pulse 1.5s ease-in-out infinite",
        "&:nth-of-type(2)": { animationDelay: "0.2s" },
        "&:nth-of-type(3)": { animationDelay: "0.4s" },
      },
      "@keyframes pulse": {
        "0%, 80%, 100%": { opacity: 0.3 },
        "40%": { opacity: 1 },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={styles.summaryContainer}
    >
      <Box sx={styles.summaryBox}>
        <Box sx={styles.headerSection}></Box>
        <Box sx={styles.gridContainer}>
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    ...styles.statCard,
                    "&::before": {
                      background: stat.bgGradient,
                    },
                    "&:hover": {
                      ...styles.statCard["&:hover"],
                      boxShadow: `0 35px 70px ${stat.shadowColor}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      ...styles.iconContainer,
                      background: stat.bgGradient,
                      boxShadow: `0 12px 48px ${stat.shadowColor}`,
                    }}
                  >
                    <IconComponent
                      size={36}
                      color="white"
                      style={{
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                      }}
                    />
                  </Box>
                  <Typography sx={styles.statTitle}>{stat.title}</Typography>
                  <Typography sx={styles.statValue}>
                    {stat.title === "Kamera Aktif" ? (
                      isCameraLoading ? (
                        <Box sx={styles.loadingDots}>
                          <span />
                          <span />
                          <span />
                        </Box>
                      ) : (
                        stat.value
                      )
                    ) : (
                      stat.value
                    )}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Box>
    </motion.div>
  );
};

export default SummaryStats;
