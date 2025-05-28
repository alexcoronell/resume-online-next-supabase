import type { Work } from "../models/Work.interface";

export interface CreateWorkDto extends Omit<Work, 'id'> { }

export interface UpdateWorkDto extends CreateWorkDto { }