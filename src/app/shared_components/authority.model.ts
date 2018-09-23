export class Authority{
    constructor(
        public id: number,
        public name: string
    ){}
    
    static empty(): Authority {
        return new Authority(null, '');
    }
}