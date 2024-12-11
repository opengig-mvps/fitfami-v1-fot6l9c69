import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const body = await request.json();
    const { content, userId } = body;

    if (!content || !userId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const recipe = await prisma.recipe.findFirst({ where: { id: recipeId } });
    if (!recipe) {
      return NextResponse.json({ success: false, message: 'Recipe not found' }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}