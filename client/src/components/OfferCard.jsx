import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function OfferCard({offer}) {
  return (
    <section className="w-full sm:w-fit sm:w-[25rem] h-[18rem] bg-gray-200 p-4 rounded-lg flex flex-col gap-2 justify-between">
      <h3>{offer.title}</h3>
      <p>{offer.company_name}</p>
      <div className="flex flex-wrap gap-2">
        <span className="tag">{offer.sector}</span>
        <span className="tag">{offer.contract_type}</span>
        <span className="tag">{offer.salary}</span>
      </div>
      <p className="text-sm text-gray-500">27/07/2024</p>
      <div className="flex items-center justify-between">
        <FontAwesomeIcon icon={faBookmark} />
        <Link className="self-end" to={`/offers/${offer.id}`}>See offer</Link>
      </div>
    </section>
  );
}
