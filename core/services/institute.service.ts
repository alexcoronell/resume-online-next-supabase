/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Institute } from "@/core/models/Institute.interface";

/* DTO's */
import { CreateInstituteDto, UpdateInstituteDto } from "@/core/dtos/Institute.dto";

const supabase = createClient();
const tableName = "institutes";

const getSimpleInstitutes = async (): Promise<Institute[]> => {
    const { data } = await supabase.from(tableName)
        .select("*")
        .order("name", { ascending: true });
    return data as Institute[];
};

const getInstitutes = async (
    page = 1,
    pageSize = 10
): Promise<{ institutes: Institute[]; total: number }> => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count } = await supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .order("name", { ascending: true })
        .range(from, to);

    return { institutes: data as Institute[], total: count ?? 0 };
};

const getInstituteById = async (id: Institute['id']): Promise<Institute | null> => {
    const { data } = await supabase.from(tableName).select("*").eq("id", id).single();
    return data as Institute | null;
};

const addInstitute = async (institute: CreateInstituteDto): Promise<Institute | null> => {
    const { data, error } = await supabase.from(tableName).insert([institute]).select().single();
    if (error) {
        console.error("Error adding institute:", error);
        return null;
    }
    return data as Institute;
};

const updateInstitute = async (id: string, updates: UpdateInstituteDto): Promise<Institute | null> => {
    const { data, error } = await supabase.from(tableName).update(updates).eq("id", id).select().single();
    if (error) {
        console.error("Error updating institute:", error);
        return null;
    }
    return data as Institute;
};

const deleteInstitute = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) {
        console.error("Error deleting institute:", error);
        return false;
    }
    return true;
};

export { getSimpleInstitutes, getInstitutes, getInstituteById, addInstitute, updateInstitute, deleteInstitute }