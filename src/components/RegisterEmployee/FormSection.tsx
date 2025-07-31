import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { Employee } from "../../types";
import type { SelectChangeEvent } from "@mui/material/Select";

interface FormSectionProps {
  formData: Employee;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  isLoading: boolean;
  error: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  isLoading,
  error,
}) => {
  const styles = {
    formControl: { mb: 0.5 },
    input: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        bgcolor: "#f9fafb",
        "& fieldset": { borderColor: "#d1d5db" },
        "&:hover fieldset": { borderColor: "#9ca3af" },
        "&.Mui-focused fieldset": {
          borderColor: "#ffd500",
          boxShadow: "0 0 0 3px rgba(255, 213, 0, 0.2)",
        },
        "& .MuiInputBase-input": { padding: "16px 18px", fontSize: "1.2rem" },
      },
      "& .MuiInputLabel-root": {
        color: "#6b7280",
        fontWeight: 500,
        fontSize: "1.1rem",
        "&.Mui-focused": { color: "#ffd500" },
      },
    },
    select: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        bgcolor: "#f9fafb",
        "& fieldset": { borderColor: "#d1d5db" },
        "&:hover fieldset": { borderColor: "#9ca3af" },
        "&.Mui-focused fieldset": {
          borderColor: "#ffd500",
          boxShadow: "0 0 0 3px rgba(255, 213, 0, 0.2)",
        },
        "& .MuiSelect-select": { padding: "16px 18px", fontSize: "1.2rem" },
      },
      "& .MuiInputLabel-root": {
        color: "#6b7280",
        fontWeight: 500,
        fontSize: "1.1rem",
        "&.Mui-focused": { color: "#ffd500" },
      },
    },
  };

  return (
    <>
      <FormControl fullWidth sx={styles.formControl}>
        <TextField
          label="Employee ID (Optional)"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleInputChange}
          disabled={isLoading}
          fullWidth
          placeholder="Enter ID or leave blank"
          InputProps={{ sx: styles.input }}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          error={error.includes("Employee ID")}
          helperText={error.includes("Employee ID") ? error : "Max 10 digits"}
        />
      </FormControl>

      <FormControl fullWidth sx={styles.formControl}>
        <TextField
          label="Full Name"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          disabled={isLoading}
          fullWidth
          required
          placeholder="Enter Full Name"
          InputProps={{ sx: styles.input }}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          error={error.includes("Full Name")}
          helperText={error.includes("Full Name") ? error : ""}
        />
      </FormControl>

      <FormControl fullWidth sx={styles.formControl} required>
        <InputLabel id="kontingen-label" shrink sx={{ fontWeight: 500 }}>
          Contingent
        </InputLabel>
        <Select
          labelId="kontingen-label"
          name="kontingen"
          value={formData.kontingen}
          onChange={handleSelectChange}
          disabled={isLoading}
          fullWidth
          displayEmpty
          renderValue={
            formData.kontingen ? undefined : () => "Select Contingent"
          }
          label="Contingent"
          sx={styles.select}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "12px",
                mt: 1,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Contingent
          </MenuItem>
          {[
            "Kontingen ADH",
            "Kontingen ASC",
            "Kontingen BC",
            "Kontingen BM",
            "Kontingen PDH",
            "Kontingen SDH",
            "Kontingen SM",
          ].map((kontingen) => (
            <MenuItem key={kontingen} value={kontingen}>
              {kontingen}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
