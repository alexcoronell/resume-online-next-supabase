import { Institute } from '@/core/models/Institute.interface'

export interface CreateInstituteDto extends Omit<Institute, 'id'> {}

export interface UpdateInstituteDto extends Institute {}
