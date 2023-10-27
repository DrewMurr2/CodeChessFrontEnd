//@ts-check
export class Auth {
    /** 
     * @type {{email:string, url:string} | null}
     */
    static __userData = null
    static getUserData() {
        if (this.__userData)
            return this.__userData
        else if (localStorage.getItem('userData')) {
            // @ts-ignore
            this.__userData = JSON.parse(localStorage.getItem('userData'))
            return this.__userData
        }
    }

    static setUserData(userData) {
        this.__userData = userData
        if (userData)
            localStorage.setItem('userData', JSON.stringify(userData))
    }
}

