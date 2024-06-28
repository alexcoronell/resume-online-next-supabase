/* Models */
import { Study } from "@/core/models/Study.interface";
import { Experience } from "@/core/models/Experience.interface";

/* Helpers */
import { orderByDateSince, orderByDateUntil } from "./orderByDate";

export const orderStudies = (data: Study[]): Study[] => {
  if(!data) return []
    let studies: Study[] = [];
    const currentStudies = data.filter((item) => item.current === true);
    const noCurrentStudies = data.filter((item) => item.current !== true);
    const currentOrdered = orderByDateSince(currentStudies).reverse();
    const ordered = orderByDateUntil(noCurrentStudies).reverse();
    studies = [...currentOrdered, ...ordered];
    return studies;
  };

  export const orderExperiences = (data: Experience[]): Experience[] => {
    if(!data) return []
    let experiences: Experience[] = [];
    const currentJobs = data.filter((item) => item.current === true);
    const noCurrentJobs = data.filter((item) => item.current === false);
    const currentOrdered = orderByDateSince(currentJobs).reverse();
    const ordered = orderByDateUntil(noCurrentJobs).reverse();
    experiences = [...currentOrdered, ...ordered];
    return experiences;
  };