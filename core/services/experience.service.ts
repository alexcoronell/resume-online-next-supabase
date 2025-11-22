/* Supabase */
import { createClient } from '@/utils/supabase/client'

/* Models */
import { Experience } from '../models/Experience.interface'

/* DTO's */
import {
  CreateExperienceDto,
  UpdateExperienceDto,
} from '../dtos/Experience.dto'

const supabase = createClient()
const tableName = 'experiences'

/* Revalidate */
export const revalidate = 60 * 60 * 24 * 7

const getSimpleExperiences = async (): Promise<Experience[]> => {
  const { data } = await supabase
    .from(tableName)
    .select('*')
    .order('current', { ascending: false })
    .order('until', { ascending: false })
  return data as Experience[]
}

const getExperiences = async (page = 1, pageSize = 5) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data, count } = await supabase
    .from(tableName)
    .select('*', { count: 'exact' })
    .order('current', { ascending: false })
    .order('until', { ascending: false })
    .range(from, to)
  return { experiences: data as Experience[], total: count ?? 0 }
}

const getExperienceById = async (id: Experience['id']) => {
  return await supabase.from(tableName).select('*').eq('id', id).single()
}

const addExperience = async (dto: CreateExperienceDto) => {
  return await supabase.from(tableName).insert([dto]).select().single()
}

const updateExperience = async (id: string, changes: UpdateExperienceDto) => {
  return await supabase
    .from(tableName)
    .update(changes)
    .eq('id', id)
    .select()
    .single()
}

const deleteExperience = async (id: string) => {
  return await supabase.from(tableName).delete().eq('id', id)
}

export {
  getSimpleExperiences,
  getExperiences,
  getExperienceById,
  addExperience,
  updateExperience,
  deleteExperience,
}
