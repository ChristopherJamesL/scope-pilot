import { Link } from "react-router";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold tracking-tight">
          ScopePilot
        </Link>

        <nav>
          <Link
            to="/inquiry"
            className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Start an inquiry
          </Link>
        </nav>
      </div>
    </header>
  );
}
