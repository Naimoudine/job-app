import { Link } from "react-router-dom";
import illustration from "../assets/images/404-illu.svg";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-6">
      <img
        className="max-h-[25rem]"
        src={illustration}
        alt="error illustration"
      />
      <Link
        className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-900/70 text-neutral-100"
        to="/"
      >
        go home
      </Link>
    </div>
  );
}
