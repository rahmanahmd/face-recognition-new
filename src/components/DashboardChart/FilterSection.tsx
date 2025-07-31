import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

interface FilterSectionProps {
  chartType: "kontingen" | "attendance";
  setChartType: (type: "kontingen" | "attendance") => void;
  attendancePeriod: "today" | "yesterday" | "week";
  setAttendancePeriod: (period: "today" | "yesterday" | "week") => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  chartType,
  setChartType,
  attendancePeriod,
  setAttendancePeriod,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Chart Type</InputLabel>
        <Select
          value={chartType}
          onChange={(e) =>
            setChartType(e.target.value as "kontingen" | "attendance")
          }
          label="Chart Type"
        >
          <MenuItem value="kontingen">Kontingen Distribution</MenuItem>
          <MenuItem value="attendance">Attendance Distribution</MenuItem>
        </Select>
      </FormControl>
      {chartType === "attendance" && (
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Period</InputLabel>
          <Select
            value={attendancePeriod}
            onChange={(e) =>
              setAttendancePeriod(
                e.target.value as "today" | "yesterday" | "week"
              )
            }
            label="Period"
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default FilterSection;
