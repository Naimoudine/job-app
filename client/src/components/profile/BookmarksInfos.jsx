import { useNavigate } from "react-router-dom";

export default function BookmarksInfos({ bookmarks }) {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <div
            className="flex items-center gap-4 p-4 border-b border-gray-400 cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/offers/${bookmark.id}`)}
            key={bookmark.id}
          >
            <p className="application-text">
              {new Date(bookmark.created_at).toDateString()}
            </p>
            <p className="application-text">{bookmark.company_name}</p>
            <p className="application-text">{bookmark.title}</p>
            <p className="application-text">{bookmark.sector}</p>
            <p className="hidden application-text sm:block">
              {bookmark.salary}
            </p>
            <p className="application-text">{bookmark.location}</p>
          </div>
        ))
      ) : (
        <p className="mt-4">You didn't bookmark any offers</p>
      )}
    </div>
  );
}
