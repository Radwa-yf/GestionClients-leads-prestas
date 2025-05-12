import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, router } from "@inertiajs/react";
import { Button } from '@/Components/ui/button.jsx';
import { PlusIcon } from "lucide-react";

import { useState } from "react";
import Manage from "@/Pages/Customer/Manage.jsx";
import { Link } from "@inertiajs/react";


export default function CustomersIndex({ auth, customers }) {
    const [customersList, setCustomersList] = useState(customers);
    const [search, setSearch] = useState("");

    // Fonction pour supprimer un client
    const deleteCustomer = (customerId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
            return;
        }
        router.delete(route('customers.destroy', customerId), {
            onSuccess: () => {
                setCustomersList(customersList.filter(c => c.id !== customerId));
                alert('Client supprimé avec succès');
            },
            onError: (error) => {
                console.error("Erreur lors de la suppression :", error);
                alert("Une erreur est survenue.");
            }
        });
    };

    const filteredCustomers = customersList.filter((customer) => {
        const searchLower = search.toLowerCase();
        return (
            (customer.name && customer.name.toLowerCase().includes(searchLower)) ||
            (customer.email && customer.email.toLowerCase().includes(searchLower))
        );
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-900">Liste des Clients</h2>
                    <Manage
                        trigger={
                            <Button variant="outline" className="ms-3 text-lg px-5 py-2">
                                <PlusIcon className="mr-2 h-5 w-5" /> Ajouter un Client
                            </Button>
                        }
                        customer={customers}
                    />
                </div>
            }
        >
            <Head title="Liste des Clients" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                {/* Formulaire de recherche */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Tableau des clients */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border border-gray-200 bg-gray-100 text-left">Nom</th>
                            <th className="py-2 px-4 border border-gray-200 bg-gray-100 text-left">Email</th>
                            <th className="py-2 px-4 border border-gray-200 bg-gray-100 text-left">Téléphone</th>
                            <th className="py-2 px-4 border border-gray-200 bg-gray-100 text-left">Adresse</th>
                            <th className="py-2 px-4 border border-gray-200 bg-gray-100 text-left">Ville</th>
                            <th className="py-2 px-4 border border-gray-200 bg-gray-100 text-left">Pays</th>
                            <th className="py-2 px-4 border border-gray-200 bg-gray-100 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4 px-4">Aucun client trouvé.</td>
                            </tr>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td className="py-2 px-4 border border-gray-200">
                                        <Link
                                            href={route("customers.show", customer.id)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {customer.name}
                                        </Link>
                                    </td>                                    <td className="py-2 px-4 border border-gray-200">{customer.email}</td>
                                    <td className="py-2 px-4 border border-gray-200">{customer.phone}</td>
                                    <td className="py-2 px-4 border border-gray-200">{customer.address}</td>
                                    <td className="py-2 px-4 border border-gray-200">{customer.city}</td>
                                    <td className="py-2 px-4 border border-gray-200">{customer.country}</td>
                                    <td className="py-2 px-4 border border-gray-200 flex justify-center gap-2">
                                        <Manage
                                            trigger={
                                                <Button variant="outline" className="text-[#60AFA8] border-[#60AFA8] hover:bg-[#60AFA8] hover:text-white">
                                                    Modifier
                                                </Button>
                                            }
                                            customer={customer}
                                        />
                                        <Button
                                            variant="outline"
                                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                                            onClick={() => deleteCustomer(customer.id)} // Ici, on utilise la fonction deleteCustomer
                                        >
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
