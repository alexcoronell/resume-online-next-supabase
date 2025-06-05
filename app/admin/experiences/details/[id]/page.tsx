'use client';
import { useParams } from 'next/navigation';
import { ExperiencesForm } from '@/components/admin/forms/ExperienceForm';
export const runtime = 'edge';

export default function DetailsInstitutePage() {
  const params = useParams();
  let id: string = params.id as string;

  return (
    <div>
      <ExperiencesForm _id={id} />
    </div>
  );
}
