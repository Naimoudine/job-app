import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export async function loader() {
  const currUser = JSON.parse(localStorage.getItem("user"));

  try {
    const [userData, applicationsData, bookmarksData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/users/${currUser.id}`, {
        credentials: "include",
      }),
      fetch(
        `${import.meta.env.VITE_API_URL}/users/${currUser.id}/applications`,
        {
          credentials: "include",
        }
      ),
      fetch(`${import.meta.env.VITE_API_URL}/users/${currUser.id}/bookmarks`, {
        credentials: "include",
      }),
    ]);
    if (!userData.ok || !applicationsData.ok || !bookmarksData.ok) {
      throw new Error("unknow error while getting data");
    }
    const [user, applications, bookmarks] = await Promise.all([
      userData.json(),
      applicationsData.json(),
      bookmarksData.json(),
    ]);
    return { user, applications, bookmarks };
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function ProfilePage() {
  const [displayedSection, setDisplayedSection] = useState("Profile");

  const { user, applications, bookmarks } = useLoaderData();
  const { setShowPicModal } = useOutletContext();

  return (
    <div className="wrapper">
      <section>
        <div className="relative flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full">
          <button
            className="absolute z-40 px-2 py-1 m-0 -right-2 top-4 hover:bg-gray-100 hover:rounded-full"
            type="button"
            onClick={() => setShowPicModal(true)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <img
            className="w-full h-full rounded-full"
            src={user.picture}
            alt="profil picture"
          />
        </div>
        <h1 className="mt-4">{`${user?.firstname} ${user?.lastname}`}</h1>
        <p className="mt-6">{user?.email}</p>
      </section>
      <div className="mt-6">
        <nav>
          <ul className="flex items-center gap-4 pb-4 border-b border-gray-100 ">
            <li className="relative">
              <button
                className={
                  displayedSection === "Profile"
                    ? `after:absolute after:content-[" "] after:top-[54px] after:left-0 after:w-full after:h-[3px] after:bg-red-600 transition`
                    : null
                }
                onClick={(e) => setDisplayedSection(e.target.textContent)}
              >
                Profile
              </button>
            </li>
            <li className="relative">
              <button
                className={
                  displayedSection === "Applied"
                    ? `after:absolute after:content-[" "] after:top-[54px] after:left-0 after:w-full after:h-[3px] after:bg-red-600 transition`
                    : null
                }
                onClick={(e) => setDisplayedSection(e.target.textContent)}
              >
                Applied
              </button>
            </li>
            <li className="relative">
              <button
                className={
                  displayedSection === "Bookmarks"
                    ? `after:absolute after:content-[" "] after:top-[54px] after:left-0 after:w-full after:h-[3px] after:bg-red-600 transition`
                    : null
                }
                onClick={(e) => setDisplayedSection(e.target.textContent)}
              >
                Bookmarks
              </button>
            </li>
          </ul>
        </nav>
        <div className="w-full">
          {displayedSection === "Profile" ? (
            <ProfileInfos user={user} />
          ) : displayedSection === "Applied" ? (
            <ApplicationsInfos applications={applications} />
          ) : (
            <BookmarksInfos bookmarks={bookmarks} />
          )}
        </div>
      </div>
    </div>
  );
}
