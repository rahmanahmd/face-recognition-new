import { Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Daftar kontingen yang akan ditampilkan
const KONTINGEN_LIST = [
  "Kontingen ADH",
  "Kontingen ASC",
  "Kontingen BC",
  "Kontingen BM",
  "Kontingen PDH",
  "Kontingen SDH",
  "Kontingen SM",
];

/**
 * Komponen untuk menampilkan daftar kontingen dalam bentuk kartu dengan tautan ke detail.
 * @returns JSX.Element
 */
const KontingenList: React.FC = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        mt: 4, // Margin atas yang lebih besar biar gak nempel di atas
        px: { xs: 2, sm: 4 }, // Padding horizontal yang lebih luas biar rapi
      }}
    >
      {KONTINGEN_LIST.map((kontingen) => (
        <Grid item xs={12} sm={6} md={4} key={kontingen}>
          <Paper
            elevation={0}
            sx={{
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", // Bayangan lembut
              borderRadius: "16px", // Sudut halus
              bgcolor: "#ffffff",
              p: 3, // Padding lebih besar biar ada ruang
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transisi halus
              "&:hover": {
                transform: "translateY(-4px)", // Efek angkat saat hover
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)", // Bayangan lebih kuat
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700, // Font tebal
                fontSize: { xs: "1.2rem", sm: "1.4rem" }, // Ukuran font responsif
                color: "#1a202c", // Warna teks gelap
                mb: 2.5, // Jarak bawah lebih besar
                textAlign: "center",
              }}
            >
              {kontingen}
            </Typography>
            <Link
              to={`/kontingen/${encodeURIComponent(kontingen)}`}
              style={{
                color: "#FFD500", // Warna teks kuning
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                padding: "10px 20px", // Padding lebih besar biar nyaman diklik
                borderRadius: "8px",
                transition: "background-color 0.3s ease, color 0.3s ease",
                backgroundColor: "rgba(255, 213, 0, 0.1)", // Latar belakang kuning transparan
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FFD500"; // Background kuning saat hover
                e.currentTarget.style.color = "#000000"; // Teks hitam saat hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 213, 0, 0.1)"; // Kembali ke kuning transparan
                e.currentTarget.style.color = "#FFD500"; // Kembali ke teks kuning
              }}
            >
              Lihat Detail
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KontingenList;
