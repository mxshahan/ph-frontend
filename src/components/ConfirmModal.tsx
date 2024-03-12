import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

export interface IConfirmModal {
  onConfirm?: () => any; // If return boolean then the modal will turn off
  onCancel?: Function;
  onOpen?: Function;
  title?: string;
  description?: any;
  children?: any;
  okText?: string;
  cancelText?: string;
  className?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  style?: any;
  visible?: boolean;
  disabled?: boolean;
}

export function ConfirmModal({
  onConfirm,
  onCancel,
  onOpen,
  title = "Confirmation!",
  description = "Do you really want to confirm?",
  children,
  okText,
  cancelText,
  okButtonProps,
  cancelButtonProps,
  visible: _visible,
  disabled,
  className = "",
}: IConfirmModal) {
  const [visible, setVisible] = useState(_visible || false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (onConfirm) {
        await onConfirm();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onClick = () => {
    setVisible(true);
    if (onOpen) onOpen();
  };
  const onClose = () => {
    setVisible(false);
    if (onCancel) onCancel();
  };

  return disabled ? (
    children
  ) : (
    <>
      {visible && (
        <div className="fixed w-screen h-screen inset-0 flex justify-center items-center z-50">
          <div className="fixed w-screen h-screen inset-0 bg-black opacity-50"></div>
          <div
            className="w-full p-2 py-10 relative z-20 h-full overflow-y-scroll"
            //  className={`lg:min-w-[400px] w-full relative z-20 h-full overflow-y-auto ${className} `}
            // style={{ ...style }}
          >
            <div className="flex justify-center items-center">
              <div className={twMerge("w-full md:w-60/100 lg:w-40/100 p-0 bg-white relative", className)}>
                <div className="cursor-pointer absolute top-1 right-1" onClick={onClose}>
                  <IoIosCloseCircleOutline size={35} />
                </div>
                <div className="modal-head text-lg text-center p-2 bg-gray-50">{title}</div>
                <div className="modal-sub p-5">
                  {typeof description === "function" ? description({ onCancel, onConfirm }) : description}
                </div>

                <div className="flex justify-end gap-2 p-2 bg-gray-50">
                  <Button
                    className="hover:bg-red-600 disabled:bg-gray-400 disabled:hover:bg-gray-400 px-5 bg-red-500 text-white"
                    onClick={onClose}
                    disabled={loading}
                    {...cancelButtonProps}
                  >
                    {cancelText || "Cancel"}
                  </Button>
                  <Button
                    className="hover:bg-green-600 disabled:bg-gray-400 disabled:hover:bg-gray-400 px-5 bg-green-500 text-white"
                    loading={loading}
                    onClick={handleConfirm}
                    {...okButtonProps}
                  >
                    {okText || "Confirm"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {React.cloneElement(children, { onClick: onClick })}
    </>
  );
}
