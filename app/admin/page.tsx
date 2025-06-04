import Link from 'next/link';
import SectionPage from '@/components/SectionPage';

import styles from '../../styles/admin-page.module.css';

export default async function AdminPage() {
  const titlePage = 'Admin menu';
  const menu = [
    { title: 'Profile', url: '/admin/profile' },
    { title: 'Portfolio', url: '/admin/portfolio' },
    { title: 'Studies', url: '/admin/studies' },
    { title: 'Trainings', url: '/admin/trainings' },
    { title: 'Institutes', url: '/admin/institutes' },
    { title: 'Experiences', url: '/admin/experiences' },
    { title: 'Contact', url: '/admin/contact' },
    { title: 'Pages', url: '/admin/pages' },
  ];
  return (
    <SectionPage titlePage={titlePage}>
      <main className={styles.AdminPage}>
        <nav className={styles.AdminPage__nav} >
          <ul className={styles.AdminPage__list}>
            {menu.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li className={styles.AdminPage__item} key={index}>
                <Link className={styles.AdminPage__link} href={item.url}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </SectionPage>
  );
}
