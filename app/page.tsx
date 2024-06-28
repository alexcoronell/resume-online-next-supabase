import Image from "next/image";
import { cookies } from "next/headers";

/* Data */
import getPersonalData from "@/core/services/personal-data.service";

/* Styles */
import styles from "../styles/home.module.css";

export default async function Index() {
  const { firstname, lastname, title, image, description } =
    await getPersonalData();
  let finalImage = "";
  if (image) {
    finalImage = await image;
  }
  return (
    <article className={styles.Home + " no-scrollbar"}>
      <div className={styles.Home__container}>
        <div className={styles.Home__imageArea}>
          <Image
            src={finalImage}
            alt={firstname + " " + lastname + " profile image"}
            fill={true}
            priority={true}
            className="profileImage"
          />
        </div>
        <div className={styles.Home__detail}>
          <h1>
            {firstname} {lastname}
          </h1>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}
