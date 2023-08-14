import { useState, useEffect } from "react";
import responseCodes from "@/constants/response-codes";
import { useRouter } from "next/router";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [arr1, setArr1] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(url);

      const { data: result } = await handleResponse(response);

      setData(result);
    })();
  }, [url]);

  const handleResponse = async (response) => {
    const { status, statusText } = response;

    if (isError(status)) {
      throw new Error(statusText);
    }

    return await response.json();
  };

  const isError = (status) => {
    return status !== responseCodes.OK;
  };

  return { data };
}
