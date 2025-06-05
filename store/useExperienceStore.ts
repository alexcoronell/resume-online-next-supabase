import { create } from "zustand";

/* Service */
import { getExperiences as fetchExperiences } from "@/core/services/experience.service";

/* Models */
import { Experience } from "@/core/models/Experience.interface";

/* Types */
import type { RequestStatus } from "@/core/types/RequestStatus.type";

import { generateOptionsLimitePage } from "@/helpers/generateOptionsLimitePage";

type ExperienceStore = {
    experiences: Experience[];
    total: number;
    currentPage: number;
    currentPageSize: number;
    totalPages: number;
    requestStatus: RequestStatus;
    optionsLimit: { value: string | number; label: string }[];
    setPage: (page: number) => void;
    setCurrentPageSize: (pageSize: number) => void;
    getExperiences: (page?: number, pageSize?: number) => Promise<Experience[]>;
}

export const useExperienceStore = create<ExperienceStore>((set, get) => ({
    experiences: [],
    total: 0,
    currentPage: 1,
    currentPageSize: 5,
    totalPages: 0,
    requestStatus: 'init',
    optionsLimit: [],
    setPage: (page) => {
        set({ currentPage: page });
        get().getExperiences();
    },
    setCurrentPageSize: (pageSize) => {
        set({ currentPageSize: pageSize });
        if (get().total < (get().currentPage - 1) * get().currentPageSize) {
            set({ currentPage: 1 });
        }
        get().getExperiences();
    },
    getExperiences: async () => {
        set({ requestStatus: 'loading' });
        const state = get();
        const { experiences, total } = await fetchExperiences(
            state.currentPage,
            state.currentPageSize
        );
        set({ optionsLimit: generateOptionsLimitePage(total ?? 0) });
        set({ totalPages: Math.ceil((total ?? 0) / state.currentPageSize) });
        set({ experiences, total });
        set({ requestStatus: 'success' });
        if (experiences === null) {
            set({ requestStatus: 'failed' });
            set({ currentPage: 1 });
            get().getExperiences();
        }
        return experiences;
    },
}))