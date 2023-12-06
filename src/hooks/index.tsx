import { useRef } from "react";

export const useFirstRender = () => {
  const ref = useRef(true);
  return ref;
}

const hooks = {
  useFirstRender,
};

export default hooks;
