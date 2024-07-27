import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OfferCard() {
  return (
    <section className="w-full sm:w-fit h-[12rem] bg-gray-200 p-4 rounded-lg flex flex-col justify-between">
      <h3>Senior Front end developper </h3>
      <p>Netflix</p>
      <div className="flex flex-wrap gap-2">
        <span className="tag">web</span>
        <span className="tag">cdi</span>
        <span className="tag">40k-50k</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">27/07/2024</p>
        <FontAwesomeIcon icon={faBookmark} />
      </div>
    </section>
  );
}
