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