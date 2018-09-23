import {Specialty} from '../specialty/specialty.model';
import {Survey} from '../survey/survey.model';

export class Event {
    constructor(
        public id: number,
        public name: string,
        public createdDate: string,
        public specialty: Specialty,
        public surveys: Survey[] = []
    ){}

    static empty() : Event {
        return new Event(null, '', '', null);
    }
}