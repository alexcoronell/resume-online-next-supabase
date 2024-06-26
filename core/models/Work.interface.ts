import { StatusWork } from "../types/statusWork.type";

export interface Work {
    id: string;
    title: string;
    url: string;
    repoUrl: string;
    originRepo: 'Github' | 'Gitlab';
    publicRepo: boolean;
    image: string;
    order: number;
    status: StatusWork;
    technologies: string;
}