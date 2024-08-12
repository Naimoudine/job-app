import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    if (user) {
      const [companyData, offersData, bookmarksData] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/companies/${params.id}`),
        fetch(`${import.meta.env.VITE_API_URL}/companies/${params.id}/offers`),
        fetch(`${import.meta.env.VITE_API_URL}/users/${user.id}/bookmarks`),
      ]);

      if (!companyData.ok || !offersData.ok || !bookmarksData.ok) {
        throw new Error("error while getting data");
      }

      const [company, offers, bookmarks] = await Promise.all([
        companyData.json(),
        offersData.json(),
        bookmarksData.json(),
      ]);

      return { company, offers, bookmarks };
    } else {
      const [companyData, offersData] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/companies/${params.id}`),
        fetch(`${import.meta.env.VITE_API_URL}/companies/${params.id}/offers`),
      ]);

      if (!companyData.ok || !offersData.ok) {
        throw new Error("error while getting data");
      }

      const [company, offers] = await Promise.all([
        companyData.json(),
        offersData.json(),
      ]);

      return { company, offers };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function ComapnyPage() {
  const { company, offers, bookmarks } = useLoaderData();

  return (
    <div className="wrapper">
      <section>
        <h1>{company.name}</h1>
        <p className="mt-8">{company.description}</p>
        <p className="mt-6">
          <span className="font-semibold">Capital : </span>
          {company.capital}
        </p>
        <p className="mt-6">
          <span className="font-semibold">Date of create :</span>{" "}
          {new Date(company.creation_date).toDateString()}
        </p>
        <p className="mt-6">
          <span className="font-semibold">Location : </span>
          {company.location}
        </p>
      </section>
      <section className="mt-8">
        <h2>Jobs</h2>
        <div className="flex-col gap-4 mt-6 sm:flex-row sm:flex-wrap">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} bookmarks={bookmarks} />
          ))}
        </div>
      </section>
    </div>
  );
}
