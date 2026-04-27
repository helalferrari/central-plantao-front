import { Card } from "@/components/ui/base";

export default function ContractsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-md" />
          <div className="h-4 w-72 bg-slate-100 animate-pulse rounded-md" />
        </div>
        <div className="h-10 w-full md:w-32 bg-slate-200 animate-pulse rounded-md" />
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100">
          <div className="h-10 w-full max-w-sm bg-slate-50 animate-pulse rounded-lg" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Name', 'Period', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-4">
                    <div className="h-3 w-16 bg-slate-200 animate-pulse rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-slate-100 animate-pulse rounded" />
                      <div className="h-3 w-16 bg-slate-50 animate-pulse rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-40 bg-slate-50 animate-pulse rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-5 w-16 bg-slate-100 animate-pulse rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-8 w-8 bg-slate-50 animate-pulse rounded ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
