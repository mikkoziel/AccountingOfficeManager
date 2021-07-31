import { Roles } from "../entity/role";

export function findInDictAfterCirc(data, search_key, search_value){
    let ret = undefined
    let flag = false

    finder(null, data)

    function finder(key, value){
        // console.log(key+ ': ' + value)
        if(value != null){
            if(key == search_key && value == search_value){
                flag = true
                return
            }
            if(isArray(value)){
                // console.log("array")
                for(let param_key in value){
                    finder(param_key, value[param_key])
                }
                return
            } 
            if(value.constructor == Object){
                // console.log("object")
                for(let param_key in value){
                    finder(param_key, value[param_key])
                }
                if(flag){
                    ret = value
                    flag = false;
                }
                return
            
            }
        }
    }
    // }
    return ret
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

export function getRole(role){
    if(role == undefined){
        return "undefined"
    } else {
        if(role.constructor == Object){
            return Roles[role[0]["role_id"]]
        } else {
            return Roles[role[0]]
        }
    }
}