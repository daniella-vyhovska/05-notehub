import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    // ❗ Забороняємо прокрутку сторінки
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      // ❗ Повертаємо прокрутку назад
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
