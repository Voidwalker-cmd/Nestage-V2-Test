import { Static } from "@/assets/image";
import Image from "next/image";

const Preloader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-85 z-50">
            <div className="flex items-center justify-center">
                <Image
                    src={Static.Loader}
                    alt="Loading Spinner"
                    className="w-16 h-16"
                    width={32}
                    height={32}
                />
            </div>
        </div>
    );
};

export default Preloader;
