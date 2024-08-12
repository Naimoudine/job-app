import { useNavigate, useRevalidator } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

export default function BookmarksInfos({ bookmarks }) {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const { auth } = useAuth();

  const handleDeleteBookmark = async (e) => {
    const offerId = e.currentTarget.id;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${auth.id}/bookmarks/${offerId}`,
        {
          method: "delete",
          credentials: "include",
        }
      );
      if (response.status !== 204) {
        throw new Error("Error while deleting bookmark from offer");
      }
      return revalidator.revalidate();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="w-full">
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <div
            className="flex items-center justify-between p-4 border-b border-gray-400 cursor-pointer hover:bg-gray-200"
            key={bookmark.id}
          >
            <div
              className="flex items-center gap-4 "
              onClick={() => navigate(`/offers/${bookmark.id}`)}
            >
              <p className="application-text">
                {new Date(bookmark.created_at).toDateString()}
              </p>
              <p className="application-text">{bookmark.company_name}</p>
              <p className="application-text">{bookmark.title}</p>
              <p className="hidden sm:block application-text">
                {bookmark.sector}
              </p>
              <p className="hidden application-text sm:block">
                {bookmark.salary}
              </p>
              <p className="hidden sm:block application-text">
                {bookmark.location}
              </p>
            </div>
            <button
              className="p-2 m-0 z-60 hover:text-red-600"
              onClick={handleDeleteBookmark}
              id={bookmark.offerId}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))
      ) : (
        <p className="mt-4">You didn't bookmark any offers</p>
      )}
    </div>
  );
}
