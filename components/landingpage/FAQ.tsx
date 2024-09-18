import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export const FrequentlyAskedQuestion:React.FC = () => {
    return (
      <div className="gridlinesdesign">  
        <div className="pt-10 pb-10 pl-60 pr-60">
            <h1 className="font-bold text-xl pb-10">FAQ</h1>
            <Accordion type="single" collapsible>

              <AccordionItem value="item-1">
                    <AccordionTrigger>Why should I use it ?</AccordionTrigger>
                    <AccordionContent>
                    Simple, no Judgement by anyone, Social media often comes with expectations, judgments, and validation in the form of likes and comments. 
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Is there engagement ?</AccordionTrigger>
                    <AccordionContent>
                    just pure anonymity,no followers,no likes...
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I delete my words ?</AccordionTrigger>
                    <AccordionContent> 
                    Yes, you have full control over your words.
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
      </div>  
    )
}


