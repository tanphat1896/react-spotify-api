import { useEffect, useState } from "react";

function useParam(pName) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const p = new URL(window.location.href);
    setValue(p.searchParams.get(pName));
    console.log("=> ", p);
  }, [pName]);

  return value;
}

export default useParam;
