import { Wrapper } from '@/components/Wrapper';
import { SocialLinks } from '@/components/SocialLinks';
import { DownloadCV } from '@/components/DownloadCV';
import Image from 'next/image';
import Cat from '../../public/assets/cat.gif';
import { ButtonAnimated } from '@/components/ButtonAnimated';
import { Lang } from '@/components/Lang';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <Lang />
      <Wrapper>
        <ButtonAnimated name="Frontend Developer" />
        <h1 className="text-4xl font-bold mb-2 text-left relative">
          Transforming Ideas
          <br /> into<strong className="text-sky-500"> Reality</strong>
          <Image
            height={100}
            width={100}
            src={Cat}
            alt="cat"
            className="absolute bottom-0 right-0 -z-10"
          />
        </h1>

        {/* description */}
        <p className="text-lg text-justify mb-2">
          I am a Frontend Developer with experience in building web applications
          using React, Next.js, and Tailwind CSS. I am passionate about learning
          new technologies and sharing knowledge with others.
        </p>
        <DownloadCV />
        {/* social links */}
        <div className="mt-4 items-center h-min flex gap-1">
          <p className="mr-2">Social Links:</p>
          <SocialLinks />
        </div>
      </Wrapper>
    </main>
  );
}
