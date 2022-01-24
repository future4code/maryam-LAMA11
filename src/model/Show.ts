export class Show {
    constructor(
        protected id: string,
        protected weekDay: string,
        protected startTime: number,
        protected endTime: number,
        protected groupId: string
    ){}

    getId () {return this.id}

    getWeekDay () {return this.weekDay}

    getStartTime () {return this.startTime}

    getEndTime () {return this.endTime}

    getGroupId () {return this.groupId}
}

export class Ticket {
    constructor(
        protected id: string,
        protected name: string,
        protected price: number,
        protected quantity: number,
        protected showId: string
    ){}

    getId () {return this.id}

    getName () {return this.name}

    getPrice () {return this.price}

    getQuantity () {return this.quantity}

    getShowId () {return this.showId}
}

export class Photo {
    constructor(
        protected id: string,
        protected url: string,
        protected showId: string
    ){}

    getId () {return this.id}

    getUrl () {return this.url}

    getShowId () {return this.showId}
}