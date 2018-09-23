export class Addon {
    constructor(
        public id: number,
        public name: string,
        public enabled: number,
        public path: string
    ){}

    static empty() : Addon {
        return new Addon(null, '', null, '');
    }
}