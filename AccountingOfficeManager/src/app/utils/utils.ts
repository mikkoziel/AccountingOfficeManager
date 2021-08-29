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
    // console.log(role)
    if(role == undefined){
        return "undefined"
    } else {
        if(role.constructor == Object){
            // console.log("object")
            return Roles[role["role_id"]]
        } else {
            if(Array.isArray(role)){
                // console.log("array")
                let role_array = []
                role.forEach(x=>{
                    role_array.push(getRole(x))
                })                
                // console.log(role_array)
                return role_array[0]
            }else{
                // console.log(role[0])
                return Roles[role]
            }
        }
    }
}

export function getRoleByString(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export function  refreshComponent(router) {
    const currentRoute = router.url;

    router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        router.navigate([currentRoute]); 
    }); 
  }