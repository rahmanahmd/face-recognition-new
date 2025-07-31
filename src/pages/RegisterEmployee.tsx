// import { useState, useRef, useEffect, type FormEvent } from "react";
// import { Box, Container, Paper, Typography } from "@mui/material";
// import type { SelectChangeEvent } from "@mui/material/Select";
// import { motion } from "framer-motion";
// import { useRegisterEmployee } from "../hooks/useAbsensi";
// import type { Employee } from "../types";
// import { FormSection } from "../components/RegisterEmployee/FormSection";
// import { ImageSection } from "../components/RegisterEmployee/ImageSection";
// import { PreviewSection } from "../components/RegisterEmployee/PreviewSection";
// import { AlertMessage } from "../components/RegisterEmployee/AlertMessage";
// import { SubmitButton } from "../components/RegisterEmployee/SubmitButton";

// interface RegisterEmployeeProps {
//   isSidebarOpen: boolean;
// }

// export const RegisterEmployee: React.FC<RegisterEmployeeProps> = ({
//   isSidebarOpen,
// }) => {
//   const [formData, setFormData] = useState<Employee>({
//     employee_id: 0,
//     nama: "",SM
//     kontingen: "",
//     face_image_url: "",
//   });
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { mutate: register, status } = useRegisterEmployee();
//   const isLoading = status === "pending";

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden && imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//         setImagePreview(null);
//         setImage(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//     };
//   }, [imagePreview]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     if (
//       name === "nama" &&
//       /^[a-zA-Z\s-]*$/.test(value) &&
//       value.length <= 100
//     ) {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     } else if (
//       name === "employee_id" &&
//       /^\d*$/.test(value) &&
//       value.length <= 10
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value === "" ? 0 : Number(value),
//       }));
//     }
//   };

//   const handleSelectChange = (event: SelectChangeEvent<string>) => {
//     const { name, value } = event.target;
//     if (
//       name === "kontingen" &&
//       /^[a-zA-Z\s-]*$/.test(value) &&
//       value.length <= 50
//     ) {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleImageSelect = (file: File) => {
//     const validTypes = ["image/png", "image/jpeg", "image/jpg"];
//     if (!validTypes.includes(file.type)) {
//       setError("File must be PNG, JPG, or JPEG");
//       setImage(null);
//       setImagePreview(null);
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image size must be under 5MB");
//       setImage(null);
//       setImagePreview(null);
//       return;
//     }
//     const img = new Image();
//     img.src = URL.createObjectURL(file);
//     img.onload = () => {
//       if (img.width < 100 || img.height < 100) {
//         setError("Image must be at least 100x100 pixels");
//         setImage(null);
//         setImagePreview(null);
//       } else {
//         setImage(file);
//         setImagePreview(URL.createObjectURL(file));
//         setError("");
//       }
//       URL.revokeObjectURL(img.src);
//     };
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setError("");
//     setMessage("");

//     if (!formData.nama.trim()) {
//       setError("Full Name is required");
//       return;
//     }
//     if (formData.nama.trim().length < 2) {
//       setError("Full Name must be at least 2 characters");
//       return;
//     }
//     if (!formData.kontingen.trim()) {
//       setError("Contingent is required");
//       return;
//     }
//     if (!image) {
//       setError("Please upload or capture a face photo");
//       return;
//     }

//     const data = new FormData();
//     data.append("employee_id", String(formData.employee_id).trim());
//     data.append("nama", formData.nama.trim());
//     data.append("kontingen", formData.kontingen.trim());
//     data.append("image", image);
//     register(data, {
//       onSuccess: (response: any) => {
//         setMessage(
//           `Registration successful! Employee ID: ${
//             response.employee_id ?? formData.employee_id
//           }`
//         );
//         setFormData({
//           employee_id: 0,
//           nama: "",
//           kontingen: "",
//           face_image_url: "",
//         });
//         setImage(null);
//         setImagePreview(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//         setTimeout(() => setMessage(""), 3000);
//       },
//       onError: (err: any) => {
//         setError(err.message || "Registration failed, please try again");
//       },
//     });
//   };

