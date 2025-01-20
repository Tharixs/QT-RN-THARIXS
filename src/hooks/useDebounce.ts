import { useEffect, useState } from "react";
function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to debounce the value
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timer on component unmount or when the value changes
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
