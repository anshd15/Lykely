import axios from "axios";
import { toast } from "react-hot-toast";
import { constants } from "../config/constants";

export const api = axios.create({
  baseURL: constants.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


const apiHandler = async (method, url, data = null, customToastMessages) => {
  const toastMessages = {
    loading: customToastMessages?.loading || constants.TOAST_MESSAGES.loading,
    success: customToastMessages?.success || constants.TOAST_MESSAGES.success,
    error: customToastMessages?.error || constants.TOAST_MESSAGES.error,
  };

  const loadingToast = ["POST", "PUT", "DELETE"].includes(method)
    ? toast.loading(toastMessages.loading)
    : null;
  
  try {
    const response = await api({
      method,
      url, 
      data, 
    });

    if (loadingToast) toast.dismiss(loadingToast);
    toast.success(toastMessages.success);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || toastMessages.error;
    toast.error(errorMessage);
    if (loadingToast) toast.dismiss(loadingToast);
    throw error;
  } finally {
    if (loadingToast) toast.dismiss(loadingToast);
  }
};

export default apiHandler;
