"use client"
import Explore from "@/components/organisms/Explore"
import Faqs from "@/components/organisms/Faqs"
import Features from "@/components/organisms/Features"
import Hero from "@/components/organisms/Hero"
import Mission from "@/components/organisms/Mission"
import Nav from "@/components/organisms/Nav"
import Technology from "@/components/organisms/Technology"

import Image from "next/image"
import {Static} from "@/assets/image"

const Index = () => {

    return (
        <div>
            <Nav/>
            <Hero/>
            <Features/>
            <Explore/>
            <Technology/>
            <Faqs/>
            <div id="roadMap" className="container mx-auto px-5 w-full py-20 flex justify-center items-center">
                <div className="flex flex-col gap-2">
                    <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="300"
                        className="font-primary text-xl font-bold text-white md:text-3xl w-full flex justify-center pb-5">
                        Nestage Roadmap
                    </h2>
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="300">
                        <Image src={Static.roadMap} alt="RoadMap" width="550"
                               height="460"/>
                    </div>
                </div>
            </div>
            <Mission/>
        </div>
    )
}

export default Index