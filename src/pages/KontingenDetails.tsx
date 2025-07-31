// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { motion } from "framer-motion";
// import { useAttendanceStatuses } from "../hooks/useAbsensi";
// import { format } from "date-fns";
// import { useState } from "react";
// import IzinForm from "../components/IzinForm";

// interface KontingenDetailsProps {
//   isSidebarOpen: boolean;
// }

// export const KontingenDetails: React.FC<KontingenDetailsProps> = ({
//   isSidebarOpen,
// }) => {
//   const { kontingen } = useParams<{ kontingen: string }>();
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showIzinForm, setShowIzinForm] = useState(false);

//   const {
//     data: kontingenStatus,
//     isLoading: statusLoading,
//     isError: statusError,
//     error: statusErrorObj,
//   } = useAttendanceStatuses(
//     selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
//     kontingen
//   );

//   const styles = {
//     container: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "flex-start",
//       minHeight: "100vh",
//       py: { xs: 2, sm: 4, md: 6 },
//       px: 0,
//       bgcolor: "#ffffff",
//       ml: { xs: 0, md: isSidebarOpen ? "240px" : "72px" },
//       width: {
//         xs: "100%",
//         md: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
//       },
//       transition: "margin-left 0.3s ease, width 0.3s ease",
//     },
//     mainBox: {
//       display: "flex",
//       flexDirection: "column",
//       gap: 4,
//       width: "100%",
//       maxWidth: "1290px",
//       mx: "auto",
//     },
//     backButton: {
//       alignSelf: "flex-start",
//       mb: 1,
//     },
//     tableCard: {
//       boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
//       borderRadius: "20px",
//       bgcolor: "#ffffff",
//       p: 2,
//       mt: 2,
//       border: "1px solid #e0e0e0",
//     },
//     title: {
//       fontWeight: 700,
//       fontSize: { xs: "1.5rem", sm: "2rem" },
//       color: "#1f2937",
//       mb: 2,
//     },
//     error: {
//       color: "#FF6B6B",
//       fontSize: "1rem",
//       mt: 2,
//     },
//     tableHeader: {
//       fontWeight: 600,
//       color: "#1f2937",
//     },
//     tableCell: {
//       color: "#4b5563",
//     },
//     searchField: {
//       mb: 2,
//       maxWidth: 300,
//     },
//     filterContainer: {
//       display: "flex",
//       gap: 2,
//       mb: 2,
//       flexWrap: "wrap",
//     },
//     izinButton: {
//       bgcolor: "#45B7D1",
//       color: "#ffffff",
//       "&:hover": { bgcolor: "#3A9BB3" },
//       minWidth: 150,
//     },
//   };

//   // Filter data berdasarkan pencarian
//   const filteredStatus = kontingenStatus?.filter(
//     (item) =>
//       item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.employee_id.includes(searchQuery)
//   );

//   if (statusLoading)
//     return (
//       <Container maxWidth={false} sx={styles.container}>
//         <Typography>Memuat...</Typography>
//       </Container>
//     );

//   if (statusError)
//     return (
//       <Container maxWidth={false} sx={styles.container}>
//         <Typography sx={styles.error}>
//           Error: {statusErrorObj?.message || "Gagal memuat data"}
//         </Typography>
//       </Container>
//     );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Container maxWidth={false} sx={styles.container}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         >
//           <Box sx={styles.mainBox}>
//             <Button
//               variant="outlined"
//               onClick={() => navigate("/chart")}
//               sx={styles.backButton}
//             >
//               ← Kembali ke Chart
//             </Button>

//             <Typography variant="h4" sx={styles.title}>
//               Status Kontingen {kontingen}
//             </Typography>

//             <Box sx={styles.filterContainer}>
//               <DatePicker
//                 label="Pilih Tanggal"
//                 value={selectedDate}
//                 onChange={(date: Date | null) => setSelectedDate(date)}
//                 slotProps={{ textField: { sx: { minWidth: 150 } } }}
//               />
//               <TextField
//                 label="Cari Nama atau ID Karyawan"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 sx={styles.searchField}
//               />
//               <Button
//                 onClick={() => setShowIzinForm(!showIzinForm)}
//                 sx={styles.izinButton}
//               >
//                 {showIzinForm ? "Sembunyikan Form Izin" : "Tambah Izin"}
//               </Button>
//             </Box>

