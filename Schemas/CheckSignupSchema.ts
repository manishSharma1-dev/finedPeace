import { z } from "zod";

const CheckUserName = z.object({
    username : z
    .string()
    .min(7,"Username Must Be atleast Greater then ")
    .max(30,"Username must not Greater then 30")
})

const CheckSignupSchema = z.object({
    username : CheckUserName,
    email : z.string(),
    password: z
    .string()
    .min(10,{message : "Username Must be atleat greter then 10 character"})
    .max(30,{message : "password must not be greater then 30 character"})
})

export { 
    CheckSignupSchema,
    CheckUserName
}