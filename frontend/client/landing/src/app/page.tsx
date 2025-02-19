import HomePage from "../components/pages/Home/Index";
import Footer from "../components/organisms/Footer";

export default function Home() {
  return (
    <div className="">
      <div className="relative h-auto bg-[#021009] z-10 overflow-auto">
        <div
          className="text-white absolute -top-48 -right-48 w-[600px] h-[600px] bg-gradient-radial from-[#0B4B29] via-transparent to-transparent opacity-50 rounded-full pointer-events-none"
        ></div>
        <HomePage/>
      </div>
      <Footer/>
    </div>
  )
}