import { useRef } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";

export async function loader() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/companies`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("error while getting compnies");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function HomePage() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const search = inputRef.current.value;
    navigate(`/offers?search=${search}`);
  };

  const companies = useLoaderData();

  return (
    <div className="wrapper">
      <section className="">
        <h1>Welcome to Super Job Hunt</h1>
        <p className="mt-6 md:text-lg">
          the best search engine to find the job that suits your preferences
          perfectly
        </p>
        <div className="flex flex-col mt-8 sm:flex-row">
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
        <h2>Discover companies</h2>
        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:flex-wrap">
          {companies.slice(3).map((company) => (
            <article
              className="w-full md:w-[25rem] md:h-[15rem] bg-gray-200 p-4 rounded-lg"
              key={company.id}
            >
              <h3>{company.name}</h3>
              <p className="my-2">{company.description}</p>
              <p className="font-semibold">{company.location}</p>
            </article>
          ))}
        </div>
        <Link
          className="flex items-center mt-6 font-semibold text-zinc-900 hover:text-zinc-900/70"
          to="/companies"
        >
          See more{" "}
          <FontAwesomeIcon className="ml-4 text-xs" icon={faArrowRight} />
        </Link>
      </section>
    </div>
  );
}
