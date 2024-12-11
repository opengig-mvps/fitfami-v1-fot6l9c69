import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
        comments: true,
        likes: true,
      },
    });

    const data = recipes?.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
      user: {
        id: recipe.user.id,
        username: recipe.user.username,
        profilePicture: recipe.user.profilePicture,
      },
      comments: recipe.comments.length,
      likes: recipe.likes.length,
    }));

    return NextResponse.json({
      success: true,
      message: 'Recipes fetched successfully',
      data,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}