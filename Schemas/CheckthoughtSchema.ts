import { z } from "zod"

const checkthoughtSchema = z.object({
    thought : z
       .string()
       .min(20,{ message : "Your thought must be atleat of 20 character"})
       .max(400,"Your thought should not exceed the 400 character")
})


export { 
    checkthoughtSchema
}