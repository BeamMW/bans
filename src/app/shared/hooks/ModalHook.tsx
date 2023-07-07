import { useState } from "react";

const useModal = (show: boolean) => {
  const [isShowing, setIsShowing] = useState(show);

  function onClose() {
    setIsShowing(false);
  }

  function onOpen() {
    setIsShowing(true);
  }

  return {
    isShowing,
    onClose,
    onOpen,
  };
};

export default useModal;
