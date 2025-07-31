import { Box, Card, Typography, Alert } from "@mui/material";
import { SkeletonCard } from "./SkeletonCard";
import { AbsensiCard } from "./AbsensiCard";
import type { GroupedAbsensi } from "../../types";

interface AbsensiGridProps {
  isLoading: boolean;
  error: Error | null;
  absensi: GroupedAbsensi[];
  statusCache: Map<string, boolean>;
}

export const AbsensiGrid: React.FC<AbsensiGridProps> = ({
  isLoading,
  error,
  absensi,
  statusCache,
}) => {
  const gridStyles = {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
      xl: "repeat(5, 1fr)",
    },
    gap: 4,
    justifyContent: "center",
    mx: "auto",
  };

  if (isLoading) {
    return (
      <Box sx={gridStyles}>
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (absensi.length === 0) {
    return (
      <Card sx={{ p: 4, textAlign: "center", bgcolor: "white", boxShadow: 1 }}>
        <Typography variant="h6" color="text.secondary">
          Belum ada data absensi.
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={gridStyles}>
      {absensi.map((item, index) => (
        <AbsensiCard
          key={item.employee_id}
          item={item}
          index={index}
          isCurrentlyIn={statusCache.get(String(item.employee_id)) || false}
        />
      ))}
    </Box>
  );
};
