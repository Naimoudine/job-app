import { Form } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OfferCard from "../components/OfferCard";

export default function OffersPage() {
  return (
    <div className="wrapper">
      <section>
        <h1>Find the perfect job for you</h1>
        <Form className="mt-8 flex flex-col sm:flex-row sm:border-2 sm:border-zinc-900 md:mt-16">
          <div className="sm:w-[90%] sm:px-4 sm:py-2 flex flex-col sm:flex-row gap-4 items-center">
            <FontAwesomeIcon
              className="mr-4 hidden sm:block"
              icon={faSearch}
              role="presentation"
            />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a job title or a key-word"
              className="outline-none p-2 sm:border-y-0 sm:border-r- sm:border-l-0 border-2 border-zinc-900 w-full "
            />
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter a location"
              className="sm:border-none p-2 border-2 outline-none border-zinc-900 w-full"
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
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:flex-wrap">
          <OfferCard />
          <OfferCard />
        </div>
      </section>
    </div>
  );
}
