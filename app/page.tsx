import { Header } from "./components/Header"
import { Navbar } from "./components/Navbar"
import { About } from "./components/About"
import { Feature } from "./components/Feature"
import { FrequentlyAskedQuestion } from "./components/FAQ"
import { Footer } from "./components/Footer"

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