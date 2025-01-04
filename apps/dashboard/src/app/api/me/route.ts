import { auth } from '../../../auth';

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
  return Response.json(session.user, {
    headers: corsHeaders,
  });
}
