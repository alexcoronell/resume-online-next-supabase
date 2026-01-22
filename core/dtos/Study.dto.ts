import type { Study } from '@/core/models/Study.interface'

export interface CreateStudyDto extends Omit<Study, 'id'> {}

export interface UpdateStudyDto extends CreateStudyDto {}
