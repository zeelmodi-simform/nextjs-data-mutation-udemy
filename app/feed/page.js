import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// export const metadata = {
//   title: 'Browse all our X posts.',
//   description: 'Browse our latest post',
// }

export async function generateMetadata(data) {
  const posts = await getPosts();

  return {
    title: `Browse all ${posts.length} our posts.`,
    description: 'Browse all our posts.'
  }
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
