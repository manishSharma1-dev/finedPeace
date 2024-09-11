import { z } from "zod";

const CheckSignInSchema = z.object({
    email : z.string(),
    password : z.string()
})

export { 
    CheckSignInSchema
}
