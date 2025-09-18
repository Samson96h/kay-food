export interface JwtPayload {
    sub: number | string;
    role: string;
    phone?: string;
    temp?: boolean
}