import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Alert = ({
  type = "danger", // success, danger, warning, primary
  message = "This is an alert message.",
  duration = 5000,
  onClose = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const colors = {
    success: {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-700",
      hoverBg: "hover:bg-green-700",
      icon: faCheckCircle,
    },
    danger: {
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-red-700",
      hoverBg: "hover:bg-red-700",
      icon: faTimesCircle,
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-700",
      hoverBg: "hover:bg-yellow-700",
      icon: faExclamationTriangle,
    },
    primary: {
      bg: "bg-blue-100",
      border: "border-blue-400",
      text: "text-blue-700",
      hoverBg: "hover:bg-blue-700",
      icon: faInfoCircle,
    },
  };

  const alert = colors[type] || colors.primary;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      <div
        className={`fixed top-[70px] right-4 z-11 max-w-lg min-w-[30%] mx-auto flex flex-col border-l-4 ${alert.border} ${alert.bg} rounded shadow-md text-sm font-medium ${alert.text} animate-fadeIn`}
        role="alert"
      >
        <div className="flex items-center px-4 py-4">
          <span className="mr-3 flex-shrink-0">
            <FontAwesomeIcon icon={alert.icon} className={`w-5 h-5 ${alert.text}`} />
          </span>
          <span className="flex-grow">{message}</span>
          <button
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            className={`ml-4 focus:outline-none focus:ring-2 focus:ring-offset-1 rounded cursor-pointer ${alert.text} ${alert.hoverBg} bg-opacity-20 p-1 transition hover:text-white duration-200`}
            aria-label="Close alert"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {duration > 0 && (
          <div className="h-1 w-full bg-opacity-20" style={{ backgroundColor: alert.text.replace("text-", "") + "33" }}>
            <div
              className={`h-full bg-current ${alert.text}`}
              style={{
                animation: `progressBar ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Alert;
