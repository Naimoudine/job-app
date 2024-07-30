import { Form, Link } from "react-router-dom";
import illu from "../assets/images/illustration.jpg";

export default function SignIn() {
  return (
    <div className="flex items-center w-full h-full">
      <div className="w-full h-full px-16 py-4 md:w-1/2">
        <p>SJH</p>
        <section className="mt-16">
          <h1>Welcome back</h1>
          <p className="mt-8">
            No an account ?{" "}
            <Link
              className="font-semibold underline underline-offset-2"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
          <Form method="post" className="flex flex-col gap-10 mt-24">
            <label className="flex flex-col gap-2" htmlFor="email">
              Email*
              <input
                className="p-3 text-lg border border-gray-200 rounded-lg"
                type="email"
                name="email"
                id="email"
                required
              />
            </label>
            <label className="flex flex-col gap-2" htmlFor="password">
              Password*
              <input
                className="p-3 border border-gray-200 rounded-lg"
                type="password"
                name="password"
                id="password"
                required
              />
            </label>
            <button
              className="py-3 rounded-lg bg-zinc-900 text-neutral-100"
              type="submit"
            >
              SignIn
            </button>
          </Form>
        </section>
      </div>
      <div className="hidden w-1/2 h-full p-2 md:block">
        <img className="w-full h-full rounded-lg" src={illu} alt="" />
      </div>
    </div>
  );
}
