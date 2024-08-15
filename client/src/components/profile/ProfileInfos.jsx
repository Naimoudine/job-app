import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

export default function ProfileInfos({ user }) {
  const [edit, setEdit] = useState(false);

  const { auth } = useAuth();
  const revalidator = useRevalidator();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${auth.id}/profile`,
        {
          method: "put",
          body: formData,
        }
      );

      if (response.status !== 204) {
        toast.error(
          "Error while downloading cv! Please check the format and try again.",
          {
            position: "top-left",
          }
        );
        throw new Error("error while editing profile informations");
      }
      setEdit(false);
      toast.success("Your profile has been changed.", {
        position: "top-left",
      });
      return revalidator.revalidate();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="w-full mt-6">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="firstname">
            firstname
          </label>
          {edit ? (
            <input
              type="text"
              className="px-2 py-1 border-2 rounded-lg border-gray400 w-fit"
              name="firstname"
              id="firstname"
            />
          ) : (
            <p>{user?.firstname}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold" htmlFor="lastname">
            lastname
          </label>
          {edit ? (
            <input
              type="text"
              className="px-2 py-1 border-2 rounded-lg border-gray400 w-fit"
              name="lastname"
              id="lastname"
            />
          ) : (
            <p>{user?.lastname}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold" htmlFor="email">
            email
          </label>
          {edit ? (
            <input
              type="text"
              className="px-2 py-1 border-2 rounded-lg border-gray400 w-fit"
              name="email"
              id="email"
            />
          ) : (
            <p>{user?.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold" htmlFor="cv">
            cv
          </label>
          {edit ? (
            <input type="file" className=" w-fit" name="file" id="cv" />
          ) : (
            <p>{user?.cv?.slice(22)}</p>
          )}
        </div>
        {edit ? (
          <div className="flex mt-4">
            <button
              className="px-4 py-2 text-black bg-gray-300 rounded-xl hover:bg-gray-300/70"
              type="button"
              onClick={() => setEdit(false)}
            >
              cancel
            </button>
            <button
              className="px-4 py-2 ml-4 rounded-xl bg-zinc-900 text-neutral-100 hover:bg-zinc-900/70"
              type="submit"
            >
              save
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 mt-4 rounded-xl bg-zinc-900 text-neutral-100 hover:bg-zinc-900/70"
            type="button"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
