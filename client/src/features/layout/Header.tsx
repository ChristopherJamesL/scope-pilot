import { Link } from "react-router";
import { ButtonLink } from "../../components/ui/Button";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold tracking-tight">
          ScopePilot
        </Link>

        <nav>
          <ButtonLink to="/inquiry">Start an inquiry</ButtonLink>
        </nav>
      </div>
    </header>
  );
}
