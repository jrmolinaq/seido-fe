export class Company {
    constructor(
        public id: number,
        public name: string,
        public createdDate: string,
        public nit: string
    ){}

    static empty() : Company {
        return new Company(0, '', '', '');
    }
}