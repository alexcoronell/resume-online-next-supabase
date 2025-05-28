import type { Training } from "../models/Training.interface";

export interface CreateTrainingDto extends Omit<Training, 'id'> { }

export interface UpdateTrainingDto extends CreateTrainingDto { }