import Link from "next/link";

const Footer = () => {
  return (
    <footer className="sticky z-0 bottom-0 left-0 w-full h-60 lg:h-80 bg-white flex justify-center items-center">
      <div
        className="relative overflow-hidden w-full h-full flex flex-col justify-start px-12 py-10 lg:py-12 text-right items-end text-[#021009]">

        <nav className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm md:text-lg">
          <ul>
            <li className="hover:underline cursor-pointer"><Link href="/">Home</Link></li>
            <li className="hover:underline cursor-pointer">
              <a href="/docs/documentation.pdf" target="_blank" rel="noopener noreferrer">Docs</a>
            </li>
            <li className="hover:underline cursor-pointer"><a
              href="/docs/nestageT&C.pdf" target="_blank" rel="noopener noreferrer">Terms of use</a></li>
            <li className="hover:underline cursor-pointer"><Link href="/campaign">Campaign</Link></li>
          </ul>
          <ul>
            <li className="hover:underline cursor-pointer">
              <a href="https://t.me/nestage" target="_blank" rel="noopener noreferrer">Telegram</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="https://twitter.com/IoNestage" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="https://youtube.com/@ionestage?si=bwJg5JS-I-KK2vwa" target="_blank"
                 rel="noopener noreferrer">YouTube</a>
            </li>
          </ul>
        </nav>

        <p className="block text-left pt-2">2025 &copy; Nestage.io. All Rights Reserved.</p>

        <h2
          className="absolute bottom-0 left-0 lg:left-1 translate-y-1/3 lg:text-[180px] text-[80px] text-[#8CC34B] font-calendas">
          Nestage
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
