import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Community Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the community hub. Choose a section below:
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>
          <Link href="/community/admin" className="text-blue-600 hover:underline">
            Admin Panel
          </Link>
        </li>
        <li>
          <Link href="/community/resources" className="text-blue-600 hover:underline">
            Resources
          </Link>
        </li>
      </ul>

    </div>
  );
}
