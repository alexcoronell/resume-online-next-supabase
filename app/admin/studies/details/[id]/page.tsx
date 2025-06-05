'use client';
import { useParams } from 'next/navigation';
import { StudyForm } from '@/components/admin/forms/StudyForm';
export const runtime = 'edge';

export default function DetailsStudyPage() {
  const params = useParams();
  let id: string = params.id as string;

  return (
    <div>
      <div>
        <StudyForm _id={id} />
      </div>
    </div>
  );
}
