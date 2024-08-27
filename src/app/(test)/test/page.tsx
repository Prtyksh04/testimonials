// localhost:4000/testing/test
'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import TestimonalTest from '@/app/Components/TestimonalTest';

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const space = searchParams?.get('space');
  console.log(space);
  return (
    <TestimonalTest spaceName={space as string}/>
  );
}

export default Page;
