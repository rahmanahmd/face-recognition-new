import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  type ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useAttendanceChartData } from "../../hooks/useAbsensi";
import chartInConfig from "../../config/chart_in_config.json";
import chartOutConfig from "../../config/chart_out_config.json";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface PieChartContainerProps {
  selectedDate: Date | null;
}

const PieChartContainer: React.FC<PieChartContainerProps> = ({
  selectedDate,
}) => {
  const { data, isLoading, isError, error } = useAttendanceChartData(
    selectedDate?.toISOString().split("T")[0]
  );

  const chartStyles = {
    chartCard: {
      boxShadow: "none",
      border: "none",
      bgcolor: "transparent",
      p: { xs: 1, sm: 2 },
      width: { xs: "100%", sm: "100%", md: "600px" },
      maxWidth: "650px",
      minWidth: { xs: "280px", sm: "300px" },
      flexBasis: { xs: "100%", md: "calc(50% - 12px)" },
      mt: 0,
      transition: "all 0.3s ease",
    },
    chartTitle: {
      fontWeight: 600,
      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
      color: "#1f2937",
      mb: { xs: 1, sm: 1.5 },
      textAlign: "center",
    },
    chartContainer: {
      height: { xs: "250px", sm: "350px", md: "400px" },
      width: "100%",
      position: "relative",
      p: 0,
    },
    error: {
      color: "#FF6B6B",
      fontSize: "0.875rem",
      textAlign: "center",
    },
    flexContainer: {
      display: "flex",
      flexWrap: { xs: "wrap", md: "nowrap" },
      justifyContent: { xs: "center", md: "space-between" },
      alignItems: "center", // Center vertikal
      gap: { xs: 1, md: 3 },
      width: "100%",
      maxWidth: "1300px",
      mx: "auto",
      mt: -1,
      mb: 2,
    },
  };

  const getChartData = (
    chartData: any[] | undefined,
    config: any,
    label: string
  ) => {
    const labels = chartData?.map((item) => item.kontingen) || [];
    const values =
      chartData?.map((item) => item.jumlah_in || item.jumlah_out || 0) || [];

    return {
      ...config.data,
      labels,
      datasets: [
        {
          ...config.data.datasets[0],
          label,
          data: values,
        },
      ],
    };
  };

  const commonOptions = (
    chartKey: "chart_in" | "chart_out",
    legendLabel: string
  ): ChartOptions<"pie"> => ({
    ...chartInConfig.options,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      ...chartInConfig.options.plugins,
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          padding: 12,
        },
      },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          const index = ctx.dataIndex;
          const total = data?.[chartKey]?.[index]?.total_anggota || 0;
          return `${value}/${total}`;
        },
        color: "#000",
        font: {
          weight: "bold" as const,
          size: 12,
        },
        display: (ctx: any) => ctx.dataset.data[ctx.dataIndex] > 0,
      },
      title: {
        display: false,
        text: legendLabel,
      },
    },
  });

  const chartInConfigFinal = {
    data: getChartData(data?.chart_in, chartInConfig, "Absensi Masuk"),
    options: commonOptions("chart_in", "Absensi Masuk"),
  };

  const chartOutConfigFinal = {
    data: getChartData(data?.chart_out, chartOutConfig, "Absensi Pulang"),
    options: commonOptions("chart_out", "Absensi Pulang"),
  };

  if (isLoading) {
    return (
      <Box sx={chartStyles.chartCard}>
        <Typography sx={chartStyles.error}>Memuat data...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={chartStyles.chartCard}>
        <Typography sx={chartStyles.error}>Error: {error?.message}</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Box sx={chartStyles.flexContainer}>
        <Box sx={chartStyles.chartCard}>
          <Typography sx={chartStyles.chartTitle}>
            Absensi Masuk per Kontingen
          </Typography>
          <Box sx={chartStyles.chartContainer}>
            <Pie
              data={chartInConfigFinal.data}
              options={chartInConfigFinal.options}
            />
          </Box>
        </Box>

        <Box sx={chartStyles.chartCard}>
          <Typography sx={chartStyles.chartTitle}>
            Absensi Pulang per Kontingen
          </Typography>
          <Box sx={chartStyles.chartContainer}>
            <Pie
              data={chartOutConfigFinal.data}
              options={chartOutConfigFinal.options}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PieChartContainer;
