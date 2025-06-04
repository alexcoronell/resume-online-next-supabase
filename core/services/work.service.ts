/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Work } from "../models/Work.interface";

/* DTO's */
import { CreateWorkDto, UpdateWorkDto } from "../dtos/Work.dto";

/* Helpers */
import getimageUrl from "@/helpers/getImagesUrl";

const supabase = createClient();
const tableName = "works";
const tableBucketName = "works";

/* Revalidate */
export const revalidate = 60 * 60 * 24 * 7;

const getSimpleWorks = async () => {
  return await supabase
    .from(tableName)
    .select("*")
    .order("order", { ascending: false })
}

const getWorks = async (page = 1, pageSize = 5) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, count } = await supabase
    .from(tableName)
    .select("*", { count: "exact" })
    .order("order", { ascending: false })
    .range(from, to)
  return { works: data as Work[], total: count ?? 0 };
};

const getWorkById = async (id: Work['id']) => {
  const { data } = await supabase.from(tableName).select("*").eq("id", id).single();
  const work: Work = data
  const imageUrl = await getimageUrl(tableBucketName, work.image);
  return await { work, imageUrl }
};

const addWork = async (Work: CreateWorkDto) => {
  return await supabase.from(tableName).insert([Work]).select().single();

};

const updateWork = async (id: string, updates: UpdateWorkDto) => {
  return await supabase.from(tableName).update(updates).eq("id", id).select().single();
};

const deleteWork = async (id: string) => {
  return await supabase.from(tableName).delete().eq("id", id);
};

export { getSimpleWorks, getWorks, getWorkById, addWork, updateWork, deleteWork };
