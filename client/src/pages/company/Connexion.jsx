import { Link, Form, useActionData, useNavigate } from "react-router-dom";
import photo from "../../assets/images/desk.avif";
import { useEffect } from "react";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/connexion`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unknwon error while getting user");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function Connexion() {
  const account = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate("/company/dashboard");
    }
  }, [account]);

  return (
    <div className="flex flex-col w-full h-full md:flex-row-reverse">
      <div className="w-1/2 h-full p-4">
        <Link to="/">SJH</Link>
        <section className="mt-16">
          <h1>Welcome back</h1>
          <Form method="post" className="flex flex-col gap-10 mt-24">
            <div className="flex flex-col gap-4">
              <label htmlFor="email">Pro email*</label>
              <input
                className="p-3 text-lg border border-gray-200 rounded-lg"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="siret">Password*</label>
              <input
                className="p-3 text-lg border border-gray-200 rounded-lg"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <button
              className="py-3 rounded-lg bg-zinc-900 text-neutral-100 disabled:bg-zinc-900/60"
              type="submit"
            >
              Connexion
            </button>
          </Form>
        </section>
      </div>
      <div className="hidden h-full p-4 md:block md:w-1/2">
        <img className="w-full h-full rounded-lg" src={photo} alt="" />
      </div>
    </div>
  );
}
