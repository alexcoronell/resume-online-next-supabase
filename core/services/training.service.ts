/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Training } from "../models/Training.interface";

import { CreateTrainingDto, UpdateTrainingDto } from "../dtos/Training.dto";

const supabase = createClient();
const tableName = "trainings";

/* Revalidate */
export const revalidate = 60 * 60 * 24;

const getSimpleTrainings = async (): Promise<Training[]> => {
  const { data } = await supabase.from(tableName).select("*, institute(*)").order('year', { ascending: false })
    .order('month', { ascending: false });
  return await data as Training[];
};

const getTrainings = async (
  page = 1,
  pageSize = 5
): Promise<{ trainings: Training[]; total: number }> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count } = await supabase
    .from(tableName)
    .select("*", { count: "exact" })
    .order("year", { ascending: false })
    .order("month", { ascending: false })
    .range(from, to);

  return { trainings: data as Training[], total: count ?? 0 };
};

const getTrainingById = async (id: Training['id']): Promise<Training | null> => {
  const { data } = await supabase.from(tableName).select("*").eq("id", id).single();
  return data as Training | null;
};

const addTraining = async (dto: CreateTrainingDto): Promise<Training | null> => {
  const { data, error } = await supabase.from(tableName).insert([dto]).select().single();
  if (error) {
    console.error("Error adding training:", error);
    return null;
  }
  return data as Training;
};

const updateTraining = async (id: string, changes: UpdateTrainingDto): Promise<Training | null> => {
  const { data, error } = await supabase.from(tableName).update(changes).eq("id", id).select().single();
  if (error) {
    console.error("Error updating training:", error);
    return null;
  }
  return data as Training;
};

const deleteTraining = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from(tableName).delete().eq("id", id);
  if (error) {
    console.error("Error deleting training:", error);
    return false;
  }
  return true;
};

export { getSimpleTrainings, getTrainings, getTrainingById, addTraining, updateTraining, deleteTraining };
