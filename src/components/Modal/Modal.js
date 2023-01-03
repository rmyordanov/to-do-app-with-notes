import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Modal = ({ open, children }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
