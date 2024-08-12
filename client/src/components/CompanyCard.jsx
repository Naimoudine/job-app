import { useNavigate } from "react-router-dom";

export default function CompanyCard({ company }) {
  const navigate = useNavigate();

  return (
    <article
      className="w-full md:w-[25rem] bg-gray-200 p-4 rounded-lg flex flex-col gap-2"
      onClick={() => navigate(`/companies/${company.id}`)}
    >
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <p>
        <span className="font-semibold">Capital : </span>
        {company.capital}
      </p>
      <p>
        <span className="font-semibold">Date of create :</span>{" "}
        {new Date(company.creation_date).toDateString()}
      </p>
      <p>
        <span className="font-semibold">Location : </span>
        {company.location}
      </p>
    </article>
  );
}
