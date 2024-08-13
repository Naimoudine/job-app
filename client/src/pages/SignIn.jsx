import {
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  Link,
  Form,
} from "react-router-dom";
import { useEffect } from "react";
import photo from "../assets/images/desk.avif";
import { useAuth } from "../hooks/useAuth";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });

    const { user } = await response.json();

    if (!response.ok) {
      throw new Error("Unkwown error while signing in");
    }

    const userData = {
      id: user?.id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      avatar: user?.avatar,
      isAdmin: user?.is_admin,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function SignIn() {
  const actionData = useActionData();
  const navigate = useNavigate();
  const error = useRouteError();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { setAuth } = useAuth();

  useEffect(() => {
    if (actionData) {
      setAuth(actionData);
      navigate("/", { replace: true });
    }
  }, [actionData, navigate]);

  return (
    <div className="flex items-center w-full h-full">
      <div className="w-full h-full px-16 py-4 md:w-1/2">
        <Link to="/">SJH</Link>
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
          {error && (
            <span className="inline-block mt-4 font-semibold text-red-600">
              {error.message}
            </span>
          )}
          <Form method="POST" className="flex flex-col gap-10 mt-24">
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </Form>
        </section>
      </div>
      <div className="hidden w-1/2 h-full p-2 md:block">
        <img
          className="w-full h-full rounded-lg"
          src={photo}
          alt="a man working"
        />
      </div>
    </div>
  );
}
