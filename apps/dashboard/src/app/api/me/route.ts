import { auth } from '../../../auth';
import { getUserInfo } from '@article-quiz/next-services/server';

export async function GET(request: Request) {
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
  const userInfo = await getUserInfo({
    userId: (session.user! as any).id,
  });
  return Response.json(userInfo, {
    headers: corsHeaders,
  });
}
