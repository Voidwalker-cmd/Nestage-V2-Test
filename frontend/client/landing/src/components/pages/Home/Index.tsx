"use client"
import Explore from "@/components/organisms/Explore"
import Faqs from "@/components/organisms/Faqs"
import Features from "@/components/organisms/Features"
import Hero from "@/components/organisms/Hero"
import Mission from "@/components/organisms/Mission"
import Nav from "@/components/organisms/Nav"
import Technology from "@/components/organisms/Technology"

const Index = () => {

    return (
        <div>
            <Nav />
            <Hero />
            <Features />
            <Explore />
            <Technology />
            <Faqs />
            <Mission />
        </div>
    )
}

export default Index