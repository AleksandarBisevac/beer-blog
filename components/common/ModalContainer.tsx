import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useId,
} from "react";

export interface ModalContainerProps {
  visible?: boolean;
  onClose?(): void;
}

interface Props extends ModalContainerProps {
  children: ReactNode;
}

const ModalContainer: FC<Props> = ({
  children,
  visible,
  onClose,
}): JSX.Element | null => {
  //
  const containerId = useId();
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick = ({ target }: any) => {
    if (target.id === containerId) handleClose();
  };

  const closeModalOnKeyPress = useCallback(
    ({ key }: { key: string }) => {
      if (key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeModalOnKeyPress);
    return () => document.removeEventListener("keydown", closeModalOnKeyPress);
  }, [closeModalOnKeyPress]);

  if (!visible) return null;
  return (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 text-onNeutral bg-opacity-5 z-[100] backdrop-blur-[2px] flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
