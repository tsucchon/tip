import Image from 'next/image';
import { Staff } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { User, Briefcase, Calendar } from 'lucide-react';

interface StaffCardProps {
  staff: Staff;
}

export default function StaffCard({ staff }: StaffCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      {/* スタッフ写真と基本情報 */}
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={staff.photoUrl}
            alt={staff.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 truncate">
            {staff.name}
          </h2>
          <p className="text-sm text-gray-500">{staff.nameKana}</p>
        </div>
      </div>

      {/* 職位と部署 */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
          <Briefcase className="w-4 h-4 mr-1" />
          {staff.position}
        </div>
        <div className="flex items-center text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full">
          <User className="w-4 h-4 mr-1" />
          {staff.department}
        </div>
      </div>

      {/* 自己紹介 */}
      <div className="border-t pt-4">
        <p className="text-gray-700 leading-relaxed">
          {staff.bio}
        </p>
      </div>

      {/* 得意なこと */}
      {staff.specialties.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">得意なこと</h3>
          <div className="flex flex-wrap gap-2">
            {staff.specialties.map((specialty, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 入店日 */}
      <div className="flex items-center text-sm text-gray-500 border-t pt-4">
        <Calendar className="w-4 h-4 mr-2" />
        入店日: {formatDate(staff.joinedDate)}
      </div>
    </div>
  );
}
