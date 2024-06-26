import getPersonalData from "@/core/services/personal-data.service";

export default async function Index() {
  const personalData = await getPersonalData();

  return (
    <article>
      <h1>
        {personalData.firstname} {personalData.lastname}
      </h1>
      <h2>{personalData.title}</h2>
      <p>{personalData.description}</p>
      <img
        src={personalData.image}
        alt={
          personalData.firstname +
          " " +
          personalData.lastname +
          " profile image"
        }
      />
    </article>
  );
}
