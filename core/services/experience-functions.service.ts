/* Supabase */
import { createClient } from '@/utils/supabase/client'

/* Models */
import { Experience } from '../models/Experience.interface'
import { ExperienceFunction } from '../models/ExperienceFunction'

/* DTO's */
import { CreateExperienceFunctionDto } from '@/core/dtos/ExperienceFunction.dto'

const supabase = createClient()
const tableName = 'experience_functions'

/* Revalidate */
export const revalidate = 60 * 60 * 24 * 7

const getExperienceFunctions = async (id: Experience['id']) => {
  return await supabase.from(tableName).select('*').eq('experienceId', id)
}

const addExperienceFunctions = async (
  dto: CreateExperienceFunctionDto[]
): Promise<ExperienceFunction[] | null> => {
  const { data, error } = await supabase.from(tableName).insert(dto).select()
  if (error) {
    console.error('Error adding Expeerience Functions:', error)
    return null
  }
  return data as ExperienceFunction[]
}

const deleteExperienceFunction = async (ids: ExperienceFunction['id'][]) => {
  const { error } = await supabase.from(tableName).delete().in('id', ids)
  if (error) {
    console.error('Error deleting Experience Functions:', error)
    return false
  }
  return true
}

const deleteExperienceFunctionByExperienceId = async (id: Experience['id']) => {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('experienceId', id)
  if (error) {
    console.error('Error deleting Experience Functions:', error)
    return false
  }
  return true
}

export {
  getExperienceFunctions,
  addExperienceFunctions,
  deleteExperienceFunction,
  deleteExperienceFunctionByExperienceId,
}
