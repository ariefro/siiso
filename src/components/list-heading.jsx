import Link from 'next/link';

export default function ListHeading({ title, href }) {
  return (
    <div className='flex items-center justify-between mb-10'>
      <h3 className='text-white font-extrabold text-xl capitalize'>{title}</h3>
      <Link href={href}>
        <button className='button'>see more</button>
      </Link>
    </div>
  );
}
