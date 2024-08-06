import { useState } from "react";
import ProfileInfos from "../components/profile/ProfileInfos";
import { useLoaderData } from "react-router-dom";
import ApplicationsInfos from "../components/profile/ApplicationsInfos";
import BookmarksInfos from "../components/profile/BookmarksInfos";

export const loader = async () => {
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
};

export default function ProfilePage() {
  const [displayedSection, setDisplayedSection] = useState("Profile");

  const { user, applications, bookmarks } = useLoaderData();

  return (
    <div className="wrapper">
      <section>
        <img className="w-24 h-24" src={user.avatar} alt="profil picture" />
        <h1 className="mt-4">{`${user?.firstname} ${user?.lastname}`}</h1>
        <p className="mt-6">{user?.email}</p>
      </section>
      <div className="mt-6">
        <nav>
          <ul className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <li className="relative">
              <button
                className={
                  displayedSection === "Profile"
                    ? `after:absolute after:content-[" "] after:top-[54px] after:left-0 after:w-full after:h-[3px] after:bg-red-600 transition`
                    : null
                }
                onClick={(e) => setDisplayedSection(e.target.innerText)}
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
                onClick={(e) => setDisplayedSection(e.target.innerText)}
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
                onClick={(e) => setDisplayedSection(e.target.innerText)}
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
