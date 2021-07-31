import { User } from "./user";

export interface Employee extends User {
    admin_id: number
}