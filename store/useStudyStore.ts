import { create } from "zustand";
import { useEffect } from "react";

/* Service */
import { getStudies } from "@/core/services/study.service";

/* Models */
import type { Study } from "@/core/models/Study.interface";

type StudyStore = {
    studies: Study[];
    total: number;
    currentPage: number;
    currentPageSize: number;
    setPage: (page: number) => void;
    setCurrentPageSize: (pageSize: number) => void;
    getStudies: (page?: number, pageSize?: number) => Promise<Study[]>;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
    studies: [],
    total: 0,
    currentPage: 1,
    currentPageSize: 10,
    setPage: (page) => {
        set({ currentPage: page });
        get().getStudies();
    },
    setCurrentPageSize: (pageSize) => {
        set({ currentPageSize: pageSize });
        get().getStudies();
    },
    getStudies: async (page, pageSize) => {
        const state = get();
        const { studies, total } = await getStudies(
            page ?? state.currentPage,
            pageSize ?? state.currentPageSize
        );
        set({ studies, total });
        return studies;
    },
}));