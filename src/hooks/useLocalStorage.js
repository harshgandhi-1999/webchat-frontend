import { useEffect, useState } from "react";

const PREFIX = "webchat-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = JSON.parse(localStorage.getItem(prefixedKey));
    console.log(jsonValue !== null);
    if (jsonValue !== null) return jsonValue;
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}
