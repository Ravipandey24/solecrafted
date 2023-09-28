import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { profileIdSchema, profiles, ProfileId, selectProfileSchema, Profile } from "@/lib/db/schema/schema";

export const getProfiles = async () => {
  const c = await db.select().from(profiles);
  return { profiles: c };
};

export const getProfileById = async (id: ProfileId) => {
  const { id: profileId } = profileIdSchema.parse({ id });
  const [c] = await db.select().from(profiles).where(eq(profiles.id, profileId));
  return { profile: c };
};

export const getProfileByEmail = async (email: Profile['email']) => {
  const { email: profileEmail } = selectProfileSchema.pick({ email: true }).parse({ email });
  const [c] = await db.select().from(profiles).where(eq(profiles.email, profileEmail));
  return { profile: c };
};