import {
  redirect,
  useNavigation,
  useRouteError,
  Link,
  Form,
} from "react-router-dom";
import photo from "../assets/images/desk.avif";

export async function action({ request }) {
  const formData = await request.formData();

  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message || "Unknown Error while creating user");
    }
    return redirect("/signIn");
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function SignUp() {
  const error = useRouteError();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex items-center w-full h-full">
      <div className="w-full h-full px-16 py-4 md:w-1/2">
        <Link to="/">SJH</Link>
        <section className="mt-8">
          <h1>Welcome back</h1>
          <p className="mt-4">
            No an account ?{" "}
            <Link
              className="font-semibold underline underline-offset-2"
              to="/signin"
            >
              Sign In
            </Link>
          </p>
          {error && (
            <span className="inline-block mt-2 font-semibold text-red-600">
              {error.message}
            </span>
          )}
          <Form method="post" className="flex flex-col gap-6 mt-8">
            <label className="flex flex-col gap-2" htmlFor="firstname">
              Firstname*
              <input
                className="p-3 text-lg border border-gray-200 rounded-lg"
                type="firstname"
                name="firstname"
                id="firstname"
                required
              />
            </label>
            <label className="flex flex-col gap-2" htmlFor="lastname">
              Lastname*
              <input
                className="p-3 text-lg border border-gray-200 rounded-lg"
                type="lastname"
                name="lastname"
                id="lastname"
                required
              />
            </label>
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
              className="py-3 rounded-lg bg-zinc-900 text-neutral-100 disabled:bg-zinc-900/60"
              type="submit"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </Form>
        </section>
      </div>
      <div className="hidden w-1/2 h-full p-2 md:block">
        <img
          className="w-full h-full rounded-lg"
          src={photo}
          alt="a man workin"
        />
      </div>
    </div>
  );
}