//             {showIzinForm && kontingen && (
//               <IzinForm
//                 kontingen={kontingen}
//                 onCancel={() => setShowIzinForm(false)}
//               />
//             )}

//             <Paper elevation={0} sx={styles.tableCard}>
//               <Typography variant="h6" sx={{ mb: 2, ml: 2, fontWeight: 600 }}>
//                 Daftar Anggota dan Status Kehadiran - {kontingen}
//               </Typography>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={styles.tableHeader}>ID Karyawan</TableCell>
//                       <TableCell sx={styles.tableHeader}>Nama</TableCell>
//                       <TableCell sx={styles.tableHeader}>Kontingen</TableCell>
//                       <TableCell sx={styles.tableHeader}>Status</TableCell>
//                       <TableCell sx={styles.tableHeader}>Check-In</TableCell>
//                       <TableCell sx={styles.tableHeader}>Check-Out</TableCell>
//                       <TableCell sx={styles.tableHeader}>Alasan Izin</TableCell>
//                       <TableCell sx={styles.tableHeader}>
//                         Tanggal Absensi Terakhir
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredStatus && filteredStatus.length > 0 ? (
//                       filteredStatus.map((item) => (
//                         <TableRow key={item.employee_id}>
//                           <TableCell sx={styles.tableCell}>
//                             {item.employee_id}
//                           </TableCell>
//                           <TableCell sx={styles.tableCell}>
//                             {item.nama}
//                           </TableCell>
//                           <TableCell sx={styles.tableCell}>
//                             {item.kontingen}
//                           </TableCell>
//                           <TableCell sx={styles.tableCell}>
//                             {item.status}
//                           </TableCell>
//                           <TableCell sx={styles.tableCell}>
//                             {item.check_in_time || "-"}
//                           </TableCell>
//                           <TableCell sx={styles.tableCell}>
//                             {item.check_out_time || "-"}
//                           </TableCell>
//                           <TableCell sx={styles.tableCell}>
//                             {item.alasan_izin || "-"}
//                           </TableCell>
//                           <TableCell sx={styles.tableCell}>
//                             {item.last_attendance_date || "-"}
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan={8} sx={styles.tableCell}>
//                           Tidak ada data ditemukan untuk kontingen ini.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Box>
//         </motion.div>
//       </Container>
//     </LocalizationProvider>
//   );
// };

import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion } from "framer-motion";
import { useAttendanceStatuses } from "../hooks/useAbsensi";
import { format } from "date-fns";
import { useState } from "react";
import DownloadButton from "../components/DashboardChart/DownloadButton";

interface KontingenDetailsProps {
  isSidebarOpen: boolean;
}

/**
 * Komponen untuk menampilkan detail kontingen, termasuk status kehadiran anggota, dengan tombol unduh data.
 * Aturan CSS eksternal untuk .css-vemb2j-MuiContainer-root di-override di App.tsx.
 * @param isSidebarOpen - Status apakah sidebar terbuka atau tidak.
 * @returns JSX.Element
 */
