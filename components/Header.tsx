export default function Header() {

  const menu = [
    {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Portfolio',
      url: '/portfolio'
    },
    {
      title: 'Studies',
      url: '/studies'
    },
    {
      title: 'Training',
      url: '/training'
    },
    {
      title: 'Experiences',
      url: '/experiences'
    },
    {
      title: 'Contact',
      url: '/contact'
    },
  ]

  return (
    <header>
      <button>Open/Close Menu</button>
      <nav>
        <ul>
          {
            menu.map((item, index) => (
              <li key={index}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}
