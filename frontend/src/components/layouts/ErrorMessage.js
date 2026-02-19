import { XCircleIcon } from "@heroicons/react/solid";
import { useAuth } from "../../contexts/AuthContext";

export default function ErrorMessage() {
  const { error, setError } = useAuth();

  return (
    error && (
      <div className="fixed top-16 left-0 right-0 z-50 flex justify-center px-4 animate-slide-down">
        <div className="max-w-md w-full bg-red-50 dark:bg-red-900/30 backdrop-blur-sm border border-red-200 dark:border-red-800/50 rounded-xl p-4 shadow-lg shadow-red-500/10">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setError("")}>
              <XCircleIcon
                className="h-5 w-5 text-red-400 hover:text-red-500 transition-colors duration-200"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {error}
              </p>
            </div>
            <button
              onClick={() => setError("")}
              className="ml-3 text-red-400 hover:text-red-500 transition-colors duration-200"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  );
}
