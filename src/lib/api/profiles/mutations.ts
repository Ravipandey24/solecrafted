import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import {
  NewProfile,
  ProfileId,
  profileIdSchema,
  insertProfileSchema,
  profiles,
} from "@/lib/db/schema/schema";


export const createProfile = async (profile: NewProfile) => {
  const newProfile = insertProfileSchema.parse(profile);
  try {
    await db.insert(profiles).values(newProfile);
    return { success: true };
  } catch (error: any) {
    if ((error as Error).message && (error as Error).message.includes('AlreadyExists')){
      return { error: 'Profile already exists!' };
    }
    console.error('new profile', error);
    return { error: "Something went wrong!" };
  }
};

export const updateProfile = async (id: ProfileId, profile: NewProfile) => {
  const { id: profileId } = profileIdSchema.parse({ id });
  const newProfile = insertProfileSchema.parse(profile);
  try {
    await db.update(profiles).set(newProfile).where(eq(profiles.id, profileId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteProfile = async (id: ProfileId) => {
  const { id: profileId } = profileIdSchema.parse({ id });
  try {
    await db.delete(profiles).where(eq(profiles.id, profileId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
