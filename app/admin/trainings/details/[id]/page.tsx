'use client';
import { useParams } from 'next/navigation';
import { TrainingForm } from '@/components/admin/forms/TrainingForm';

export default function DetailsPortfolioPage() {
  const params = useParams();
  let id: string = params.id as string;
  return <TrainingForm _id={id} />;
}