export const KontingenDetails: React.FC<KontingenDetailsProps> = ({
  isSidebarOpen,
}) => {
  const { kontingen } = useParams<{ kontingen: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const currentDate = new Date();
  const dateStr = format(currentDate, "yyyy-MM-dd");

  const {
    data: kontingenStatus,
    isLoading: statusLoading,
    isError: statusError,
    error: statusErrorObj,
  } = useAttendanceStatuses(dateStr, kontingen);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 3 },
      bgcolor: "#f8fafc",
      ml: { xs: 0, md: isSidebarOpen ? "240px" : "72px" },
      width: {
        xs: "100%",
        md: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
      },
      transition: "margin-left 0.3s ease, width 0.3s ease",
    },
    mainBox: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      width: "100%",
      maxWidth: "1400px",
      mx: "auto",
    },
    headerActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
    },
    backButton: {
      bgcolor: "#FFD500",
      color: "#1f2937",
      "&:hover": {
        bgcolor: "#E6C200",
        boxShadow: "0 4px 12px rgba(255, 213, 0, 0.3)",
      },
      borderRadius: "8px",
      px: 4,
      py: 1,
      fontWeight: 600,
    },
    downloadButton: {
      bgcolor: "#FFD500",
      color: "#1f2937",
      "&:hover": {
        bgcolor: "#E6C200",
        boxShadow: "0 4px 12px rgba(255, 213, 0, 0.3)",
      },
      borderRadius: "8px",
      px: 4,
      py: 1,
      fontWeight: 600,
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    tableCard: {
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      borderRadius: "16px",
      bgcolor: "#ffffff",
      p: { xs: 2, sm: 3 },
      mt: 3,
      border: "1px solid #e5e7eb",
      overflow: "hidden",
    },
    title: {
      fontWeight: 700,
      fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
      color: "#1a202c",
      mb: 3,
    },
    error: {
      color: "#ef4444",
      fontSize: "1.1rem",
      fontWeight: 500,
      mt: 3,
      textAlign: "center",
    },
    tableHeader: {
      fontWeight: 600,
      color: "#1f2937",
      bgcolor: "#f1f5f9",
      py: 2,
    },
    tableCell: {
      color: "#374151",
      py: 1.5,
      transition: "background-color 0.2s ease",
      "&:hover": {
        bgcolor: "#f9fafb",
      },
    },
    searchField: {
      maxWidth: 300,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        bgcolor: "#ffffff",
      },
    },
    filterContainer: {
      display: "flex",
      gap: 2,
      mb: 3,
      flexWrap: "wrap",
      alignItems: "center",
    },
  };

  // Filter data berdasarkan pencarian
  const filteredStatus = kontingenStatus?.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employee_id.includes(searchQuery)
  );

  if (statusLoading)
    return (
      <Container
        maxWidth={false}
        sx={styles.container}
        className="kontingen-details-container"
      >
        <Typography sx={{ color: "#374151", fontSize: "1.2rem" }}>
          Memuat data...
        </Typography>
      </Container>
    );

  if (statusError)
    return (
      <Container
        maxWidth={false}
        sx={styles.container}
        className="kontingen-details-container"
      >
        <Typography sx={styles.error}>
          Kesalahan: {statusErrorObj?.message || "Gagal memuat data"}
        </Typography>
      </Container>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        maxWidth={false}
        sx={styles.container}
        className="kontingen-details-container"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box sx={styles.mainBox}>
            <Box sx={styles.headerActions}>
              <Button
                variant="contained"
                onClick={() => navigate("/chart")}
                sx={styles.backButton}
              >
                ← Kembali ke Chart
              </Button>
              <DownloadButton sx={styles.downloadButton} />
            </Box>

            <Typography variant="h4" sx={styles.title}>
              Status Kontingen {kontingen}
            </Typography>

            <Box sx={styles.filterContainer}>
              <TextField
                label="Cari Nama atau ID Karyawan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={styles.searchField}
              />
            </Box>

            <Paper elevation={0} sx={styles.tableCard}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  ml: 3,
                  fontWeight: 600,
                  color: "#1f2937",
                }}
              >
                Daftar Anggota dan Status Kehadiran - {kontingen}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={styles.tableHeader}>ID Karyawan</TableCell>
                      <TableCell sx={styles.tableHeader}>Nama</TableCell>
                      <TableCell sx={styles.tableHeader}>Kontingen</TableCell>
                      <TableCell sx={styles.tableHeader}>Status</TableCell>
                      <TableCell sx={styles.tableHeader}>Check-In</TableCell>
                      <TableCell sx={styles.tableHeader}>Check-Out</TableCell>
                      <TableCell sx={styles.tableHeader}>Alasan Izin</TableCell>
                      <TableCell sx={styles.tableHeader}>
                        Tanggal Absensi Terakhir
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStatus && filteredStatus.length > 0 ? (
                      filteredStatus.map((item) => (
                        <TableRow
                          key={item.employee_id}
                          sx={{
                            "&:hover": {
                              bgcolor: "#f9fafb",
                            },
                            transition: "background-color 0.2s ease",
                          }}
                        >
                          <TableCell sx={styles.tableCell}>
                            {item.employee_id}
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {item.nama}
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {item.kontingen}
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {item.status}
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {item.check_in_time || "-"}
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {item.check_out_time || "-"}
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {item.alasan_izin || "-"}
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {item.last_attendance_date || "-"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} sx={styles.tableCell}>
                          Tidak ada data ditemukan untuk kontingen ini.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
};
