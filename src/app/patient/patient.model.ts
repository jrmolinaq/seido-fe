export class Patient {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public nuip: string
    ){}

    static empty(): Patient {
        return new Patient(null, '', '', '');
    }
}