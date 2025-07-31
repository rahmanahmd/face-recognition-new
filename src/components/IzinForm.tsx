import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { useEmployees, useSubmitIzin } from "../hooks/useAbsensi";
import type { EmployeeForDropdown } from "../types";

interface IzinFormProps {
  kontingen?: string;
  onCancel?: () => void;
}

const IzinForm: React.FC<IzinFormProps> = ({ kontingen, onCancel }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [tanggal, setTanggal] = useState<Date | null>(new Date());
  const [alasanIzin, setAlasanIzin] = useState("");
  const {
    data: employees,
    isLoading: employeesLoading,
    isError,
    error,
  } = useEmployees();
  const submitIzin = useSubmitIzin();

  // Debugging: Log data
  console.log("Kontingen prop:", kontingen);
  console.log("Employees data:", employees);
  console.log("Unique kontingen in employees:", [
    ...new Set(employees?.map((emp) => emp.kontingen)),
  ]);

  // Normalisasi kontingen untuk menangani variasi format
  const normalizeKontingen = (str: string | undefined) =>
    str
      ? str
          .trim()
          .toLowerCase()
          .replace(/^kontingen\s+/i, "") // Hapus "Kontingen " atau "kontingen "
          .replace(/\s+/g, "") // Hapus semua spasi
      : "";

  // Filter karyawan berdasarkan kontingen
  const filteredEmployees: EmployeeForDropdown[] =
    kontingen && employees
      ? employees.filter((emp) => {
          if (!emp.kontingen) return false;
          const normalizedEmpKontingen = normalizeKontingen(emp.kontingen);
          const normalizedPropKontingen = normalizeKontingen(kontingen);
          console.log(
            `Comparing: emp.kontingen="${normalizedEmpKontingen}" vs prop.kontingen="${normalizedPropKontingen}"`
          );
          return normalizedEmpKontingen === normalizedPropKontingen;
        })
      : employees || [];

  // Debugging: Log hasil filter
  console.log("Normalized kontingen prop:", normalizeKontingen(kontingen));
  console.log("Filtered employees:", filteredEmployees);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !tanggal) {
      alert("Harap pilih karyawan dan tanggal.");
      return;
    }
    const submitData = {
      employee_id: parseInt(employeeId),
      tanggal: format(tanggal, "yyyy-MM-dd"),
      alasan_izin: alasanIzin.trim() || null,
    };
    console.log("Submitting izin data:", submitData);
    submitIzin.mutate(submitData, {
      onSuccess: () => {
        alert("Izin berhasil diajukan.");
        setEmployeeId("");
        setTanggal(new Date());
        setAlasanIzin("");
        onCancel?.();
      },
      onError: (error: any) => {
        alert(
          `Gagal mengajukan izin: ${
            error.message || "Kesalahan tidak diketahui"
          }`
        );
      },
    });
  };

  const styles = {
    paper: {
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
      borderRadius: "20px",
      bgcolor: "#ffffff",
      p: 2,
      border: "1px solid #e0e0e0",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
      mb: 2,
    },
    submitButton: {
      mt: 2,
      bgcolor: "#45B7D1",
      color: "#ffffff",
      "&:hover": { bgcolor: "#3A9BB3" },
    },
    cancelButton: {
      mt: 2,
      ml: 2,
      bgcolor: "#FF6B6B",
      color: "#ffffff",
      "&:hover": { bgcolor: "#E55A5A" },
    },
    error: {
      color: "#FF6B6B",
      fontSize: "1rem",
      mt: 2,
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      mt: 2,
    },
  };

  if (isError) {
    return (
      <Paper elevation={0} sx={styles.paper}>
        <Typography sx={styles.error}>
          Gagal memuat data karyawan:{" "}
          {error?.message || "Kesalahan tidak diketahui"}
        </Typography>
      </Paper>
    );
  }

  if (employeesLoading) {
    return (
      <Paper elevation={0} sx={styles.paper}>
        <Box sx={styles.loading}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={styles.paper}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ajukan Izin
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Karyawan</InputLabel>
          <Select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            label="Karyawan"
            disabled={employeesLoading || submitIzin.isPending}
            required
          >
            <MenuItem value="">
              <em>Pilih Karyawan</em>
            </MenuItem>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <MenuItem key={emp.employee_id} value={emp.employee_id}>
                  {emp.nama}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Tidak ada karyawan untuk kontingen {kontingen || "ini"}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <DatePicker
          label="Tanggal"
          value={tanggal}
          onChange={(date) => setTanggal(date)}
          slotProps={{ textField: { sx: { minWidth: 150 }, required: true } }}
        />
        <TextField
          label="Alasan Izin (Opsional)"
          value={alasanIzin}
          onChange={(e) => setAlasanIzin(e.target.value)}
          multiline
          rows={2}
          sx={{ minWidth: 300 }}
        />
        <Button
          type="submit"
          sx={styles.submitButton}
          disabled={submitIzin.isPending || employeesLoading}
        >
          {submitIzin.isPending ? "Mengirim..." : "Ajukan Izin"}
        </Button>
        {onCancel && (
          <Button sx={styles.cancelButton} onClick={onCancel}>
            Batal
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default IzinForm;
