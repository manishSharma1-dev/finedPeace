import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export const FrequentlyAskedQuestion:React.FC = () => {
    return (
      <div className="gridlinesdesign">  
        <div className="pt-10 pb-10 pl-60 pr-60 xs:px-10 sm:px-12 lg:px-20 xl:px-32 2xl:px-48 3xl:px-60 4xl:px-96 6xl:pl-[40rem] 6xl:pr-[40rem]  6xl:py-16 7xl:pl-[60rem] 7xl:pr-[60rem] 7xl:py-40">
            <h1 className="font-bold text-xl pb-10 xs:text-4xl sm:text-5xl lg:text-3xl 4xl:text-5xl 6xl:text-6xl 7xl:text-8xl">FAQ</h1>
            <Accordion type="single" collapsible>

              <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <p className=" xs:text-xl sm:text-3xl lg:text-xl 4xl:text-3xl 6xl:text-5xl 7xl:text-6xl">Why should I use it ?</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="xs:text-lg sm:text-2xl lg:text-xl 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl"> Simple, no Judgement by anyone, Social media often comes with expectations, judgments, and validation in the form of likes and comments. </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <p className="xs:text-xl sm:text-3xl lg:text-xl 4xl:text-3xl 6xl:text-5xl 7xl:text-6xl">WhyIs there engagement ?</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="xs:text-lg sm:text-3xl lg:text-xl 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl">just pure anonymity,no followers,no likes...</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <p className="xs:text-xl sm:text-3xl lg:text-xl 4xl:text-3xl 6xl:text-5xl 7xl:text-6xl">Can I delete my words ?</p>
                    </AccordionTrigger>
                    <AccordionContent> 
                      <p className="xs:text-lg sm:text-3xl lg:text-xl 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl">Yes, you have full control over your words.</p>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
      </div>  
    )
}


