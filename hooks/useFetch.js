import { useState, useEffect } from "react";
import responseCodes from "@/constants/response-codes";

export default function useFetch({ path = "", params = {} }) {
  const [pathname, setPathname] = useState("");
  const [result, setResult] = useState({});

  useEffect(() => {
    handleFetch({ path, params });
  }, [path]);

  const handleFetch = async ({ path = pathname, params = {} }) => {
    const relativePath = buildPath(path, params);

    const url = new URL(relativePath, process.env.NEXT_PUBLIC_BASE_URL);

    const response = await fetch(url);

    const data = await handleResponse(response);

    setResult(data);
    setPathname(path);
  };

  const buildPath = (path, params) => {
    const currentPath = process.env.NEXT_PUBLIC_BASE_PATH.concat(path);

    return !isNull(params) ? appendParams(currentPath, params) : currentPath;
  };

  const appendParams = (path, paramObject) => {
    const params = new URLSearchParams(paramObject);

    return `${path}?${params}`;
  };

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

  const isNull = (variable) => {
    return variable === null || Object.keys(variable).length === 0;
  };

  return { result, mutate: handleFetch };
}
