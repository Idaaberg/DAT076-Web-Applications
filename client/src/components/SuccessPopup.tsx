import { useEffect, useState } from "react";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true); // Start fade-in effect
    const timer = setTimeout(() => {
      setFade(false); // Start fade-out
      setTimeout(onClose, 500); // Remove popup after fade-out
    }, 1500); // Show for 1 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup ${fade ? "fade-in" : "fade-out"}`}>
      {message}
    </div>
  );
};

export default SuccessPopup;
