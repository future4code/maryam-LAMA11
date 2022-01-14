export type authenticationData = {
    id: string,
    role: ROLE
}

export enum ROLE {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN'
}

export class User {
    constructor(
        private id: string,
        private email: string,
        private name: string, 
        private password: string,
        private role: ROLE
    ){}

    getId () {return this.id}

    getEmail () {return this.email}

    getName () {return this.name}

    getPassword () {return this.password}

    getRole () {return this.role}
}