import { Box, Typography, CircularProgress } from "@mui/material";

interface HeaderSectionProps {
  isLoading: boolean;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ isLoading }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 4,
    }}
  >
    <Typography variant="h4" fontWeight="bold">
      ABSEN DSL{" "}
    </Typography>
    {isLoading && (
      <Box sx={{ display: "flex", alignItems: "center", color: "grey.500" }}>
        <CircularProgress size={16} sx={{ mr: 1 }} />
        Refreshing...
      </Box>
    )}
  </Box>
);
