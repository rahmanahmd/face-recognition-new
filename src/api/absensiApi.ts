import axios from "axios";
import type { Absensi, Employee, EmployeeForDropdown } from "../types";
import type {
  KontingenDetail,
  KontingenData,
  StatisticsData,
  AttendanceSettings,
  AttendanceChartResponse,
} from "../types/index";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Fungsi untuk mengambil data distribusi kontingen
export const fetchKontingenDistribution = async (): Promise<
  KontingenData[]
> => {
  try {
    const response = await api.get("/api/dashboard/kontingen_distribution");
    return response.data as KontingenData[];
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mengambil data distribusi kontingen: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mengambil data distribusi kehadiran
export const fetchAttendanceDistribution = async (
  period: string = "today"
): Promise<KontingenData[]> => {
  try {
    const response = await api.get(
      `/api/dashboard/attendance_distribution?period=${period}`
    );
    return response.data as KontingenData[];
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mengambil data distribusi kehadiran: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mengambil data statistik
export const fetchStatistics = async (): Promise<StatisticsData> => {
  try {
    const response = await api.get("/api/dashboard/stats");
    return response.data as StatisticsData;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mengambil data statistik: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mengambil data detail kontingen
export async function fetchKontingenDetails(
  kontingen: string,
  date: string
): Promise<KontingenDetail[]> {
  try {
    console.log("Mengambil data untuk kontingen:", kontingen, "tanggal:", date);
    const response = await api.get(
      `/api/dashboard/kontingen_status/${encodeURIComponent(
        kontingen
      )}?date=${date}`
    );
    console.log("API Response:", response.data);
    return response.data as KontingenDetail[];
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mengambil data detail kontingen: ${errorMessage}`);
    throw new Error(errorMessage);
  }
}

export async function fetchAttendanceStatuses(
  date: string,
  kontingen?: string
): Promise<KontingenDetail[]> {
  try {
    const query = kontingen
      ? `/api/dashboard/attendance/statuses?date=${date}&kontingen=${encodeURIComponent(
          kontingen
        )}`
      : `/api/dashboard/attendance/statuses?date=${date}`;
    const response = await api.get(query);
    return response.data as KontingenDetail[];
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mengambil status absensi: ${errorMessage}`);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk mengambil jumlah kehadiran per kontingen
export const fetchAttendanceCountPerKontingen = async (
  date: string
): Promise<KontingenData[]> => {
  try {
    const response = await api.get(
      `/api/dashboard/attendance/count_per_kontingen?date=${date}`
    );
    return response.data as KontingenData[];
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(
      `Gagal mengambil data kehadiran per kontingen: ${errorMessage}`
    );
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mengambil pengaturan absensi
export const fetchAttendanceSettings =
  async (): Promise<AttendanceSettings> => {
    try {
      const response = await api.get("/api/dashboard/attendance/settings");
      return response.data as AttendanceSettings;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      console.error(`Gagal mengambil pengaturan absensi: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  };

// Fungsi untuk memperbarui pengaturan absensi
export const updateAttendanceSettings = async (
  settings: AttendanceSettings
): Promise<AttendanceSettings> => {
  try {
    const response = await api.post(
      "/api/dashboard/attendance/settings",
      settings
    );
    return response.data as AttendanceSettings;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal memperbarui pengaturan absensi: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

export const submitIzin = async (data: {
  employee_id: number;
  tanggal: string;
  alasan_izin: string | null;
}) => {
  const response = await axios.post("/api/dashboard/submit_izin", data);
  return response.data;
};

export const fetchAbsensi = async (retries = 3): Promise<Absensi[]> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await api.get("/api/absensi");
      return response.data as Absensi[];
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      console.error(`Percobaan ${i + 1} gagal: ${errorMessage}`);
      if (i === retries - 1) {
        throw new Error(`Gagal mengambil data absensi: ${errorMessage}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error("Gagal mengambil data absensi setelah beberapa percobaan");
};

export const checkBackendStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get("/api/absensi/status", { timeout: 2000 });
    return response.status === 200;
  } catch {
    return false;
  }
};

export const checkCameraStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get("/api/absensi/camera_status", {
      timeout: 2000,
    });
    return response.data.activeCameras > 0;
  } catch (error) {
    console.error("Gagal memeriksa status kamera:", error);
    return false;
  }
};

export const registerEmployee = async (data: FormData): Promise<Employee> => {
  try {
    const response = await api.post("/api/employee/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 10000,
    });
    const employee: Employee = {
      employee_id: response.data.employee_id,
      nama: response.data.nama,
      kontingen: response.data.kontingen,
      face_image_url: response.data.face_image_url,
    };
    return employee;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mendaftarkan karyawan: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

export const startAbsensi = async (): Promise<boolean> => {
  try {
    const response = await api.get("/api/absensi/start", { timeout: 5000 });
    console.log("Kamera dimulai:", response.data);
    return true;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Gagal memulai kamera";
    console.error("Gagal start kamera:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const stopAbsensi = async (): Promise<boolean> => {
  try {
    const response = await api.get("/api/absensi/stop", { timeout: 5000 });
    console.log("Kamera dihentikan:", response.data);
    return true;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Gagal menghentikan kamera";
    console.error("Gagal stop kamera:", errorMessage);
    throw new Error(errorMessage);
  }
};
// Fungsi untuk download CSV
export const downloadAttendance = async (
  params: {
    date?: string;
    period?: "today" | "yesterday" | "week";
    all?: boolean;
  } = { period: "today" }
): Promise<void> => {
  try {
    let queryParams = "";
    if (params.all) {
      queryParams = "all=true";
    } else if (params.date) {
      queryParams = `date=${params.date}`;
    } else {
      queryParams = `period=${params.period || "today"}`;
    }
    const response = await api.get(
      `/api/dashboard/download_attendance?${queryParams}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `attendance_${
        params.all ? "all" : params.date || params.period || "today"
      }_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mendownload laporan absensi: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mengambil daftar karyawan
export const fetchEmployees = async (): Promise<EmployeeForDropdown[]> => {
  try {
    const response = await api.get("/api/dashboard/employees");
    return response.data as EmployeeForDropdown[];
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mengambil daftar karyawan: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mengambil data chart absensi
export const fetchAttendanceChartData = async (
  date?: string
): Promise<AttendanceChartResponse> => {
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Invalid date format, use YYYY-MM-DD");
  }
  try {
    const response = await api.get("/api/dashboard/attendance/chart_data", {
      params: { date },
      timeout: 5000,
    });
    console.log("Fetched chart data:", response.data);
    return response.data as AttendanceChartResponse;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`Gagal mengambil data chart absensi: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};
