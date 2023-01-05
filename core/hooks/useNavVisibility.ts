import { useState, useEffect } from "react";

function useNavVisibility() {
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    const storedValue = localStorage.getItem("nav-visibility");
    if (storedValue) {
      setVisibility(JSON.parse(storedValue));
    }
  }, []);

  function toggleVisibility(newValue: boolean) {
    setVisibility(newValue);
    localStorage.setItem("nav-visibility", JSON.stringify(newValue));
  }

  return { visibility, toggleVisibility };
}

export default useNavVisibility;
