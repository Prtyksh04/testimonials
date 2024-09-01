'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TestimonalTest from '@/app/Components/TestimonalTest';

function Search() {
  const searchParams = useSearchParams();
  const space = searchParams?.get('space');
  return (
    <TestimonalTest spaceName={space as string} />
  )
}

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}

export default Page;
