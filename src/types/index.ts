export interface Absensi {
  id: number;
  employee_id: number;
  nama: string;
  face_image_url: string;
  attendance_type: "IN" | "OUT";
  waktu_absen: string;
  camera_id: number;
}

export interface Employee {
  face_image_url: string;
  employee_id: number;
  nama: string;
  kontingen: string;
  image?: File;
}

export interface EmployeeForDropdown {
  kontingen: any;
  employee_id: number;
  nama: string;
}

export interface GroupedAbsensi {
  employee_id: number;
  nama: string;
  face_image_url: string;
  history: { type: "IN" | "OUT"; time: string }[];
}

export interface KontingenData {
  kontingen: string;
  jumlah: number;
  total_anggota?: number;
  jumlah_absensi?: number;
  persentase?: number;
}

export interface StatisticsData {
  total_employees: number;
  total_attendance_today: number;
  face_encoding_percent: number;
}

export interface AttendanceSettings {
  check_in_time: string;
  late_tolerance: string;
  check_out_time: string;
  updated_at: string;
}

export interface KontingenDetail {
  employee_id: string;
  nama: string;
  kontingen: string;
  status: "Izin" | "Tepat Waktu" | "Telat" | "Tidak Hadir" | "Incomplete";
  check_in_time: string | null;
  check_out_time: string | null;
  alasan_izin?: string | null;
  last_attendance_date: string | null;
}

export interface DownloadAttendanceParams {
  date?: string;
  period?: "today" | "yesterday" | "week";
}

export interface ChartInData {
  kontingen: string;
  jumlah_in: number;
  total_anggota: number;
  label: string;
}

export interface ChartOutData {
  kontingen: string;
  jumlah_out: number;
  total_anggota: number;
  label: string;
}

export interface AttendanceChartResponse {
  chart_in: ChartInData[];
  chart_out: ChartOutData[];
}
