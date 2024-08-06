import { useNavigate } from "react-router-dom";

export default function Applied({ applications }) {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {applications.length > 0 ? (
        applications.map((application) => (
          <div
            className="flex items-center gap-4 p-4 border-b border-gray-400 cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/offers/${application.id}`)}
            key={application.id}
          >
            <p className="application-text">
              {new Date(application.created_at).toDateString()}
            </p>
            <p className="application-text">{application.company_name}</p>
            <p className="application-text">{application.title}</p>
            <p className="application-text">{application.sector}</p>
            <p className="hidden application-text sm:block">
              {application.salary}
            </p>
            <p className="application-text">{application.location}</p>
          </div>
        ))
      ) : (
        <p className="mt-4">You didn't applied for any offers</p>
      )}
    </div>
  );
}
