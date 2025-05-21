import { create } from "zustand";
import { useEffect } from "react";

/* Service */
import { getStudies as fetchStudies } from "@/core/services/study.service";

/* Models */
import type { Study } from "@/core/models/Study.interface";

/* Types */
import type { RequestStatus } from "@/core/types/RequestStatus.type";

import { generateOptionsLimitePage } from "@/helpers/generateOptionsLimitePage";

type StudyStore = {
    studies: Study[];
    total: number;
    currentPage: number;
    currentPageSize: number;
    totalPages: number;
    requestStatus: RequestStatus;
    optionsLimit: { value: string | number; label: string }[];
    setPage: (page: number) => void;
    setCurrentPageSize: (pageSize: number) => void;
    getStudies: (page?: number, pageSize?: number) => Promise<Study[]>;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
    studies: [],
    total: 0,
    currentPage: 1,
    currentPageSize: 5,
    totalPages: 0,
    requestStatus: 'init',
    optionsLimit: [],
    setPage: (page) => {
        set({ currentPage: page });
        get().getStudies();
    },
    setCurrentPageSize: (pageSize) => {
        set({ currentPageSize: pageSize });
        if(get().total < (get().currentPage - 1) * get().currentPageSize) {
            set({ currentPage: 1 });
        }
        get().getStudies();
    },
    getStudies: async () => {
        set({ requestStatus: 'loading' });
        const state = get();
        const { studies, total } = await fetchStudies(
            state.currentPage,
            state.currentPageSize
        );
        set({ optionsLimit: generateOptionsLimitePage(total) });
        set({ totalPages: Math.ceil(total / state.currentPageSize) });
        set({ studies, total });
        set({ requestStatus: 'success' });
        if(studies === null) {
            set({ requestStatus: 'failed' });
            set({ currentPage: 1 });
            get().getStudies();
        }
        return studies;
    },
}));