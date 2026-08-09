import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const ProfileSchema = z.object({
  skinTone: z.string().optional(),
  eyeColor: z.string().optional(),
  skinType: z.string().optional(),
  preferredStyle: z.string().optional(),
});

export async function updateBeautyProfile(data: any) {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const validatedData = ProfileSchema.parse(data);

  return await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    update: validatedData,
    create: {
      userId: session.user.id,
      ...validatedData,
    },
  });
}

export async function getBeautyProfile() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  });
}
