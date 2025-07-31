// components/DashboardChart/AbsensiInTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import type { Absensi, GroupedAbsensi } from "../../types"; // Import Absensi juga jika diperlukan, tapi GroupedAbsensi sudah cukup

interface AbsensiInTableProps {
  data: GroupedAbsensi[];
}

const AbsensiInTable: React.FC<AbsensiInTableProps> = ({ data }) => {
  // Filter data untuk hanya menampilkan absensi IN terbaru untuk hari ini
  const today = new Date(); // Dapatkan tanggal hari ini
  const inData = data
    .map((group) => {
      // Ambil absensi IN untuk karyawan ini pada hari ini
      const latestInToday = group.history
        .filter(
          (item) =>
            item.type === "IN" &&
            new Date(item.time).toDateString() === today.toDateString()
        )
        .sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        )[0]; // Ambil yang paling terbaru

      return latestInToday
        ? {
            employee_id: group.employee_id,
            nama: group.nama,
            face_image_url: group.face_image_url,
            latestTime: latestInToday.time, // Waktu IN terbaru
          }
        : null;
    })
    .filter(Boolean) // Hapus karyawan yang tidak punya absensi IN hari ini
    .sort(
      (a, b) => new Date(b!.latestTime).getTime() - new Date(a!.latestTime).getTime()
    ); // Urutkan hasil akhir berdasarkan waktu IN terbaru dari semua karyawan

  if (inData.length === 0) {
    return (
      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",
          width: "100%", // Agar mengambil lebar penuh
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Belum ada data absensi Masuk hari ini.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxHeight: 400, flex: 1 }}> {/* flex: 1 agar berbagi ruang */}
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Data Absensi Masuk (IN) Hari Ini
      </Typography>
      <Table stickyHeader aria-label="absensi in table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Karyawan</TableCell>
            <TableCell>Waktu Masuk</TableCell>
            <TableCell>Foto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inData.map((row) => (
            <TableRow key={row!.employee_id}>
              <TableCell>{row!.nama}</TableCell>
              <TableCell>
                {new Date(row!.latestTime).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                {row!.face_image_url && (
                  <img
                    src={row!.face_image_url}
                    alt={row!.nama}
                    style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AbsensiInTable;