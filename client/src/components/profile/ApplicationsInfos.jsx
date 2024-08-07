import { useNavigate, useOutletContext } from "react-router-dom";

export default function Applied({ applications }) {
  const navigate = useNavigate();
  const { setShowCancelModal, setOfferId } = useOutletContext();

  const handleCancel = (id) => {
    setShowCancelModal(true);
    setOfferId(id);
  };

  return (
    <div className="w-full">
      {applications.length > 0 ? (
        applications.map((application) => (
          <div
            className="flex items-center justify-between p-4 border-b border-gray-400 cursor-pointer hover:bg-gray-200"
            key={application.id}
          >
            <div
              className="flex items-center gap-4 "
              onClick={() => navigate(`/offers/${application.id}`)}
            >
              <p className="application-text">
                {new Date(application.created_at).toDateString()}
              </p>
              <p className="application-text">{application.company_name}</p>
              <p className="application-text">{application.title}</p>
              <p className="hidden sm:block application-text">
                {application.sector}
              </p>
              <p className="hidden application-text sm:block">
                {application.salary}
              </p>
              <p className="hidden sm:block application-text">
                {application.location}
              </p>
            </div>
            <button
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-400"
              onClick={() => handleCancel(application.offerId)}
            >
              cancel
            </button>
          </div>
        ))
      ) : (
        <p className="mt-4">You didn't applied for any offers</p>
      )}
    </div>
  );
}
