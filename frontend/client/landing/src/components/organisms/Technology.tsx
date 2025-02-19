import {Static} from "@/assets/image";
import {Button} from "../ui/button"
import Image from 'next/image';

const Technology = () => {
    return (
        <div className="py-20 mt-10">
            <div className="relative">
                <div className="container mx-auto px-10 flex flex-col items-center justify-center gap-5">
                    <div className="flex flex-col items-center gap-5">
                        <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="100"
                            className="text-white font-bold z-10 tracking-wider text-2xl lg:text-3xl">The Technology of
                            smart contracts</h2>
                        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" data-aos-offset="90"
                             className="max-w-2xl flex flex-col items-center justify-center gap-5">
                            <p className="text-white text-center z-10">
                                Nestages decentralized matrix is an additional earning structure that allows
                                participants to earn rewards from their direct downlines, second-level downlines,
                                third-level downlines, and spillovers. It is a structure based on the activity and
                                growth of your network. You can maximize your earning and build a sustainable income
                                stream within the Nestage platform by actively engaging your community and leveraging
                                the matrix system.
                            </p>
                            <Button
                                className="z-10 mt-5 hover:bg-[#EF9414] hover:text-white bg-[#EF9414] text-white rounded-lg border border-gray-500 py-2 text-semibold">
                                <a href="https://youtube.com/shorts/etJ5JDVNnxw?si=CPkAj3Vzm4F3EhT-" target="_blank">Learn
                                    More</a>
                            </Button>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="100"
                         className="lg:relative hidden lg:flex justify-center w-full pt-16">
                        <div
                            className="hidden lg:inline-block  top-0 rounded-[100%] w-[calc(100vw-30%)] h-[500px] bg-[radial-gradient(circle,#094726,#000F08)]"></div>
                        <Image className="absolute bottom-8 z-10" src={Static.MacBook} alt="macbook" width={500}
                               height={500}/>
                        <p className="absolute bottom-2 text-center text-white">Nestage provides an intuitive platform
                            for easy navigation, from signing up to managing staking and tracking progress.</p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="100"
                         className="flex lg:hidden flex-col items-center justify-center gap-5 my-5">
                        <Image className="relative z-10" src={Static.MacBook} alt="macbook" width={500} height={500}/>
                        <p className="relative z-10 text-center text-white">Nestage provides an intuitive platform for
                            easy navigation, from signing up to managing staking and tracking progress.</p>
                    </div>
                </div>
                <div className="absolute -top-9 right-0">
                    <Image src={Static.Planet} alt="planet" width={550} height={550}/>
                </div>
            </div>
        </div>
    )
}

export default Technology