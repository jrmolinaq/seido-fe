import { Company } from './../company/company.model';

export class Specialty {
    constructor(
        public id: number,
        public name: string,
        public company: Company
    ){}

    static empty() : Specialty {
        return new Specialty(null, '', Company.empty());
    }
}

export class SpecialtyStatistic {
    constructor(
        public patientId: number,
        public statisticInfo: string
    ){}
}