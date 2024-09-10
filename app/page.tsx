import { Header } from "@/components/landingpage/Header"
import { Navbar } from "@/components/landingpage/Navbar"
import { About } from "@/components/landingpage/About"
import { Feature } from "@/components/landingpage/Feature"
import { FrequentlyAskedQuestion } from "@/components/landingpage/FAQ"
import { Footer } from "@/components/landingpage/Footer"

export default function Home(){
  return (
    <div>
      <Navbar />
      <Header />
      <About  />
      <Feature />
      <FrequentlyAskedQuestion />
      <Footer />
    </div>
  )
}