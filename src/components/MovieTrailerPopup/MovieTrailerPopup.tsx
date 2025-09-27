import { FC } from "react";
import CloseIcon from "../UI-kit/CloseIcon/CloseIcon";

interface MovieTrailerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string;
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
      <div className="popup">
        <div className="popup__content">
          <button className="popup__close" type="button" onClick={onClose}>
            <CloseIcon />
          </button>
          <video
            className="popup__main"
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
