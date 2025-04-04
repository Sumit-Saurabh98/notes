import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
        <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;