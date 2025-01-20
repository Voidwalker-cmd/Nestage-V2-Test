const Footer = () => {
  return (
    <div className="sticky z-0 bottom-0 left-0 w-full h-60 lg:h-80 bg-white flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-full flex flex-col justify-start px-12 text-right items-end py-10 lg:py-12 text-[#021009]">
            <div className="flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-sm md:text-lg">
              <ul>
                <li className="hover:underline cursor-pointer">Home</li>
                <li className="hover:underline cursor-pointer">Docs</li>
                <li className="hover:underline cursor-pointer">Terms</li>
                <li className="hover:underline cursor-pointer">Campaign</li>
              </ul>
              <ul>
                <li className="hover:underline cursor-pointer">Email</li>
                <li className="hover:underline cursor-pointer">Telegram</li>
                <li className="hover:underline cursor-pointer">X (Twitter)</li>
              </ul>
            </div>
          <div>
            <p className="block text-left pt-2">2025 &copy; Nestage.io. All Right Reserved.</p>
          </div>
          <h2 className="absolute bottom-0 left-0 lg:left-1 translate-y-1/3 lg:text-[180px] text-[80px] text-[#8CC34B] font-calendas">
            Nestage
          </h2>
        </div>
      </div>
  )
}

export default Footer