import { useLoaderData, Link, Form } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/offers/${id}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error while getting offer");
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log();

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
      method: "post",
      body: formData,
    });
    if (response.status !== 201) {
      throw new Error("Error while applying to offer");
    }
    return toast.success("Success Notification !", {
      position: "top-center",
      icon: "🚀",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default function OfferPage() {
  const offer = useLoaderData();
  return (
    <div className="wrapper">
      <h1>{offer.title}</h1>
      <Link
        className="inline-block mt-4 md:mt-6"
        to={`/company/${offer.company_id}`}
      >
        <span className="text-sm font-semibold text-gray-600">
          {offer.company_name}
        </span>
        , <span className="text-sm text-gray-600">{offer.location}</span>
      </Link>
      <section className="mt-6 md:mt-8">
        <h2>Job description</h2>
        <p className="mt-4">{offer.description}</p>
      </section>
      <section className="w-full mt-6 md:mt-8">
        <h3>Apply</h3>
        <Form
          className="w-full p-4 mt-4 bg-gray-200 rounded-lg sm:mt-6"
          method="post"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <input
              className="applyFormInput"
              type="text"
              name="firstname"
              id="firstnam"
              placeholder="Firstname"
              required
            />
            <input
              className="applyFormInput"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Lastname"
              required
            />
          </div>
          <div className="flex flex-col items-center gap-4 mt-4 sm:flex-row">
            <input
              className="applyFormInput"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <input
              className="applyFormInput"
              type="file"
              name="file"
              id="file"
              required
            />
          </div>
          <button
            className="w-full px-4 py-2 mt-2 rounded-lg bg-zinc-900 text-neutral-100 sm:w-fit"
            type="submit"
          >
            Apply
          </button>
        </Form>
      </section>
    </div>
  );
}
