import { useState } from "react";
import {
  redirect,
  useLoaderData,
  useNavigation,
  Link,
  Form,
  useLocation,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export async function loader({ params }) {
  const currUser = JSON.parse(localStorage.getItem("user"));
  try {
    if (currUser) {
      const [offerData, userData, applicationsData] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/offers/${params.id}`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/users/${currUser.id}`, {
          credentials: "include",
        }),
        fetch(
          `${import.meta.env.VITE_API_URL}/users/${currUser.id}/applications`,
          {
            credentials: "include",
          }
        ),
      ]);

      if (!offerData.ok || !userData.ok || !applicationsData.ok) {
        throw new Error("error while getting data");
      }

      const [offer, user, applications] = await Promise.all([
        offerData.json(),
        userData.json(),
        applicationsData.json(),
      ]);

      return { offer, user, applications };
    } else {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/offers/${params.id}`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("error while getting offer");
      }
      return { offer: data };
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function action({ request, params }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = await request.formData();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${user.id}/applications/${
        params.id
      }`,
      {
        method: "post",
        body: formData,
      }
    );
    if (response.status !== 201) {
      throw new Error("Error while applying to offer");
    }
    toast.success("You successfuly applied to this offer !", {
      position: "top-right",
      icon: "🚀",
    });
    return redirect(`/offers/${params.id}`);
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function OfferPage() {
  const { offer, user, applications } = useLoaderData();
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const isSubmitting = navigation.state === "submitting";

  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="wrapper">
      <h1>{offer.title}</h1>
      <Link
        className="inline-block mt-4 md:mt-6"
        to={`/companies/${offer.company_id}`}
      >
        <span className="text-sm font-semibold text-gray-600">
          {offer.company_name}
        </span>
        , <span className="text-sm text-gray-600">{offer.location}</span>
      </Link>
      <section className="mt-6 md:mt-8">
        <h2>Job description</h2>
        <p className="mt-4">{offer.description}</p>
      </section>
      <section className="w-full mt-6 md:mt-8">
        <h3>Apply</h3>
        {user ? (
          applications.find(
            (application) => application?.offerId === offer.id
          ) ? (
            <p className="mt-6 font-semibold text-green-600">
              You already applied to this offer
            </p>
          ) : (
            <Form
              className="w-full p-6 mt-4 bg-gray-200 rounded-lg sm:mt-6 sm:max-w-[60rem] "
              method="post"
              encType="multipart/form-data"
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <input
                  className="applyFormInput"
                  type="text"
                  name="firstname"
                  id="firstnam"
                  placeholder="Firstname"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                  className="applyFormInput"
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Lastname"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center gap-4 mt-4 sm:flex-row">
                <input
                  className="applyFormInput"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="applyFormInput"
                  type="file"
                  name="file"
                  id="file"
                  required
                />
              </div>
              <button
                className="w-full px-4 py-2 mt-4 rounded-lg bg-zinc-900 text-neutral-100 sm:w-fit disabled:bg-zinc-900/60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Applying..." : "Apply"}
              </button>
            </Form>
          )
        ) : (
          <section className="w-full p-4 mt-8 text-center bg-gray-200 rounded-lg sm:mt-16 sm:max-w-[50rem] sm:mx-auto">
            <h2>Connect to apply</h2>
            <div className="flex justify-center w-full gap-4 mt-4">
              <Link
                className="px-4 py-2 rounded-lg bg-zinc-900 text-neutral-100"
                to={`/signin?redirectTo=${pathname}`}
              >
                SignIn
              </Link>
              <Link
                className="px-4 py-2 rounded-lg bg-neutral-100 text-zinc-900"
                to={`/signup`}
              >
                SignUp
              </Link>
            </div>
          </section>
        )}
      </section>
      <ToastContainer />
    </div>
  );
}
