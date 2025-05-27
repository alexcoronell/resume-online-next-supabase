import { OriginRepo } from "@/core/types/OriginRepo.type";
import { StatusWork } from "@/core/types/StatusWork.type";

export interface Work {
    id: string;
    title: string;
    url: string;
    repoUrl: string;
    originRepo: OriginRepo;
    publicRepo: boolean;
    image: string;
    order: number;
    status: StatusWork;
    technologies: string;
}