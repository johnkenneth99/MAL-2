import { useState, useEffect } from "react";
import responseCodes from "@/constants/response-codes";
import { useRouter } from "next/router";

export default function useFetch(params) {
  const [result, setResult] = useState({});

  useEffect(() => {
    (async () => {
      const [page, url] = params;
      const response = await fetch(url);

      const { data, pagination } = await handleResponse(response);

      setResult({ data, pagination });
    })();
  }, [params]);

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

  return result;
}
