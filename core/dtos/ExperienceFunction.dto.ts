import { ExperienceFunction } from '../models/ExperienceFunction'

export interface CreateExperienceFunctionDto
  extends Omit<ExperienceFunction, 'id'> {}

export interface UpdateExperienceFunctionDto
  extends CreateExperienceFunctionDto {}
