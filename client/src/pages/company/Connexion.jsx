import { Link, Form } from "react-router-dom";
import photo from "../../assets/images/desk.avif";

export default function Connexion() {
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
