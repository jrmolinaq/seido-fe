import { Company } from './../company/company.model';
import { Authority } from '../shared_components/authority.model';

export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public enabled: number,
        public authority: Authority,
        public company: Company
    ){}
    
    static empty(): User {
        return new User(null, '', '', '', '', '', 1, Authority.empty(), Company.empty());
    }
}