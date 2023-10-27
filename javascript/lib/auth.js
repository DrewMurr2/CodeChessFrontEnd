//@ts-check
export class Auth {
    /** 
     * @type {{email:string, url:string, token:string} | null}
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

    static addToUserData(obj) {
        if (this.__userData)
            this.__userData = { ...this.__userData, ...obj }
        this.setUserData(this.__userData)
    }
    static setUserData(userData) {
        this.__userData = userData
        if (userData)
            localStorage.setItem('userData', JSON.stringify(userData))
    }
    static clearUserData() {
        this.__userData = null
        localStorage.removeItem('userData')
    }
}

