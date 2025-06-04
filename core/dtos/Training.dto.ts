import { Institute } from "../models/Institute.interface";
import type { Training } from "../models/Training.interface";

export interface CreateTrainingDto extends Omit<Training, 'id' | 'institute'> {
    institute: Institute | null
}

export interface UpdateTrainingDto extends CreateTrainingDto { }