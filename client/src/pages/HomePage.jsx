import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const search = inputRef.current.value;
    navigate(`/offers?search=${search}`);
  };

  return (
    <div className="wrapper">
      <section className="">
        <h1>Welcome to Super Job Hunt</h1>
        <p className="mt-6 md:text-lg">
          the best search engine to find the job that suits your preferences
          perfectly
        </p>
        <div className="flex flex-col sm:flex-row mt-8">
          <div className="sm:w-[90%] px-4 py-2 flex items-center border-2 border-zinc-900">
            <FontAwesomeIcon
              className="mr-4"
              icon={faSearch}
              role="presentation"
            />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a job title or a key-word"
              className="w-[95%] outline-none"
              ref={inputRef}
            />
          </div>
          <button
            className="mt-2 bg-zinc-900 text-neutral-100 sm:mt-0 sm:w-[10%]"
            type="submit"
            onClick={handleSearch}
          >
            Find
          </button>
        </div>
      </section>
      <section className="mt-8 md:mt-16">
        <h2>Discover comapnies</h2>
      </section>
    </div>
  );
}
