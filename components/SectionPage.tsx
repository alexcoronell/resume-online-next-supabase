import styles from "../styles/section-page.module.css";

/* Props */
interface SectionPageProps {
  titlePage: string;
  children: React.ReactNode;
}

export default function SectionPage({ titlePage, children }: SectionPageProps) {
  return (
    <div className={styles.SectionPage}>
      <h1>{titlePage}</h1>
      <section className="no-scrollbar">{children}</section>
    </div>
  );
}
