import { Card, Box } from "@mui/material";

export const SkeletonCard: React.FC = () => (
  <Card
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      bgcolor: "white",
      boxShadow: 3,
    }}
  >
    <Box
      sx={{
        width: 160,
        height: 192,
        bgcolor: "grey.300",
        borderRadius: 1,
        mb: 2,
      }}
    />
    <Box
      sx={{
        width: "100%",
        bgcolor: "grey.100",
        p: 2,
        textAlign: "center",
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          height: 16,
          bgcolor: "grey.300",
          borderRadius: 1,
          width: "75%",
          mx: "auto",
          mb: 1,
        }}
      />
      <Box
        sx={{
          height: 12,
          bgcolor: "grey.300",
          borderRadius: 1,
          width: "50%",
          mx: "auto",
        }}
      />
    </Box>
  </Card>
);
