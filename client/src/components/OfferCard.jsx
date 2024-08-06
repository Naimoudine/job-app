import { Link, useRevalidator } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function OfferCard({ offer, bookmarks }) {
  const [bookmarked, setBookmarked] = useState(false);

  const { auth } = useAuth();

  const revalidator = useRevalidator();

  useEffect(() => {
    const bookmarked = bookmarks.find(
      (bookmark) => bookmark.offerId === offer.id
    );
    if (bookmarked) {
      setBookmarked(true);
    }
  }, [bookmarks]);

  const handleAddBookmark = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${auth.id}/bookmarks/${
          offer.id
        }`,
        {
          method: "post",
          credentials: "include",
        }
      );
      if (response.status !== 201) {
        throw new Error("Error while bookmarking offer");
      }
      setBookmarked(true);
      return revalidator.revalidate();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleDeleteBookmark = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${auth.id}/bookmarks/${
          offer.id
        }`,
        {
          method: "delete",
          credentials: "include",
        }
      );
      if (response.status !== 204) {
        throw new Error("Error while deleting bookmark from offer");
      }
      setBookmarked(false);
      return revalidator.revalidate();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <section className="w-full md:w-[25rem] h-[18rem] bg-gray-200 p-4 rounded-lg flex flex-col gap-2 justify-between">
      <h3>{offer.title}</h3>
      <p>{offer.company_name}</p>
      <div className="flex flex-wrap gap-2">
        <span className="tag">{offer.sector}</span>
        <span className="tag">{offer.contract_type}</span>
        <span className="tag">{offer.salary}</span>
      </div>
      <p className="text-sm text-gray-500">27/07/2024</p>
      <div className="flex items-center justify-between">
        {bookmarked ? (
          <button className="p-0 m-0" onClick={handleDeleteBookmark}>
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        ) : (
          <button className="p-0 m-0" onClick={handleAddBookmark}>
            <FontAwesomeIcon icon={faBookmarkOutline} />
          </button>
        )}
        <Link className="self-end" to={`/offers/${offer.id}`}>
          See offer
        </Link>
      </div>
    </section>
  );
}
