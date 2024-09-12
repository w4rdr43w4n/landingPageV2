import { ReactNode, useEffect, useRef, useState } from "react";

interface props {
  title: string;
  triggerContent?: string;
  children?: ReactNode;
  open:boolean
  onClose: (state: boolean) => void;
}
export default function Modal({
  title,
  children,
  triggerContent = "+",
  open,
  onClose,
}: props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const closeDialog = () => {
    onClose(false)
  };

  return (
    <div>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 w-full h-full bg-transparent backdrop-blur-sm"
      >
        <div className="text-white flex items-center justify-center w-full h-full">
          <div className="p-6 relative bg-slate-600 gap-2 rounded-lg shadow-lg max-w-lg w-full flex flex-col items-center max-h-[400px] overflow-y-auto">
            <button
              onClick={closeDialog}
              className="absolute top-2 left-2 font-extrabold text-[16px]  px-2  opacity-65 w-fit hover:opacity-100  bg-red-500 duration-150 text-white rounded"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            {children}
          </div>
        </div>
      </dialog>
    </div>
  );
}
