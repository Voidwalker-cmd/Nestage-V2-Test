const Features = () => {
    return (
        <div className="py-20">
            <div className="flex justify-center relative container mx-auto px-4 py-20 lg:py-20 text-center">
                <div className="z-10">
                    <div>
                        <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-offset="100"
                            className="tracking-widest text-base lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8CC34B] via-[#FFEB3B] to-[#8CC34B]">
                            Our Foundational Features
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 px-4 md:px-12 lg:px-24 py-14 lg:py-20">
                        {/* Card 1 */}
                        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-offset="100"
                             className="bg-orange-500 text-white rounded-t-3xl shadow-lg overflow-hidden border-2 border-orange-500">
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-offset="100"
                                 className=" text-center py-10">
                                <h3 className="text-xl font-bold">Smart Contracts</h3>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300"
                                 className="px-9 py-16 text-center tracking-wide rounded-t-3xl bg-black">
                                <p>
                                    Nestage utilizes smart contracts for self-executing agreements,
                                    enabling automated transactions without the need for a third
                                    party.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-offset="100"
                             className="bg-red-500 text-white rounded-t-3xl shadow-lg overflow-hidden border-2 border-red-500">
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-offset="100"
                                 className=" text-center py-10">
                                <h3 className="text-xl font-bold">Direct Fund Access</h3>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300"
                                 className="px-9 py-16 text-center tracking-wide rounded-t-3xl bg-black">
                                <p>
                                    Participants have access to their funds directly through their
                                    personal crypto wallets, and all rewards are instantly credited
                                    to their wallets.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-offset="100"
                             className="bg-red-500 text-white rounded-t-3xl shadow-lg overflow-hidden border-2 border-red-500">
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-offset="100"
                                 className=" text-center py-10">
                                <h3 className="text-xl font-bold">User-Friendly Interface</h3>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300"
                                 className="px-9 py-16 text-center tracking-wide rounded-t-3xl bg-black">
                                <p className="pb-6">
                                    Nestage provides an intuitive platform for easy navigation, from
                                    signing up to managing staking and tracking progress.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="hidden lg:inline-block absolute top-0 rounded-[100%] w-[calc(100vw-20%)] h-[700px] bg-[radial-gradient(circle,#094726,#000F08)]"></div>

            </div>
        </div>
    )
}

export default Features