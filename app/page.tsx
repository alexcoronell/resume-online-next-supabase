import Image from "next/image";
import getPersonalData from "@/core/services/personal-data.service";

export default async function Index() {
  const personalData = await getPersonalData();

  return (
    <article className="w-full p-4 overflow-y-scroll h-full no-scrollbar">
      <div className="h-full lg:grid lg:grid-cols-3 lg:items-center lg:gap-x-12">
        <div className="w-[328px] h-[328px] overflow-hidden relative mx-auto xl:w-[400px] xl:h-[400px]">
          <Image
            src={personalData.image}
            alt={
              personalData.firstname +
              " " +
              personalData.lastname +
              " profile image"
            }
            fill={true}
            priority={true}
            className="profileImage"
          />
        </div>
        <div className="lg:col-span-2 lg:pl-6">
          <h1 className="py-3 lg:text-left xl:text-8xl">
            {personalData.firstname} {personalData.lastname}
          </h1>
          <h2 className="mb-3 lg:text-left">{personalData.title}</h2>
          <p className="text-center leading-7 lg:text-left">{personalData.description}</p>
        </div>
      </div>
      {/* <img src={personalData.image} alt="test" /> */}
    </article>
  );
}
