import { fetchPosts } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import PostsClient from './Posts.client';
import { Post } from '@/types/post';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function PostsPage({ params }: Props) {
  const { slug } = await params;
  console.log(slug);
  const userId = slug[0] === 'All' ? undefined : (slug[0] as string);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', '', 1, userId],
    queryFn: () => fetchPosts({ searchText: '', page: 1, userId }),
  });

  const initialData = queryClient.getQueryData<{ posts: Post[]; totalCount: number }>([
    'posts',
    '',
    1,
    userId,
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient initialData={initialData!} userId={userId} />
    </HydrationBoundary>
  );
}
