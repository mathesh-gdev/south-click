import React from 'react';
import { SubmitClient } from './SubmitClient';

export function generateStaticParams() {
  return [
    { taskId: 'tsk_01' },
    { taskId: 'tsk_02' },
    { taskId: 'tsk_03' },
    { taskId: 'tsk_04' },
  ];
}

export default function SubmitDeliverablePage() {
  return <SubmitClient />;
}
