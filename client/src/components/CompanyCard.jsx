export default function CompanyCard({ company }) {
  console.log(company);
  return (
    <article className="w-full md:w-[25rem] h-[18rem] bg-gray-200 p-4 rounded-lg flex flex-col gap-2">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <p>{company.location}</p>
    </article>
  );
}
