import { prisma } from '@/src/lib/prisma';
import { UserContext } from '@/types/copilot';

export interface UserRepository {
  getProfile(userId: string): Promise<UserContext | null>;
}

export const userRepository: UserRepository = {
  async getProfile(userId: string) {
    if (!userId || typeof userId !== 'string') {
      return null;
    }
    try {
      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile) return null;

      return {
        userId,
        skinTone: profile.skinTone,
        eyeColor: profile.eyeColor,
        skinType: profile.skinType,
        preferredStyle: profile.preferredStyle,
      };
    } catch (e) {
      console.error('[UserRepo] getProfile error:', e);
      return null;
    }
  },
};
