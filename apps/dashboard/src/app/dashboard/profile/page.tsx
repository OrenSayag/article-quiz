import { ProfileTemplate } from '@article-quiz/components';
import { auth } from '../../../auth';

export default async function ProfilePage() {
  const session = await auth();
  return <ProfileTemplate session={session} />;
}
