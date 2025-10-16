import { registerAs } from "@nestjs/config";

import { IJWTConfig } from "../models/config";

export const jwtConfig = registerAs("JWT_CONFIG", (): IJWTConfig => {
    return {
        tempSecret: process.env.JWT_TEMP_SECRET as string,
        adminSecret: process.env.JWT_ADMIN_SECRET as string,
        secret: process.env.JWT_SECRET as string,
        expiresIn: process.env.JWT_EXPIRES_IN as string,
    }
})