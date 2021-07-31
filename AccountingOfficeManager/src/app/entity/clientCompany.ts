import { Company } from "./company";

export interface ClientCompany extends Company{
    acccounting_office?: Company
};