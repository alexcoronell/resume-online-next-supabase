import { create } from "zustand";

/* Service */
import getStudies from "@/core/services/study.service";

/* Models */
import { Study } from "@/core/models/Study.interface";
import { Institute } from "@/core/models/Institute.interface";

type StudyStore = {
    studies: Study[];
    institutes: Institute[];
    getStudies: () => Promise<Study[]>;
}

export const useStudyStore = create<StudyStore>((set) => ({
    studies: [],
    institutes: [],
    getStudies: async () => {
        const studies = await getStudies();
        set({ studies });
        return studies;
    }
}));