//   const styles = {
//     container: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       py: { xs: 2, sm: 4, md: 6 },
//       px: 0,
//       bgcolor: "#ffffff",
//       ml: { xs: 0, md: isSidebarOpen ? "200px" : "60px" },
//       width: {
//         xs: "100%",
//         md: isSidebarOpen ? "calc(100% - 200px)" : "calc(100% - 60px)",
//       },
//       transition: "margin-left 0.3s ease, width 0.3s ease",
//     },
//     mainBox: {
//       display: "flex",
//       flexDirection: { xs: "column", md: "row" },
//       gap: 5,
//       width: "100%",
//       maxWidth: "1290px",
//       mx: "auto",
//       height: "100%",
//     },
//     formCard: {
//       boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
//       borderRadius: "20px",
//       width: { xs: "100%", md: "50%" },
//       bgcolor: "#ffffff",
//       minHeight: "800px",
//       maxHeight: "calc(100vh - 96px)",
//       display: "flex",
//       flexDirection: "column",
//       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       "&:hover": {
//         transform: "translateY(-4px)",
//         boxShadow: "0 16px 48px rgba(0, 0, 0, 0.18)",
//       },
//     },
//     imageCard: {
//       boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
//       borderRadius: "20px",
//       width: { xs: "100%", md: "50%" },
//       bgcolor: "#ffffff",
//       minHeight: "800px",
//       maxHeight: "calc(100vh - 96px)",
//       display: "flex",
//       flexDirection: "column",
//       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       "&:hover": {
//         transform: "translateY(-4px)",
//         boxShadow: "0 16px 48px rgba(0, 0, 0, 0.18)",
//       },
//     },
//     formHeader: {
//       padding: { xs: "24px 28px", sm: "28px 40px" },
//       bgcolor: "#ffd500",
//       color: "#1f2937",
//       borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
//     },
//     formTitle: {
//       fontWeight: 700,
//       fontSize: { xs: "2rem", sm: "2.5rem" },
//       letterSpacing: "-0.02em",
//     },
//     subtitle: {
//       fontWeight: 400,
//       fontSize: "1rem",
//       color: "#4b5563",
//       opacity: 0.9,
//     },
//   };

//   return (
//     <Container maxWidth={false} sx={styles.container}>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//       >
//         <Box sx={styles.mainBox}>
//           <Paper elevation={0} sx={styles.formCard}>
//             <Box sx={styles.formHeader}>
//               <Typography variant="h4" sx={styles.formTitle}>
//                 Employee Registration
//               </Typography>
//               <Typography variant="body2" sx={styles.subtitle}>
//                 Register a new employee with face recognition
//               </Typography>
//             </Box>

//             {message && (
//               <AlertMessage
//                 message={message}
//                 severity="success"
//                 onClose={() => setMessage("")}
//               />
//             )}
//             {error && (
//               <AlertMessage
//                 message={error}
//                 severity="error"
//                 onClose={() => setError("")}
//               />
//             )}

//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 4,
//                 padding: { xs: "32px", sm: "40px" },
//                 flexGrow: 1,
//               }}
//             >
//               <FormSection
//                 formData={formData}
//                 handleInputChange={handleInputChange}
//                 handleSelectChange={handleSelectChange}
//                 isLoading={isLoading}
//                 error={error}
//               />
//               <PreviewSection imagePreview={imagePreview} />
//               <SubmitButton isLoading={isLoading} />
//             </Box>
//           </Paper>

//           <Paper elevation={0} sx={styles.imageCard}>
//             <ImageSection
//               onImageSelect={handleImageSelect}
//               isLoading={isLoading}
//               inputRef={fileInputRef}
//             />
//           </Paper>
//         </Box>
//       </motion.div>
//     </Container>
//   );
// };

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { motion } from "framer-motion";
import { useRegisterEmployee } from "../hooks/useAbsensi";
import type { Employee } from "../types";
import { FormSection } from "../components/RegisterEmployee/FormSection";
import { ImageSection } from "../components/RegisterEmployee/ImageSection";
import { PreviewSection } from "../components/RegisterEmployee/PreviewSection";
import { AlertMessage } from "../components/RegisterEmployee/AlertMessage";
import { SubmitButton } from "../components/RegisterEmployee/SubmitButton";

interface RegisterEmployeeProps {
  isSidebarOpen: boolean;
}

