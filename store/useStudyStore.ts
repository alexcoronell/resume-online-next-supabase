import { create } from "zustand";
import { useEffect } from "react";

/* Service */
import { getStudies as fetchStudies } from "@/core/services/study.service";

/* Models */
import type { Study } from "@/core/models/Study.interface";

/* Types */
import type { RequestStatus } from "@/core/types/RequestStatus.type";

type StudyStore = {
    studies: Study[];
    total: number;
    currentPage: number;
    currentPageSize: number;
    requestStatus: RequestStatus;
    setPage: (page: number) => void;
    setCurrentPageSize: (pageSize: number) => void;
    getStudies: (page?: number, pageSize?: number) => Promise<Study[]>;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
    studies: [],
    total: 0,
    currentPage: 1,
    currentPageSize: 10,
    requestStatus: 'init',
    setPage: (page) => {
        set({ currentPage: page });
        get().getStudies();
    },
    setCurrentPageSize: (pageSize) => {
        set({ currentPageSize: pageSize });
        get().getStudies();
    },
    getStudies: async () => {
        set({ requestStatus: 'loading' });
        const state = get();
        const { studies, total } = await fetchStudies(
            state.currentPage,
            state.currentPageSize
        );
        set({ studies, total });
        set({ requestStatus: 'success' });
        return studies;
    },
}));