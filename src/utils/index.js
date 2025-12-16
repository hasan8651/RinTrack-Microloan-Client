import axios from "axios";
import Swal from "sweetalert2";

// Upload image to IMGBB
export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
    formData
  );
  return data?.data?.display_url;
};

// save or update user in DB
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );
  return data;
};

//  reusable toast
export const showAlert = ({
  title = "Action completed.",
  color = "#F9FAFB",
  icon = "info",
  text = "",
} = {}) => {
  Swal.fire({
    toast: true,
    position: "top",
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: 1500,
    color,
    timerProgressBar: true,
    background: "rgba(51, 65, 85, 0.85)",

    didOpen: (toast) => {
      Object.assign(toast.style, {
        borderRadius: "12px",
        border: "1px solid rgba(148, 163, 184, 0.6)",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        fontSize: "0.9rem",
        fontWeight: "600",
      });
    },
  });
};
