export const validateName = (name) =>{
    if(typeof name !== 'string'){
        return {
            error:"Must be a String"
        }
    }
    if(name.trim().length === 0 ){
        return {
            error:"Name must be not empty"
        }
    }
    if(name.length > 50){
        return {
            error:"Must have less than 50 letters"
        }
    }
    return {}
}

export const validateEmail = (email) => {
    const test = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!!email && email.toLowerCase().match(test)){
        return {};
    }
    return {
        error: "is not valid"
    };
}

export const validatePassword = (password) => {
    if(typeof password !== 'string'){
        return {
            error: "must be a string"
        }
    }
    if(password.length < 6){
        return {
            error: "must have atleast 6 characters"
        }
    }
    if (/\s/.test(password)) { // Check for spaces
        return {
            error: "must not contain spaces"
        };
    }
    return {};
}

export const validateMobile = (mobile) => {
    if (typeof mobile !== 'string') {
        return {
            error: "number must be a string"
        };
    }

    // Check if mobile has exactly 10 digits
    if (mobile.length !== 10) {
        return {
            error: "number must have exactly 10 digits"
        };
    }

    // Check if mobile consists only of numeric characters
    if (!/^\d+$/.test(mobile)) {
        return {
            error: "number must contain only numeric digits"
        };
    }
    return {}
}
