import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LinkedinIcon } from 'lucide-react';

export const SocialLinks = () => {
  const links = [
    {
      href: 'https://github.com/Andersonk01/',
      imageSrc: '/assets/github.svg',
      alt: 'GitHub',
      icon: null,
    },
    {
      href: 'https://www.linkedin.com/in/anderson-kauer/',
      imageSrc: null,
      alt: null,
      icon: <LinkedinIcon color="black" strokeWidth={1} size={20} />,
    },
  ];

  return (
    <>
      {links.map((link, index) => (
        <Link
          key={index}
          target="_blank"
          href={link.href}
          className="hover:-translate-y-1 hover:rotate-12 hover:scale-110"
        >
          {link.imageSrc && (
            <Image
              src={link.imageSrc}
              width={20}
              height={20}
              alt={link.alt}
              className="hover:translate-x-1 hover:rotate-12 hover:scale-110"
            />
          )}
          {link.icon}
        </Link>
      ))}
    </>
  );
};
