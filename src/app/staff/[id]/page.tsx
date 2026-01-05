import { notFound } from 'next/navigation';
import { getStaffById } from '@/lib/mockData';
import StaffTipForm from './StaffTipForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StaffPage({ params }: PageProps) {
  const { id } = await params;
  const staff = await getStaffById(id);

  if (!staff) {
    notFound();
  }

  return <StaffTipForm staff={staff} />;
}
