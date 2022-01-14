export class Group {
    constructor(
        protected id: string,
        protected name: string, 
        protected musicGenre: string,
        protected responsible: string
    ){}

    getId () {return this.id}

    getName () {return this.name}

    getMusicGenre () {return this.musicGenre}

    getResponsible () {return this.responsible}
}