import { useLoaderData } from "react-router-dom";
import CompanyCard from "../components/CompanyCard";

export const loader = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/companies`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("error while getting companies");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default function CompaniesPage() {
  const companies = useLoaderData();

  return (
    <div className="wrapper">
      <section>
        <h1>Discover all companies</h1>
        <div className="flex flex-col gap-4 mt-8 md:mt-16 sm:flex-row sm:flex-wrap">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>
    </div>
  );
}
