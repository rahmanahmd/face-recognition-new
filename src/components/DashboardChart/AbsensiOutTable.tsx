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
import type { GroupedAbsensi } from "../../types";

interface AbsensiOutTableProps {
  data: GroupedAbsensi[];
}

const AbsensiOutTable: React.FC<AbsensiOutTableProps> = ({ data }) => {
  // --- Modifikasi Logika Data ---
  // Kita akan memetakan semua karyawan, bukan hanya yang punya absensi OUT hari ini
  const today = new Date();
  const processedData = data
    .map((group) => {
      const latestOutToday = group.history
        .filter(
          (item) =>
            item.type === "OUT" &&
            new Date(item.time).toDateString() === today.toDateString()
        )
        .sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        )[0];

      return {
        employee_id: group.employee_id,
        nama: group.nama,
        face_image_url: group.face_image_url,
        latestTime: latestOutToday ? latestOutToday.time : null, // Tetap sertakan, bisa null
      };
    })
    .sort((a, b) => {
      // Urutkan berdasarkan waktu terbaru (yang paling baru di atas).
      // Entri null akan berada di bawah (jika belum absen).
      if (a.latestTime && b.latestTime) {
        return new Date(b.latestTime).getTime() - new Date(a.latestTime).getTime();
      }
      if (a.latestTime) return -1; // a punya waktu, b tidak, a di atas
      if (b.latestTime) return 1;  // b punya waktu, a tidak, b di atas
      return 0; // Keduanya tidak punya waktu, urutan tetap
    });

  // Hapus kondisi if (outData.length === 0)
  // Tabel akan selalu dirender, meskipun isinya ada yang belum absen.

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxHeight: 400, flex: 1 }}>
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
          {processedData.map((row) => (
            <TableRow key={row.employee_id}>
              <TableCell>{row.nama}</TableCell>
              <TableCell>
                {row.latestTime
                  ? new Date(row.latestTime).toLocaleTimeString()
                  : "-"} {/* Tampilkan '-' jika belum absen */}
              </TableCell>
              <TableCell>
                {row.face_image_url && (
                  <img
                    src={row.face_image_url}
                    alt={row.nama}
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