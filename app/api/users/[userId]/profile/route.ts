import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type UserProfileUpdateBody = {
  email?: string;
  username?: string;
  name?: string;
  profilePicture?: string;
};

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: UserProfileUpdateBody = await request.json();

    const { email, username, name, profilePicture } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: email ? String(email) : undefined,
        username: username ? String(username) : undefined,
        name: name ? String(name) : undefined,
        profilePicture: profilePicture ? String(profilePicture) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}