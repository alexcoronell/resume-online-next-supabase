import { Experience } from "./Experience.interface";

export interface ExperienceFunction {
    id?: string,
    experienceId?: Experience['id']
    functionDetail: string;
}