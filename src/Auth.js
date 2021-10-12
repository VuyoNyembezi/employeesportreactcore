//Login Status

export const isLogin = () => {
    if (localStorage.getItem('auth')) return true;
    return false;
}

export const isAdminLogin = () => {
    if (localStorage.getItem('adm')) return true;
    return false;
}

//LOG OUT
export const logout =() =>{
    localStorage.removeItem('auth')
    localStorage.removeItem('adm')
   localStorage.clear();
}



