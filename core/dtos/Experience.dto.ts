import { Experience } from "../models/Experience.interface";

export interface CreateExperienceDto extends Omit<Experience, 'id' | 'functions'> { }

export interface UpdateExperienceDto extends CreateExperienceDto { }