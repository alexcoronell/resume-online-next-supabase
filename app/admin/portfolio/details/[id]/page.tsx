'use client';
import { useParams } from 'next/navigation';
import { PortfolioForm } from '@/components/admin/forms/PortfiolioForm';

export default function DetailsPortfolioPage() {
  const params = useParams();
  let id: string = params.id as string;
  return (
    <div>
      <PortfolioForm _id={id} />
    </div>
  );
}
