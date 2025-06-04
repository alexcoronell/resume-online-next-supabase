import { Profile } from "../models/Profile.interface";

export interface UpdateProfileDto extends Omit<Profile, 'id'> {}