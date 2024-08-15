import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import OfferCard from "../components/OfferCard";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export async function loader() {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    if (user) {
      const [offersData, bookmarksData] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/offers`),
        fetch(`${import.meta.env.VITE_API_URL}/users/${user.id}/bookmarks`),
      ]);

      if (!offersData.ok || !bookmarksData.ok) {
        throw new Error("error while fetching data");
      }
      const [offers, bookmarks] = await Promise.all([
        offersData.json(),
        bookmarksData.json(),
      ]);

      return { offers, bookmarks };
    } else {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/offers`);
      const offers = await response.json();

      if (!response.ok) {
        throw new Error("error while fetching offers");
      }

      return { offers };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function OffersPage() {
  const { offers, bookmarks } = useLoaderData();
  const [filtered, setFilter] = useState(offers);

  const handleSearch = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const keyword = formData.get("search");
    const location = formData.get("location");

    setFilter(
      offers.filter(
        (offer) =>
          (offer.title.toLowerCase().includes(keyword.toLowerCase()) ||
            offer.sector.toLowerCase().includes(keyword.toLowerCase()) ||
            offer.company_name.toLowerCase().includes(keyword.toLowerCase())) &&
          offer.location.toLowerCase().includes(location.toLowerCase())
      )
    );
  };

  return (
    <div className="wrapper">
      <section>
        <h1>Find the perfect job.</h1>
        <form
          className="flex flex-col mt-8 sm:flex-row sm:border-2 sm:border-zinc-900 md:mt-16"
          onSubmit={handleSearch}
        >
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
        </form>
      </section>
      <section className="mt-8 sm:mt-16">
        <h2>Job ffers</h2>
        <div className="flex flex-col gap-6 mt-8 sm:flex-row sm:flex-wrap">
          {filtered.length ? (
            filtered.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                bookmarks={bookmarks || []}
              />
            ))
          ) : (
            <article className="w-full mt-8 text-center">
              <h3>We couldn't find jobs for your research</h3>
              <p>Please try again!</p>
            </article>
          )}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
