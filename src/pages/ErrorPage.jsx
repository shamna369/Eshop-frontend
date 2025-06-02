function ErrorPage() {
  return (
    <div>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-blue-800">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you are lost.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-blue-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Go back to{" "}
          <a href="/" className="text-blue-700">
            home
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
