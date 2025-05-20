import { create } from "zustand";

/* Service */
import { getStudies } from "@/core/services/study.service";

/* Models */
import type { Study } from "@/core/models/Study.interface";

type StudyStore = {
    studies: Study[];
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