import React from 'react';
import { ReviewClient } from './ReviewClient';

export function generateStaticParams() {
  return [
    { taskId: 'tsk_01' },
    { taskId: 'tsk_02' },
    { taskId: 'tsk_03' },
    { taskId: 'tsk_04' },
  ];
}

export default function ReviewPage() {
  return <ReviewClient />;
}
