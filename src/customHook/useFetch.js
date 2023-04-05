import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mailAction } from "../redux/redux-mails";

const useFetch = () => {
  // const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();

  const sendRequest = useCallback(async (requestConfiq, applyData) => {
    setIsLoading(() => true);
    setError(() => null);
    try {
      const response = await fetch(requestConfiq.URL, {
        method: requestConfiq.method ? requestConfiq.method : "GET",
        body: requestConfiq.body ? JSON.stringify(requestConfiq.body) : null,
        headers: requestConfiq.headers ? requestConfiq.headers : {},
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong");
      }
      applyData(data);
    } catch (error) {
      setError(() => error);
    }
    setIsLoading(false);
  }, []);
  return {
    error,
    isLoading,
    sendRequest,
  };
};

export default useFetch;
