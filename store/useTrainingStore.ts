import { create } from "zustand";

/* Service */
import { getTrainings as fetchTraings } from "@/core/services/training.service";

/* Models */
import type { Training } from "@/core/models/Training.interface";

/* Types */
import type { RequestStatus } from "@/core/types/RequestStatus.type";

/* Helpers */
import { generateOptionsLimitePage } from "@/helpers/generateOptionsLimitePage";

type TrainingStore = {
    trainings: Training[];
    total: number;
    currentPage: number;
    currentPageSize: number;
    totalPages: number;
    requestStatus: RequestStatus;
    optionsLimit: { value: string | number; label: string }[];
    setPage: (page: number) => void;
    setCurrentPageSize: (pageSize: number) => void;
    getTrainings: (page?: number, pageSize?: number) => Promise<Training[]>;
}

export const useTrainingStore = create<TrainingStore>((set, get) => ({
    trainings: [],
    total: 0,
    currentPage: 1,
    currentPageSize: 5,
    totalPages: 0,
    requestStatus: 'init',
    optionsLimit: [],
    setPage: (page) => {
        set({ currentPage: page });
        get().getTrainings();
    },
    setCurrentPageSize: (pageSize) => {
        set({ currentPageSize: pageSize });
        if (get().total < (get().currentPage - 1) * get().currentPageSize) {
            set({ currentPage: 1 });
        }
        get().getTrainings();
    },
    getTrainings: async () => {
        set({ requestStatus: 'loading' });
        const state = get();
        const { trainings, total } = await fetchTraings(
            state.currentPage,
            state.currentPageSize
        );
        set({ optionsLimit: generateOptionsLimitePage(total) });
        set({ totalPages: Math.ceil(total / state.currentPageSize) });
        set({ trainings, total });
        set({ requestStatus: 'success' });
        if (trainings === null) {
            set({ requestStatus: 'failed' });
            set({ currentPage: 1 });
            get().getTrainings();
        }
        return trainings;
    },
}));