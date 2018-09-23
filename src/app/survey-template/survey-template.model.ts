import {Specialty} from '../specialty/specialty.model';

export class SurveyTemplate {
    constructor(
        public id: number,
        public name: string,
        public jsSurvey: string,
        public type: string,
        public order_id: number,
        //public specialty?: Specialty
        public specialties?: Specialty[]
    ){}

    static empty(): SurveyTemplate {
        return new SurveyTemplate( null, '', '', 'BASIC_INFO', 0 );
    }
}