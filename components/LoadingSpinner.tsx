export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 text-center"></div>
    </div>
  );
}
