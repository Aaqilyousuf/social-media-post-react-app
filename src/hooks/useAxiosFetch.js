import React, { useEffect, useState } from "react";
import axios from "axios";
const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setLoading] = useState("");

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData(null);
        }
      } finally {
        isMounted && setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchData(dataUrl);

    const cleanup = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanup;
  }, [dataUrl]);
  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
