import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="block md:justify-between pt-20 px-9 md:flex w-full">
        <div className='flex justify-center mb-10'>
            <h2 className="text-xl font-bold text-white">Top Artists</h2>
        </div>
        <ul className="flex justify-evenly mx-auto md:mx-0 md:space-x-7">
            <li>
                <Link href="" passHref legacyBehavior className="cursor-pointer">
                    <button className="nav">All Time</button>
                </Link>
            </li>
            <li>
                <Link href="#">
                    <button className="nav">Last 6 Months</button>
                </Link>
            </li>
            <li>
                <Link href="#">
                    <button className="nav">Last 4 Weeks</button>
                </Link>
            </li>
        </ul>
    </nav>
  )
}
