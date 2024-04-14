import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Switch } from '../ui/switch';

export const HeaderMain: React.FC = () => {
  return (
    <header className="container backdrop-blur-sm p-4">
      <nav className="border-gray-200 bg-gray-200 h-18 rounded-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              width={40}
              height={38}
              src="/logo.png"
              className="bg-contain rounded-full"
              alt="Logo"
            />
            <span className="text-2xl font-semibold text-sky-900">
              Anderson Kauêr
            </span>
          </div>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-semibold flex flex-col rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse  md:bg-white">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-blue bg-gray-200"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="block py-2 px-3 text-black hover:bg-gray-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-black hover:bg-gray-200"
                >
                  Posts
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-black hover:bg-gray-200"
                >
                  Contact
                </Link>
              </li>
              <span className="bg-transparent grid items-center relative">
                <Switch className=" relative -right-2" />
              </span>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
