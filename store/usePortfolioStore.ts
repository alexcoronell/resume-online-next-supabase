import { create } from "zustand";

/* Service */
import { getWorks as fetchWorks } from "@/core/services/work.service";

/* Models */
import { Work } from "@/core/models/Work.interface";

/* Types */
import type { RequestStatus } from "@/core/types/RequestStatus.type";

import { generateOptionsLimitePage } from "@/helpers/generateOptionsLimitePage";

type WorkStore = {
    works: Work[];
    total: number;
    currentPage: number;
    currentPageSize: number;
    totalPages: number;
    requestStatus: RequestStatus;
    optionsLimit: { value: string | number; label: string }[];
    setPage: (page: number) => void;
    setCurrentPageSize: (pageSize: number) => void;
    getWorks: (page?: number, pageSize?: number) => Promise<Work[]>;
}

export const useWorkStore = create<WorkStore>((set, get) => ({
    works: [],
    total: 0,
    currentPage: 1,
    currentPageSize: 5,
    totalPages: 0,
    requestStatus: 'init',
    optionsLimit: [],
    setPage: (page) => {
        set({ currentPage: page });
        get().getWorks();
    },
    setCurrentPageSize: (pageSize) => {
        set({ currentPageSize: pageSize });
        if (get().total < (get().currentPage - 1) * get().currentPageSize) {
            set({ currentPage: 1 });
        }
        get().getWorks();
    },
    getWorks: async () => {
        set({ requestStatus: 'loading' });
        const state = get();
        const { works, total } = await fetchWorks(
            state.currentPage,
            state.currentPageSize
        );
        set({ optionsLimit: generateOptionsLimitePage(total ?? 0) });
        set({ totalPages: Math.ceil((total ?? 0) / state.currentPageSize) });
        set({ works, total });
        set({ requestStatus: 'success' });
        if (works === null) {
            set({ requestStatus: 'failed' });
            set({ currentPage: 1 });
            get().getWorks();
        }
        return works;
    },
}))