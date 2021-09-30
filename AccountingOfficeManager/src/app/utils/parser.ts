import { AO } from "../entity/ao";
import { Calendar } from "../entity/calendar"
import { Client } from "../entity/client";
import { ClientCompany } from "../entity/clientCompany";
import { Company } from "../entity/company";
import { Document } from '../entity/document';
import { Employee } from "../entity/employee";
import { User } from "../entity/user";
import { WorkLog } from "../entity/worklog";
import { findInDictAfterCirc, getRole } from "./utils"

export class Parser{

// CHECKER -----------------------------------------------
  checkElementById(data, event, id_name){
    if(event.constructor == Object){
      return event
    } else {
      return findInDictAfterCirc(data, id_name, event)
    }
  }

// CONVERTERS -------------------------------------------
  convertWorklogDuration(dur){
    return Math.round((dur /(60 * 60) + Number.EPSILON) * 100) / 100;
  }

  public sortByDate(arr): Array<WorkLog> {
    arr.sort((a: WorkLog, b: WorkLog) => {
        return b.date.getTime() - a.date.getTime();
    });
    return arr;
  }

  find(array, string) {
    return array.reduce((r, o) => {
        if (Object.values(o).some(v => v === string)) {
            r.push(o);
            return r;
        }
        if (Array.isArray(o.subNames)) {
            var subNames = this.find(o.subNames, string);
            if (subNames.length) r.push(Object.assign({}, o, { subNames }));
        }
        return r;
    }, []);
  }

// MODEL PARSERS ----------------------------------------

  parseClientInfo(res){
    return {
      "client": this.parseClient(res["client"]),
      "documents": this.parseDocumentArrayFromClientInfo(res["documents"], res)
    }
  }

  parseCompanyInfo(res){
    return {
      "company": this.parseClientCompany(res["company"]),
      "clients": this.parseClientArray(res["clients"])
    }
  }

// ARRAY PARSERS ----------------------------------------
  parseCalendarArray(data): Calendar[]{
    var calendars = new Array<Calendar>();
    data.forEach(x=> {
      let event = this.checkElementById(data, x, "calendar_id")
      calendars.push(this.parseCalendar(event))
    });
    return calendars;
  }

  parseDocumentArrayFromClientInfo(data, docs): Document[]{
    var documents = new Array<Document>();
    data.forEach(x=> {
      let doc = this.checkElementById(docs, x, "document_id");
      documents.push(this.parseDocument(doc))
    });
    console.log(documents)
    return documents;
  }
  
  parseDocumentArray(data): Document[]{
    var documents = new Array<Document>();
    data.forEach(x=> {
      let doc = this.checkElementById(data, x, "document_id");
      documents.push(this.parseDocument(doc))
    });
    console.log(documents)
    return documents;
  }

  parseClientArray(data): Client[] {
    var clients = new Array<Client>();
    data.forEach(x=> {
      let client = this.checkElementById(data, x, "user_id");
      clients.push(this.parseClient(client))
    });
    return clients;
  }

  parseCCArray(data): ClientCompany[] {
    var clients = new Array<ClientCompany>();
    data.forEach(x=>
      clients.push(this.parseClientCompany(x))
    );
    return clients;
  }
  
  parseEmployeeArray(data): Employee[] {
    var employees = new Array<Employee>();
    data.forEach(x=>{
      let empl = this.checkElementById(data, x, "user_id");
      employees.push(this.parseEmployee(empl))
    });
    return employees;
  }

  parseWorkLogArray(data): WorkLog[] {
    var worklogs = new Array<WorkLog>();
    data.forEach(x=>
      worklogs.push(this.parseWorkLog(x))
    );
    worklogs = this.sortByDate(worklogs);
    return worklogs;
  }

  parseUserArray(data){
    var users = new Array<User>();
    data.forEach(x=>{
      let user = this.checkElementById(data, x, "user_id");
      users.push(this.parseUser(user))
    });
    return users;
  }
  
// SIMPLE PARSERS ----------------------------------------
  parseClient(data): Client{
    let role_check = getRole(data["roles"])
      return <Client>{
        id: data["user_id"],
        employee_id: data["employee"],
        company: this.parseClientCompany(data["company"]),
        first_name: data["first_name"],
        last_name: data["last_name"],
        username: data["username"],
        role: role_check,
      }
  }

  parseCalendar(data): Calendar{
    return <Calendar>{
      calendar_id: data['calendar_id'],
      user_id: data['user_id'],
      start_date: new Date(data['start_date']),
      end_date: new Date(data['end_date']),
      title: data['title'],
      all_day: data['all_day']
    }
  }

  parseDocument(data): Document{
    return <Document>{
      document_id: data["document_id"],
      name: data["name"],
      path: data["path"],
      description: data["description"]
    }
  }
  
  parseClientCompany(data): ClientCompany{
    return <ClientCompany>{
      company_id: data["company_id"],
      name: data["name"],
    }
  }
  
  parseCompany(data): Company{
    return <Company>{
      company_id: data["company_id"],
      name: data["name"],
    }
  }

  parseEmployee(data): Employee{
    let role_check = getRole(data["roles"])
    return <Employee>{ 
      id: data["user_id"],
      admin: data["admin"],
      company: this.parseClientCompany(data["company"]),
      first_name: data["first_name"],
      last_name: data["last_name"],
      username: data["username"],
      role: role_check
    }
  }
  
  parseWorkLog(data): WorkLog{
    return <WorkLog> {
      worklog_id: data['worklog_id'],
      date: new Date(data['date']),
      duration: this.convertWorklogDuration(data['duration'])
    }
  }

  parseUser(data): User{
    let role_check = getRole(data["roles"])
      return <User>{
        id: data['user_id'],
        first_name: data['first_name'],
        last_name: data['last_name'],
        username: data['username'],
        role: role_check
      }   
  }

  parseAO(data): AO{
    return <AO>{
      company_id: data["company_id"],
      name: data["name"],
    }
  }
  
}