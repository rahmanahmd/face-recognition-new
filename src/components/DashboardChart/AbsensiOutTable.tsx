// components/DashboardChart/AbsensiOutTable.tsx
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
import type { Absensi, GroupedAbsensi } from "../../types";

interface AbsensiOutTableProps {
  data: GroupedAbsensi[];
}

const AbsensiOutTable: React.FC<AbsensiOutTableProps> = ({ data }) => {
  // Filter data untuk hanya menampilkan absensi OUT terbaru untuk hari ini
  const today = new Date(); // Dapatkan tanggal hari ini
  const outData = data
    .map((group) => {
      // Ambil absensi OUT untuk karyawan ini pada hari ini
      const latestOutToday = group.history
        .filter(
          (item) =>
            item.type === "OUT" &&
            new Date(item.time).toDateString() === today.toDateString()
        )
        .sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        )[0]; // Ambil yang paling terbaru

      return latestOutToday
        ? {
            employee_id: group.employee_id,
            nama: group.nama,
            face_image_url: group.face_image_url,
            latestTime: latestOutToday.time, // Waktu OUT terbaru
          }
        : null;
    })
    .filter(Boolean) // Hapus karyawan yang tidak punya absensi OUT hari ini
    .sort(
      (a, b) => new Date(b!.latestTime).getTime() - new Date(a!.latestTime).getTime()
    ); // Urutkan hasil akhir berdasarkan waktu OUT terbaru dari semua karyawan

  if (outData.length === 0) {
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
          width: "100%",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Belum ada data absensi Pulang hari ini.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxHeight: 400, flex: 1 }}> {/* flex: 1 agar berbagi ruang */}
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Data Absensi Pulang (OUT) Hari Ini
      </Typography>
      <Table stickyHeader aria-label="absensi out table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Karyawan</TableCell>
            <TableCell>Waktu Pulang</TableCell>
            <TableCell>Foto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outData.map((row) => (
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

export default AbsensiOutTable;