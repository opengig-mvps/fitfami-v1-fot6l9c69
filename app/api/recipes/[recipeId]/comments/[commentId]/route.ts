import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { recipeId: string, commentId: string } }
) {
  try {
    const recipeId = parseInt(params.recipeId, 10);
    const commentId = parseInt(params.commentId, 10);
    if (isNaN(recipeId) || isNaN(commentId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe or comment ID' }, { status: 400 });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
        recipeId: recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully',
      data: {},
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}