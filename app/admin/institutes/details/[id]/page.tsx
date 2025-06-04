'use client';
import { useParams } from 'next/navigation';
import { InstitutesForm } from '@/components/admin/forms/InstituteForm';

export default function DetailsInstitutePage() {
  const params = useParams();
  let id: string = params.id as string;

  return (
    <div>
      <InstitutesForm _id={id} />
    </div>
  );
}
