import { ClientCompany } from "./clientCompany";
import { User } from "./user";

export interface Client extends User{
    employee_id: number,
    company: ClientCompany
}