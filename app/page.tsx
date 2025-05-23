import Image from "next/image";

/* Data */
import {getProfile} from "@/core/services/profile.service";

/* Models */
import { Profile } from '../core/models/Profile.interface';

/* Styles */
import styles from "../styles/home.module.css";

export default async function Index() {
  const profile: Profile = await getProfile();
  
  return (
    <article className={styles.Home + " no-scrollbar"}>
      <div className={styles.Home__container}>
        <div className={styles.Home__imageArea}>
          <Image
            src={profile.image}
            alt={profile.firstname + " " + profile.lastname + " profile image"}
            fill={true}
            priority={true}
            className="profileImage"
          />
        </div>
        <div className={styles.Home__detail}>
          <h1>
            {profile.firstname} {profile.lastname}
          </h1>
          <h2>{profile.title}</h2>
          <p>{profile.description}</p>
        </div>
      </div>
    </article>
  );
}
