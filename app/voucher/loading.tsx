export default function VoucherLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">TOURVIS</div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Voucher Card */}
        <div className="bg-white rounded-lg shadow-xl border-2 border-blue-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-8 bg-white/20 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-64 animate-pulse"></div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-white/20 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex gap-4 mb-6">
                  <div className="w-24 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div>
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-48 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-36 animate-pulse"></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
                    <div className="w-32 h-32 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
