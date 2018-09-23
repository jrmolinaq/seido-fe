import {Specialty} from '../specialty/specialty.model';
import {Event} from '../event/event.model';
import {Patient} from '../patient/patient.model';
import {SurveyTemplate} from '../survey-template/survey-template.model'

export class Survey {
    constructor(
        public id: number,
        public template: SurveyTemplate,
        public surveyAnswers: string,
        public state: string,
        public event?: Event,
        public patient?: Patient
    ){}
}