import Image from "next/image";
import { cookies } from "next/headers";

/* Data */
import getPersonalData from "@/core/services/personal-data.service";

/* Models */
import { PersonalData } from '../core/models/PersonalData.interface';

/* Styles */
import styles from "../styles/home.module.css";

export const revalidate = 30;

export default async function Index() {
  const personalData: PersonalData = await getPersonalData();
  
  return (
    <article className={styles.Home + " no-scrollbar"}>
      <div className={styles.Home__container}>
        <div className={styles.Home__imageArea}>
          <Image
            src={personalData.image}
            alt={personalData.firstname + " " + personalData.lastname + " profile image"}
            fill={true}
            priority={true}
            className="profileImage"
          />
        </div>
        <div className={styles.Home__detail}>
          <h1>
            {personalData.firstname} {personalData.lastname}
          </h1>
          <h2>{personalData.title}</h2>
          <p>{personalData.description}</p>
        </div>
      </div>
    </article>
  );
}
