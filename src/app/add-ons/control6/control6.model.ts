export class Control6 {
    constructor(
        public patientId: number,
        public name: string,
        public surgeryDate: string,
        public email: string
    ){}

    static empty() : Control6 {
        return new Control6(null, '', '', '');
    }
}