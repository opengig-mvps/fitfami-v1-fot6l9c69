import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function DELETE(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params?.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const session: any = await getServerSession({ req: request });
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session?.user?.id;

    await prisma.like.deleteMany({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    return NextResponse.json({ success: true, message: 'Like removed successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('Error removing like:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}