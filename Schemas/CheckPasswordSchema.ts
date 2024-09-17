import { z } from "zod";

const checkPasswordSchema = z.object({
    oldpassword : z.string(),
    newpassword : z.string()
})

export {
    checkPasswordSchema
}