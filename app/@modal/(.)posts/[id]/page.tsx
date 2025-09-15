import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPostById } from '@/lib/api';
import PostPreviewClient from './PostPreview.client';

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function PostPreview({ params }: PostDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  queryClient.prefetchQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
