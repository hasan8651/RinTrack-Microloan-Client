const LoadingSpinner = () => {
  return (
    <div className="h-80 flex items-center justify-center bg-orange-50 dark:bg-transparent">
      <div className="relative flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Loading..."
            className="w-28 h-28 animate-pulse drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
