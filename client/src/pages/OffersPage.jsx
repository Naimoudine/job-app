import { Form, useLoaderData } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OfferCard from "../components/OfferCard";

export const loader = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/offers`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("error while fetching offers");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default function OffersPage() {
  const offers = useLoaderData();

  return (
    <div className="wrapper">
      <section>
        <h1>Find the perfect job for you</h1>
        <Form className="flex flex-col mt-8 sm:flex-row sm:border-2 sm:border-zinc-900 md:mt-16">
          <div className="sm:w-[90%] sm:px-4 sm:py-2 flex flex-col sm:flex-row gap-4 items-center">
            <FontAwesomeIcon
              className="hidden mr-4 sm:block"
              icon={faSearch}
              role="presentation"
            />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a job title or a key-word"
              className="w-full p-2 border-2 outline-none sm:border-y-0 sm:border-r- sm:border-l-0 border-zinc-900 "
            />
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter a location"
              className="w-full p-2 border-2 outline-none sm:border-none border-zinc-900"
            />
          </div>
          <button
            className="sm:w-[10%] bg-zinc-900 text-neutral-100 mt-4 sm:mt-0"
            type="submit"
          >
            Search
          </button>
        </Form>
      </section>
      <section className="mt-8 sm:mt-16">
        <h2>Offers</h2>
        <div className="flex flex-col gap-6 mt-8 sm:flex-row sm:flex-wrap">
          {offers &&
            offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
        </div>
      </section>
    </div>
  );
}
