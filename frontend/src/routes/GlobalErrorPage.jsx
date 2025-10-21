import { useRouteError } from "react-router";

function GlobalErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <p className="mb-4">Sorry, an unexpected error has occurred.</p>

      {/* Show specific error info if available */}
      <p className="text-sm text-gray-500 italic">
        {error.statusText || error.message || "Page not found"}
      </p>

      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
}

export default GlobalErrorPage;