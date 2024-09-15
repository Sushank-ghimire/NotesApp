// app/api/notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/utils/DbConnect'; 
import UserNotes from '@/models/User.model';

export async function GET(req: NextRequest) {
  try {
    // Extract email from query parameters (you might use authentication to get the email)
    const { searchParams } = new URL(req.url);

    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await connectDb();

    // Find the user by email
    const user = await UserNotes.findOne({ email });
    
    // Return the notes
    return NextResponse.json(user.notes);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching notes', error: error.message }, { status: 500 });
  }
}
