// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/app/components/shared/map'), {
        loading: () => <p className="text-center">Loading map...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-amber-900">Botswana's Rich Heritage Sites</h1>
      <Map /> {/* Shows all locations from `locations` object */}
    </div>
  );
}