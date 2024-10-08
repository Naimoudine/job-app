import { useNavigate, useRevalidator, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function OfferCard({ offer, bookmarks }) {
  const [bookmarked, setBookmarked] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const revalidator = useRevalidator();

  useEffect(() => {
    if (bookmarks) {
      const bookmarked = bookmarks.find(
        (bookmark) => bookmark.offerId === offer.id
      );
      if (bookmarked) {
        setBookmarked(true);
      }
    }
  }, [bookmarks]);

  const handleAddBookmark = async () => {
    try {
      if (auth) {
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
      } else {
        navigate("/signin");
      }
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
    <article className="w-full md:w-[25rem] h-[18rem] bg-gray-200 p-4 rounded-lg flex flex-col gap-2 justify-between">
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
        <Link
          className="self-end font-semibold text-zinc-900 hover:text-zinc-900/70"
          to={`/offers/${offer.id}`}
        >
          See offer
        </Link>
      </div>
    </article>
  );
}
