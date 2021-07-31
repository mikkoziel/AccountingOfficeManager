import { Roles } from "../entity/role";

export function findInJsonAfterCirc(data, search_key, search_value){
    for(let key in data){
        let value = data[key];

        console.log(key+ ': ' + value)
        if(value == null){
        } else {
            if(isArray(value)){
                for(let element in value){
                    return findInJsonAfterCirc(value[element], search_key, search_value)
                }
            } else {
                if(value.constructor == Object){
                    return findInJsonAfterCirc(value, search_key, search_value)
                } else{
                    if(key == search_key && value == search_value){
                        console.log(data)
                        return data;
                    }
                }
            }
        }
    }
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

export function getRole(role){
    if(role == undefined){
        return "undefined"
    } else {
        if(role.constructor == Object){
            return Roles[role["role_id"]]
        } else {
            return Roles[role]
        }
    }
}