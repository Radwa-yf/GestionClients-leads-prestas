import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { leadsCount, customersCount, prestationsCount } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Accueil</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="p-4 bg-blue-50 rounded shadow">
                                <h3 className="text-lg font-semibold text-blue-700">📥 Leads</h3>
                                <p className="text-3xl font-bold">{leadsCount}</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded shadow">
                                <h3 className="text-lg font-semibold text-green-700">🤝 Clients</h3>
                                <p className="text-3xl font-bold">{customersCount}</p>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded shadow">
                                <h3 className="text-lg font-semibold text-yellow-700">📦 Prestations</h3>
                                <p className="text-3xl font-bold">{prestationsCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
