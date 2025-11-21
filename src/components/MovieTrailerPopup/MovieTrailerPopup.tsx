import { FC } from "react";
import CloseIcon from "../UI-kit/CloseIcon/CloseIcon";
import styles from "./MovieTrailerPopup.module.css";

interface MovieTrailerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl?: string;
}

const MovieTrailerPopup: FC<MovieTrailerPopupProps> = ({
  isOpen,
  onClose,
  trailerUrl,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup__content}>
          <button
            className={styles.popup__close}
            type="button"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <video
            className={styles.popup__main}
            src={trailerUrl}
            controls
            autoPlay
            muted
            width="1024"
          ></video>
        </div>
      </div>
    </>
  );
};

export default MovieTrailerPopup;
