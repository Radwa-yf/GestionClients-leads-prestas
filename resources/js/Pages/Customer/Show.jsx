import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import { Button } from '@/Components/ui/button.jsx';
import { Card } from "@/Components/ui/card.jsx";
import Manage from "@/Pages/Customer/Manage.jsx";
import IndexNote from "@/Components/IndexNote.jsx";
import ManagePrestation from "@/Pages/Prestations/Create.jsx";
import {PlusIcon} from "lucide-react";
export default function CustomerShow({ auth, customer }) {
    const { companies } = usePage().props;

    const deleteCustomer = () => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) return;
        router.delete(route('customers.destroy', customer.id), {
            onSuccess: () => alert('Client supprimé avec succès'),
            onError: () => alert("Une erreur est survenue."),
        });
    };
    const handleAddPrestation = () => {
        router.get(route('customers.services.create', customer.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Détail du client - ${customer.name}`} />
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        {/* Nom du client en noir */}
                        <h1 className="text-4xl font-extrabold text-black tracking-wide uppercase">
                            {customer.name}
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 shadow-lg border border-[#60AFA8]">
                        <h2 className="text-xl font-semibold text-[#60AFA8] mb-4">Informations</h2>
                        <ul className="space-y-3 pl-2">
                            <li><strong>Contact :</strong> {customer.email} - {customer.phone}</li>
                            <li>
                                <strong>Adresse
                                    :</strong> {customer.address}, {customer.zip} {customer.city} ({customer.country})
                            </li>
                        </ul>
                    </Card>
                    <Card className="p-6 shadow-lg border border-[#60AFA8]">
                        <h2 className="text-xl font-semibold text-[#60AFA8] mb-4">Lead d'origine</h2>
                        {customer.leads.length > 0 ? (
                            <ul className="mt-3 space-y-2">
                                <li>
                                    <strong>Date de création
                                        :</strong> {new Date(customer.leads[0].created_at).toLocaleString()}
                                </li>
                                <li>
                                    <strong>Projet :</strong> <i>{customer.leads[0].project}</i>
                                </li>
                                <li>
                                    <strong>Source :</strong> {customer.leads[0].source}
                                </li>
                            </ul>
                        ) : (
                            <p>Aucun lead disponible</p>
                        )}
                    </Card>
                </div>
                {/* Bouton pour ajouter une prestation */}
                <div className="mt-8">
                    <ManagePrestation
                        trigger={
                            <Button variant="outline" className="text-lg px-5 py-2">
                                <PlusIcon className="mr-2 h-5 w-5"/> Ajouter une Prestation
                            </Button>
                        }
                        companies={companies}
                        customer={customer}
                    />
                </div>

                {/* Intégration de la gestion des notes */}
                <div className="mt-6">
                    <IndexNote
                        notes={customer.notes}
                        morphableType="App\Models\Customer"
                        morphableId={customer.id}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
