import { z } from "zod";

const CheckSignInSchema = z.object({
    username : z.string(),
    email : z.string(),
    password : z.string()
})

export { 
    CheckSignInSchema
}
