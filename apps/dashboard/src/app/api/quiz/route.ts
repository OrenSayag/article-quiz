import { auth } from '../../../auth';
import { getQuiz } from '@article-quiz/next-services/server';
import { InputContent } from '@article-quiz/shared-types';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': request.headers.get('origin') ?? '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
  const session = await auth();
  if (!session) {
    return new Response('unauthorized', {
      status: 401,
      headers: corsHeaders,
    });
  }
  const searchParams = request.nextUrl.searchParams;

  const rb = await getQuiz({
    userId: (session.user! as any).id,
    type: searchParams.get('type') as InputContent['contentType'],
    source: searchParams.get('source')!,
  });

  return Response.json(rb, {
    headers: corsHeaders,
    status: rb.status,
  });
}