export const RegisterEmployee: React.FC<RegisterEmployeeProps> = ({
  isSidebarOpen,
}) => {
  const [formData, setFormData] = useState<Employee>({
    employee_id: 0,
    nama: "",
    kontingen: "",
    face_image_url: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: register, status } = useRegisterEmployee();
  const isLoading = status === "pending";

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (
      name === "nama" &&
      /^[a-zA-Z\d\s-]*$/.test(value) &&
      value.length <= 100
    ) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (
      name === "employee_id" &&
      /^\d*$/.test(value) &&
      value.length <= 10
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (
      name === "kontingen" &&
      /^[a-zA-Z\s-]*$/.test(value) &&
      value.length <= 50
    ) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageSelect = (file: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("File harus berupa PNG, JPG, atau JPEG");
      setImage(null);
      setImagePreview(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar harus di bawah 5MB");
      setImage(null);
      setImagePreview(null);
      return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 100 || img.height < 100) {
        setError("Gambar harus minimal 100x100 piksel");
        setImage(null);
        setImagePreview(null);
      } else {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setError("");
      }
      URL.revokeObjectURL(img.src);
    };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!formData.nama.trim()) {
      setError("Nama lengkap wajib diisi");
      return;
    }
    if (formData.nama.trim().length < 2) {
      setError("Nama lengkap harus minimal 2 karakter");
      return;
    }
    if (!formData.kontingen.trim()) {
      setError("Kontingen wajib diisi");
      return;
    }
    if (!image) {
      setError("Harap unggah atau ambil foto wajah");
      return;
    }

    const data = new FormData();
    data.append("employee_id", String(formData.employee_id).trim());
    data.append("nama", formData.nama.trim());
    data.append("kontingen", formData.kontingen.trim());
    data.append("image", image);
    register(data, {
      onSuccess: (response: any) => {
        setMessage(
          `Pendaftaran berhasil! ID Karyawan: ${
            response.employee_id ?? formData.employee_id
          }`
        );
        setFormData({
          employee_id: 0,
          nama: "",
          kontingen: "",
          face_image_url: "",
        });
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setTimeout(() => setMessage(""), 3000);
      },
      onError: (err: any) => {
        setError(err.message || "Pendaftaran gagal, silakan coba lagi");
      },
    });
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      py: { xs: 2, sm: 4, md: 6 },
      px: 0,
      bgcolor: "#ffffff",
      ml: { xs: 0, md: isSidebarOpen ? "200px" : "60px" },
      width: {
        xs: "100%",
        md: isSidebarOpen ? "calc(100% - 200px)" : "calc(100% - 60px)",
      },
      transition: "margin-left 0.3s ease, width 0.3s ease",
    },
    mainBox: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 5,
      width: "100%",
      maxWidth: "1290px",
      mx: "auto",
      height: "100%",
    },
    formCard: {
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
      borderRadius: "20px",
      width: { xs: "100%", md: "50%" },
      bgcolor: "#ffffff",
      minHeight: "800px",
      maxHeight: "calc(100vh - 96px)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.18)",
      },
    },
    imageCard: {
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
      borderRadius: "20px",
      width: { xs: "100%", md: "50%" },
      bgcolor: "#ffffff",
      minHeight: "800px",
      maxHeight: "calc(100vh - 96px)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.18)",
      },
    },
    formHeader: {
      padding: { xs: "24px 28px", sm: "28px 40px" },
      bgcolor: "#ffd500",
      color: "#1f2937",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    },
    formTitle: {
      fontWeight: 700,
      fontSize: { xs: "2rem", sm: "2.5rem" },
      letterSpacing: "-0.02em",
    },
    subtitle: {
      fontWeight: 400,
      fontSize: "1rem",
      color: "#4b5563",
      opacity: 0.9,
    },
  };

  return (
    <Container maxWidth={false} sx={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box sx={styles.mainBox}>
          <Paper elevation={0} sx={styles.formCard}>
            <Box sx={styles.formHeader}>
              <Typography variant="h4" sx={styles.formTitle}>
                Pendaftaran Karyawan
              </Typography>
              <Typography variant="body2" sx={styles.subtitle}>
                Daftarkan karyawan baru dengan pengenalan wajah
              </Typography>
            </Box>

            {message && (
              <AlertMessage
                message={message}
                severity="success"
                onClose={() => setMessage("")}
              />
            )}
            {error && (
              <AlertMessage
                message={error}
                severity="error"
                onClose={() => setError("")}
              />
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: { xs: "32px", sm: "40px" },
                flexGrow: 1,
              }}
            >
              <FormSection
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                isLoading={isLoading}
                error={error}
              />
              <PreviewSection imagePreview={imagePreview} />
              <SubmitButton isLoading={isLoading} />
            </Box>
          </Paper>

          <Paper elevation={0} sx={styles.imageCard}>
            <ImageSection
              onImageSelect={handleImageSelect}
              isLoading={isLoading}
              inputRef={fileInputRef}
            />
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};
