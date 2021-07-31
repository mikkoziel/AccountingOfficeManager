import { Company } from "./company";

export interface User{
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    role: string,
    company?: Company,
};