import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, title, Icon, className }) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`${className} flex items-center h-20 text-xs relative ${
          pathname == href ? 'active-nav' : 'text-gray-400'
        }`}
      >
        <button
          className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mx-auto md:ml-6 ${
            pathname == href
              ? 'text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {<Icon />}
          <p>{title}</p>
        </button>
        {pathname == href && (
          <div className='absolute w-1 h-full bg-green-400'></div>
        )}
      </Link>
    </li>
  );
}
