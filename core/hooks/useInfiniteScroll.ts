import { useState, useEffect, useCallback } from "react";
import debounce from "../../lib/utils/debounce";

interface UseInfiniteScrollProps {
  fetchFunc: () => void;
  shouldFetch: boolean;
}

function useInfiniteScroll({ fetchFunc, shouldFetch }: UseInfiniteScrollProps) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const body = document.body;
    const html = document.documentElement;
    const previousDocumentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const currentDocumentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    if (scrollTop + windowHeight >= currentDocumentHeight && shouldFetch) {
      debouncedFetchFunc();
    }

    if (currentDocumentHeight > previousDocumentHeight && shouldFetch) {
      debouncedFetchFunc();
    }
  }, [shouldFetch]);

  const debouncedFetchFunc = debounce(fetchFunc, 500);

  return [isFetching, setIsFetching];
}

export default useInfiniteScroll;
