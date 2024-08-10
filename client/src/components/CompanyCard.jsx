export default function CompanyCard({ company }) {
  return (
    <section>
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <p>{company.location}</p>
    </section>
  );
}
