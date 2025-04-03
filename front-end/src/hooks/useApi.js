import { useState } from "react";
import { toast } from "react-hot-toast";
import { constants } from "../config/constants";
import apiHandler from "../api/api";
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleRequest = async (
    method,
    url,
    data = null,
    customToastMessages
  ) => {
    const toastMessages = {
      loading: customToastMessages?.loading || constants.TOAST_MESSAGES.loading,
      success: customToastMessages?.success || constants.TOAST_MESSAGES.success,
      error: customToastMessages?.error || constants.TOAST_MESSAGES.error,
    };

    setLoading(true);
    setError(null);

    try {
      let response;
      switch (method) {
        case "GET":
          response = await apiHandler("GET", url, null,toastMessages);
          break;
        case "POST":
          response = await apiHandler("POST", url, data,toastMessages);
          break;
        case "PUT":
          response = await apiHandler("PUT", url, data,toastMessages);
          break;
        case "DELETE":
          response = await apiHandler("DELETE", url, null,toastMessages);
          break;
        default:
          throw new Error("Invalid Method");
      }

      setData(response);
      toast.success(toastMessages.success);
    } catch (err) {
      setError(err);
      toast.error(toastMessages.error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    handleRequest,
  };
};

export default useApi;


