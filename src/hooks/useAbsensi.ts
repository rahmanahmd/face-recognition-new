import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAbsensi,
  checkBackendStatus,
  registerEmployee,
  fetchKontingenDistribution,
  fetchAttendanceDistribution,
  fetchStatistics,
  fetchKontingenDetails,
  fetchAttendanceCountPerKontingen,
  fetchAttendanceSettings,
  updateAttendanceSettings,
  fetchAttendanceStatuses,
  submitIzin,
  downloadAttendance,
  fetchAttendanceChartData,
} from "../api/absensiApi";
import type {
  Absensi,
  Employee,
  KontingenData,
  StatisticsData,
  AttendanceSettings,
  KontingenDetail,
  EmployeeForDropdown,
  AttendanceChartResponse,
} from "../types";
import axios from "axios";

export const useEmployees = () => {
  return useQuery<EmployeeForDropdown[]>({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axios.get("/api/employees");
      console.log("Employees API response:", response.data);
      return response.data;
    },
  });
};

export const useDownloadAttendance = () => {
  return useMutation<void, Error, { date?: string; all?: boolean }>({
    mutationFn: (params) => downloadAttendance(params),
    onSuccess: () => {
      console.log("Laporan absensi berhasil didownload");
    },
    onError: (error) => {
      console.error("Gagal mendownload laporan absensi:", error.message);
    },
  });
};

export const useKontingenDistribution = () => {
  return useQuery<KontingenData[], Error>({
    queryKey: ["kontingenDistribution"],
    queryFn: fetchKontingenDistribution,
    retry: 2,
  });
};

export const useAttendanceDistribution = (period: string = "today") => {
  return useQuery<KontingenData[], Error>({
    queryKey: ["attendanceDistribution", period],
    queryFn: () => fetchAttendanceDistribution(period),
    retry: 2,
  });
};

export const useStatistics = () => {
  return useQuery<StatisticsData, Error>({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
    retry: 2,
    refetchInterval: 5000,
    retryDelay: 1000,
    staleTime: 4000,
  });
};

export const useKontingenDetails = (kontingen: string, date: string) => {
  return useQuery<KontingenDetail[], Error>({
    queryKey: ["kontingenDetails", kontingen, date],
    queryFn: () => fetchKontingenDetails(kontingen, date),
    retry: 2,
    enabled: !!kontingen && !!date,
  });
};

export const useAttendanceStatuses = (date: string, kontingen?: string) => {
  return useQuery<KontingenDetail[], Error>({
    queryKey: ["attendanceStatuses", date, kontingen],
    queryFn: () => fetchAttendanceStatuses(date, kontingen),
    retry: 2,
    enabled: !!date,
    refetchInterval: 10000,
  });
};

export const useAttendanceCountPerKontingen = (date: string) => {
  return useQuery<KontingenData[], Error>({
    queryKey: ["attendanceCountPerKontingen", date],
    queryFn: () => fetchAttendanceCountPerKontingen(date),
    retry: 2,
    enabled: !!date,
  });
};

export const useAttendanceSettings = () => {
  return useQuery<AttendanceSettings, Error>({
    queryKey: ["attendanceSettings"],
    queryFn: fetchAttendanceSettings,
    retry: 2,
  });
};

export const useUpdateAttendanceSettings = () => {
  return useMutation<AttendanceSettings, Error, AttendanceSettings>({
    mutationFn: updateAttendanceSettings,
    onSuccess: (data) => {
      console.log("Pengaturan absensi berhasil diperbarui:", data);
    },
    onError: (error) => {
      console.error("Gagal memperbarui pengaturan absensi:", error.message);
    },
  });
};

export const useAbsensi = () => {
  return useQuery<Absensi[], Error>({
    queryKey: ["absensi"],
    queryFn: () => fetchAbsensi(),
    refetchInterval: 5000, // Polling setiap 5 detik
    retry: 2,
    retryDelay: 1000,
    staleTime: 4000, // Data dianggap fresh selama 4 detik
  });
};

export const useBackendStatus = () => {
  return useQuery<boolean, Error>({
    queryKey: ["backendStatus"],
    queryFn: checkBackendStatus,
    retry: 2,
    retryDelay: 1000,
    refetchInterval: 10000,
  });
};

export const useRegisterEmployee = () => {
  return useMutation<Employee, Error, FormData>({
    mutationFn: registerEmployee,
    onSuccess: (data) => {
      console.log("Registrasi berhasil:", data);
      // Tambahkan feedback ke UI, misalnya dengan state atau alert
    },
    onError: (error) => {
      console.error("Gagal registrasi:", error.message);
      // Tampilkan error di UI melalui state atau komponen
    },
  });
};

export const useSubmitIzin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitIzin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendanceDistribution"] });
      queryClient.invalidateQueries({ queryKey: ["attendanceStatuses"] });
    },
    onError: (error: Error) => {
      console.error("Gagal mengajukan izin:", error.message);
    },
  });
};

export const useAttendanceChartData = (date?: string) => {
  return useQuery<AttendanceChartResponse, Error>({
    queryKey: ["attendanceChartData", date],
    queryFn: () => fetchAttendanceChartData(date),
    retry: 1,
    staleTime: 5 * 60 * 1000, // Sesuaikan sesuai kebutuhan
  });
};
