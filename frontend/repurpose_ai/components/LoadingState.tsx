export default function LoadingState() {
  return (
    <div className="text-center py-12 space-y-4">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
      <p className="text-gray-600 font-medium animate-pulse">
        Fetching transcript & generating social assets with Gemini...
      </p>
    </div>
  );
}