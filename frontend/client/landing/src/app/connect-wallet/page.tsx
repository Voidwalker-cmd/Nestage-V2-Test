import GoBackBtn from "@/components/molecules/GoBackBtn"
import ModalDetails from "@/components/molecules/ModalDetails"

export default function Page() {
  return (
    <div className="relative lg:h-screen bg-[#021009]">
      <div
        className="text-white fixed -top-48 -right-48 w-[600px] h-[600px] bg-gradient-radial from-[#0B4B29] via-transparent to-transparent opacity-50 rounded-full pointer-events-none"
      ></div>
      <GoBackBtn/>
      <div
        className="flex justify-center items-center lg:items-center w-full h-full border-none lg:border rounded-lg py-3 lg:py-10">
        <ModalDetails/>
      </div>
    </div>
  );
}
