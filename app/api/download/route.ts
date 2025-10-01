import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'Rule_book_include.pdf');
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': 'attachment; filename=Rule_book_include.pdf',
      'Content-Type': 'application/pdf',
    },
  });
}