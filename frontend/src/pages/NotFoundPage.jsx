import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="rounded-full bg-blue-50 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you are looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  )
}
