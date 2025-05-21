'use client';
import { useParams } from 'next/navigation';

export default function DetailsStudyPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <h1>Details Study</h1>
      <p>Form to Details and edit one study will go here.</p>
      <p>
        <strong>ID:</strong> {id}
      </p>
    </div>
  );
}
