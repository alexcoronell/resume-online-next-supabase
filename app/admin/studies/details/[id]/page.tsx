'use client';
import { useParams } from 'next/navigation';
import { StudyForm } from '@/components/admin/forms/StudyForm';

export default function DetailsStudyPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <div>
        <StudyForm />
      </div>
    </div>
  );
}
