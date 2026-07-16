import { useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [isSuccessMsg, setSuccessMsg] = useState(true);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast, setSuccessMsg }}>
      {/* 1. Standard application UI stays visible */}
      {children}

      {/* 2. Toast UI div displays conditionally on top */}
      {toast && (
        <div className="toast-notification min-h-12 p-1 left-[50%] translate-x-[-50%]  flex justify-center border border-(--border-color) gap-3  w-[60%] lg:w-[20%] rounded-xl bg-black absolute top-2">
          <div className="p-2 w-full h-full flex justify-center gap-4 rounded-xl items-center border border-(--border-color)">
            {isSuccessMsg ? (
              <div className="bg-green-700 p-1 flex justify-center items-center gap-3 rounded-full">
                {" "}
                <FaCheck color="white" />
              </div>
            ) : (
              <div className="bg-red-700 flex justify-center items-center gap-3 p-1 rounded-full">
                {" "}
                <FaCheck color="white" />
              </div>
            )}
            <span className="text-(--text-primary)">{toast}</span>
          </div>{" "}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ToastData = useContext(ToastContext);
  return ToastData;
};
