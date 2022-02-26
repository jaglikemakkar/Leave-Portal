const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const isEmail = (email)=>{
    if(typeof email !== "string")
    return false;
    return regex.test(email);
}

const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
export const isPhone = (phone)=>{
    return phoneRegex.test(phone);
}

export const isName = (name)=>{
    if(!name)
    return false;
    return true;
}
export const isDate = (date)=>{
    let cDate = new Date();
    if(date < cDate)
    return false;
    return true;
}