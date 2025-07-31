import { Card, CardContent, Typography, Box } from "@mui/material";
import type { GroupedAbsensi } from "../../types";

interface AbsensiCardProps {
  item: GroupedAbsensi;
  index: number;
  isCurrentlyIn: boolean;
}

export const AbsensiCard: React.FC<AbsensiCardProps> = ({
  item,
  index,
  isCurrentlyIn,
}) => {
  const imageUrl = item.face_image_url || "/images/fallback-face.png";

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "white",
        boxShadow: 3,
        transition: "all 0.3s",
        "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
        animation: `fadeIn 0.5s ease-out ${index * 50}ms forwards`,
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box sx={{ mb: 2, position: "relative" }}>
        {isCurrentlyIn ? (
          <img
            src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
            alt={`Foto ${item.nama}`}
            style={{
              width: 160,
              height: 192,
              objectFit: "cover",
              borderRadius: 8,
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/512x512")
            }
          />
        ) : (
          <Box
            sx={{
              width: 160,
              height: 192,
              bgcolor: "grey.200",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              className="h-16 w-16 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 12c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid white",
            bgcolor: isCurrentlyIn ? "green" : "red",
          }}
        />
      </Box>
      <CardContent
        sx={{
          width: "100%",
          bgcolor: "grey.100",
          borderRadius: 1,
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold" color="text.primary">
          {item.nama}
        </Typography>
        <Typography
          variant="caption"
          color={isCurrentlyIn ? "green" : "red"}
          fontWeight="bold"
        >
          {isCurrentlyIn ? "Datang" : "Pulang"}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          fontWeight="medium"
          sx={{ mt: 1 }}
        >
          Last IN
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.history.find((h) => h.type === "IN")?.time || "-"}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          width: "100%",
          bgcolor: "grey.100",
          borderRadius: 1,
          p: 2,
          textAlign: "center",
          mt: 1,
        }}
      >
        <Typography variant="body2" color="text.primary" fontWeight="medium">
          Last OUT
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.history.find((h) => h.type === "OUT")?.time || "-"}
        </Typography>
      </CardContent>
    </Card>
  );
};
