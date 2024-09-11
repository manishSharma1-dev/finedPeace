import { z } from "zod";

const CheckSignupSchema = z.object({
    username : z.string(),
    fullName : z.string(),
    email : z.string(),
    password: z
    .string()
    .min(10,{message : "Username Must be atleat greter then 10 character"})
    .max(30,{message : "password must not be greater then 30 character"})
})

export { 
    CheckSignupSchema
}