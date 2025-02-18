import {Static} from "@/assets/image";
import Image from "next/image";
import ConnectWallet from "../molecules/ConnectWallet";
import useDeviceSize from "@/hooks/useMediaQuery"

const Mission = () => {
    const size = useDeviceSize()
    return (
        <>
            <section
                className="overflow-hidden flex flex-col-reverse lg:grid lg:grid-cols-2 items-center justify-center py-5 lg:py-10 lg:pr-5">
                <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-xl text-center sm:text-left">
                        <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="300"
                            className="font-primary text-2xl font-bold text-white md:text-3xl">
                            Nestage Mission
                        </h2>

                        <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="300"
                           className="text-white mt-4 block">
                            Nestages mission is to empower individuals to earn passive income
                            through referrals and smart staking, leveraging blockchain
                            technology. The platform aims to revolutionize affiliate marketing
                            and staking by providing innovative, secure, and transparent
                            solutions that align with users financial goals. Nestage combines
                            affiliate marketing with blockchain benefits, offering lucrative
                            referral programs, secure transactions, and user-friendly
                            interfaces. Its goal is to help users unlock financial potential,
                            achieve wealth-building goals, and explore opportunities in the
                            digital asset space.
                        </p>

                        <div className="mt-4 md:mt-8">
                            <ConnectWallet state="fill"/>
                        </div>
                    </div>
                </div>

                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="300"
                     className="flex justify-center sm:flex sm:items-center sm:justify-end sm:rounded-[30px] md:rounded-[60px]">
                    <Image
                        width={size === "sm" ? 150 : 250}
                        height={size === "sm" ? 150 : 250}
                        alt="Nestage CtaImg"
                        src={Static.Customer}
                        className="block  h-[70%] w-[80%] object-cover sm:h-[calc(100% - 2rem)] md:h-[calc(100% - 4rem)] md:rounded-[60px]"
                    />
                </div>
            </section>
        </>
    );
};

export default Mission;
