import { auth } from '../../../auth';
import { updateUserEnabledSites } from '@article-quiz/next-services/server';

export async function PUT(request: Request) {
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
  const reqBody = await request.json();
  const beRes = await updateUserEnabledSites({
    userId: (session.user as any).id,
    ...reqBody,
  });
  return Response.json(beRes, {
    headers: corsHeaders,
    status: beRes.status,
  });
}
