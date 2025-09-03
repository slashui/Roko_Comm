export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dbd1ff]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">The page you are looking for does not exist.</p>
        <a href="/" className="text-blue-600 hover:text-blue-800 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
} 