import { create } from "zustand";

/* Service */
import { getInstitutes as fetchInstitutes } from "@/core/services/institute.service";

/* Models */
import type { Institute } from "@/core/models/Institute.interface";

/* Types */
import type { RequestStatus } from "@/core/types/RequestStatus.type";

import { generateOptionsLimitePage } from "@/helpers/generateOptionsLimitePage";

type InstituteStore = {
    institutes: Institute[];
    total: number;
    currentPage: number;
    currentPageSize: number;
    totalPages: number;
    requestStatus: RequestStatus;
    optionsLimit: { value: string | number; label: string }[];
    setPage: (page: number) => void;
    setCurrentPageSize: (pageSize: number) => void;
    getInstitutes: (page?: number, pageSize?: number) => Promise<Institute[]>;
}

export const useInstituteStore = create<InstituteStore>((set, get) => ({
    institutes: [],
    total: 0,
    currentPage: 1,
    currentPageSize: 5,
    totalPages: 0,
    requestStatus: 'init',
    optionsLimit: [],
    setPage: (page) => {
        set({ currentPage: page });
        get().getInstitutes();
    },
    setCurrentPageSize: (pageSize) => {
        set({ currentPageSize: pageSize });
        if (get().total < (get().currentPage - 1) * get().currentPageSize) {
            set({ currentPage: 1 });
        }
        get().getInstitutes();
    },
    getInstitutes: async () => {
        set({ requestStatus: 'loading' });
        const state = get();
        const { institutes, total } = await fetchInstitutes(
            state.currentPage,
            state.currentPageSize
        );
        set({ optionsLimit: generateOptionsLimitePage(total) });
        set({ totalPages: Math.ceil(total / state.currentPageSize) });
        set({ institutes, total });
        set({ requestStatus: 'success' });
        if (institutes === null) {
            set({ requestStatus: 'failed' });
            set({ currentPage: 1 });
            get().getInstitutes();
        }
        return institutes;
    },
}))