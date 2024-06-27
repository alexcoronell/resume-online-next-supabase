/* Helpers */
import { orderByDateSince, orderByDateUntil } from "./orderByDate";
import { Study } from "@/core/models/Study.interface";

export const orderStudies = (data: Study[]): Study[] => {
    let studies: Study[] = [];
    const currentStudies = data.filter((item) => item.current === true);
    const noCurrentStudies = data.filter((item) => item.current !== true);
    const currentOrdered = orderByDateSince(currentStudies).reverse();
    const ordered = orderByDateUntil(noCurrentStudies).reverse();
    studies = [...currentOrdered, ...ordered];
    return studies;
  };