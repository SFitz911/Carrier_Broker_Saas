import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Carrier Board - Two-Way Rating Platform</title>
        <meta name="description" content="Two-way rating platform for freight industry" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🚛 Carrier Board
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Two-Way Rating Platform for the Freight Industry
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Carrier Board</h2>
              <p className="text-gray-700 mb-4">
                Building transparency and fairness in freight brokering.
              </p>
              <p className="text-gray-600">
                A Nextwork.org Student DevOps Project
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">For Carriers</h3>
                  <p className="text-sm text-blue-700 mt-2">Rate and review brokers</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900">For Brokers</h3>
                  <p className="text-sm text-green-700 mt-2">Rate and review carriers</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900">Verified</h3>
                  <p className="text-sm text-purple-700 mt-2">DOT/MC number validation</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  Status: In Development | Phase 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

