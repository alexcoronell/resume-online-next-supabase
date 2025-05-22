/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import type { Study } from "@/core/models/Study.interface";

/* DTO's */
import type { CreateStudyDto, UpdateStudyDto } from "@/core/dtos/Study.dto";

/* Helpers */
import { orderStudies } from "@/helpers/orderData";

const supabase = createClient();
const tableName = "studies";

/* Revalidate */
export const revalidate = 60 * 60 * 24 * 15;

/**
 * Retrieves a list of studies from the database, orders them, and returns the studies.
 * This function uses the Supabase client to query the database for all studies.
 * It orders the studies using the `orderStudies` helper function and returns an object containing the studies and the total count.
 * The function is asynchronous and returns a promise that resolves to an object containing the studies.
 *
 * @returns A promise that resolves to an object containing an array of studies.
 */
const getSimpleStudies = async (): Promise<Study[]> => {
  const { data } = await supabase.from(tableName)
    .select("*")
    .order("current", { ascending: false })
    .order("until", { ascending: false })
  return data as Study[];
};

/**
 * Retrieves a list of studies from the database, orders them, and returns the studies along with the total count.
 * This function uses pagination to limit the number of studies returned.
 * It takes two optional parameters: `page` and `pageSize`, which specify the current page number and the number of studies per page, respectively.
 * The default values for `page` and `pageSize` are 1 and 10, respectively.
 * The `from` and `to` variables are calculated based on the current page and page size to determine the range of studies to retrieve.
 * The `from` variable is calculated as `(page - 1) * pageSize`, and the `to` variable is calculated as `from + pageSize - 1`.
 * This function uses the Supabase client to query the database for all studies.
 * It orders the studies using the `orderStudies` helper function and returns an object containing the studies and the total count.
 * The function is asynchronous and returns a promise that resolves to an object containing the studies and the total count.
 * The `revalidate` constant is set to 15 days, indicating that the data should be revalidated every 15 days.
 *
 * @returns A promise that resolves to an object containing an array of studies and the total number of studies.
 */
const getStudies = async (
  page = 1,
  pageSize = 10
): Promise<{ studies: Study[]; total: number }> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count } = await supabase
    .from(tableName)
    .select("*", { count: "exact" })
    .order("current", { ascending: false })
    .order("until", { ascending: false })
    .range(from, to);

  return { studies: data as Study[], total: count ?? 0 };
};


/**
 * Retrieves a study record by its unique identifier.
 * This function uses the Supabase client to query the database for a study with the specified ID.
 * If a study with the given ID is found, it returns the study object; otherwise, it returns null.
 * The function is asynchronous and returns a promise that resolves to the study object or null if not found.
 *
 * @param id - The unique identifier of the study to retrieve.
 * @returns A promise that resolves to the `Study` object if found, or `null` if no study with the given ID exists.
 */
const getStudyById = async (id: Study['id']): Promise<Study | null> => {
  const { data } = await supabase.from(tableName).select("*").eq("id", id).single();
  return data as Study | null;
};

/**
 * Creates a new study record in the database.
 * Retrieves a study object by CreateStudyDto.
 * This function is used to add a new study to the database.
 * It takes a CreateStudyDto object as input and returns the newly created study object.
 * The function uses the Supabase client to insert the new study into the database and returns the created study object.
 * If an error occurs during the insertion, it logs the error to the console and returns null.
 * 
 * @param study
 * @returns 
 */
const addStudy = async (study: CreateStudyDto): Promise<Study | null> => {
  const { data, error } = await supabase.from(tableName).insert([study]).select().single();
  if (error) {
    console.error("Error adding study:", error);
    return null;
  }
  return data as Study;
};

/**
 * Updates an existing study record in the database.
 * This function takes the unique identifier of the study to be updated and a data transfer object containing the properties to be updated.
 * It uses the Supabase client to update the study in the database and returns the updated study object.
 * If an error occurs during the update, it logs the error to the console and returns null.
 * The function is asynchronous and returns a promise that resolves to the updated study object or null if an error occurred.
 *
 * @param id - The unique identifier of the study to be updated.
 * @param updates - The data transfer object containing the properties to be updated.
 * @returns A promise that resolves to the updated `Study` object if successful, or `null` if an error occurred.
 */
const updateStudy = async (id: string, updates: UpdateStudyDto): Promise<Study | null> => {
  const { data, error } = await supabase.from(tableName).update(updates).eq("id", id).select().single();
  if (error) {
    console.error("Error updating study:", error);
    return null;
  }
  return data as Study;
};

/**
 * Deletes a study record from the database by its unique identifier.
 * This function uses the Supabase client to delete the study from the database.
 * If the deletion is successful, it returns true; otherwise, it returns false.
 * The function also logs any errors that occur during the deletion process to the console.
 * 
 * @param id - The unique identifier of the study to be deleted.
 * @returns A promise that resolves to `true` if the study was successfully deleted, or `false` if an error occurred.
 */
const deleteStudy = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from(tableName).delete().eq("id", id);
  if (error) {
    console.error("Error deleting study:", error);
    return false;
  }
  return true;
};

export { getSimpleStudies, getStudies, getStudyById, addStudy, updateStudy, deleteStudy };
