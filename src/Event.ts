export class Event {
    id: number;
    name: string;
    date: Date;
    time: Date;

    constructor(id: number, name: string, date: Date, time: Date) {

        
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;
    }
}