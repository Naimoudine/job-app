import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRevalidator } from "react-router-dom";

export default function ProfilePicModal({ showPicModal, setShowPicModal }) {
  const [selectedPic, setSelectedPic] = useState();

  const { auth } = useAuth();
  const revalidator = useRevalidator();

  const uploadPicture = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${auth.id}`,
        {
          method: "put",
          body: formData,
        }
      );
      if (response.status !== 204) {
        throw new Error("error while downloading picture");
      }
      setShowPicModal(false);
      return revalidator.revalidate();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div
      className={
        showPicModal
          ? `absolute top-0 left-0 flex items-center justify-center w-full h-full overflow-y-hidden z-[10000] bg-black/70 px-4`
          : `hidden`
      }
    >
      <section className="p-4 bg-gray-200 rounded-lg">
        <h1 className="text-xl">Profil picture</h1>
        <div
          className="h-[15rem] w-[15rem] mx-auto my-4 border border-gray-600 rounded-lg"
          style={{ background: `url('${selectedPic}') center/cover` }}
          alt="selected profil picture"
        />
        <form onSubmit={uploadPicture}>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedPic(file ? URL.createObjectURL(file) : undefined);
            }}
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 border border-gray-600 rounded-lg"
              type="button"
              onClick={() => setShowPicModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white rounded-lg bg-zinc-900"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
