import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type RecipeRequestBody = {
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl?: string;
};

export async function PUT(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const body: RecipeRequestBody = await request.json();
    const { title, ingredients, instructions, imageUrl } = body;

    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title,
        ingredients,
        instructions,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}