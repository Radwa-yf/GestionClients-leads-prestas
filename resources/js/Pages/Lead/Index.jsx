import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Button } from '@/Components/ui/button.jsx';
import { CheckCircle, Grip, PlusIcon, PhoneMissed, Loader } from "lucide-react";
import CreateLead from "@/Pages/Lead/Create.jsx";
import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card.jsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Badge } from '@/Components/ui/badge.jsx';
import Show from "@/Pages/Lead/Show.jsx";
import {useState} from "react";

export default function Index({ auth, leads, companies }) {
    const [search, setSearch] = useState("");
    const filteredLeads = leads.filter((lead) => {
        const searchLower = search.toLowerCase();
        return (
            (lead.name && lead.name.toLowerCase().includes(searchLower)) ||
            (lead.email && lead.email.toLowerCase().includes(searchLower)) ||
            (lead.sites && lead.sites.toLowerCase().includes(searchLower))
        );
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Leads
                    </h2>
                    <CreateLead
                        trigger={
                            <Button variant="outline" className="ms-3 text-lg px-5 py-2">
                                <PlusIcon className="mr-2 h-5 w-5" /> Créer un lead
                            </Button>
                        }
                        companies={companies}
                        leads={leads}
                    />
                </div>
            }
        >
            <Head title="Leads" />
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                {/* Formulaire de recherche déplacé ici */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher par nom, mail ou site..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="flex space-x-6 mt-5">
                    {/* Section "À traiter" */}
                    <div className="w-1/3">
                        <h3 className="font-extrabold text-2xl text-gray-800 flex items-center mb-5">
                            <Grip className="mr-2 h-6 w-6 t" style={{color: 'hsl(175,33%,53%)'}}/> À traiter{" "}
                            {leads.filter((lead) => lead.status === 'new').length > 0 && (
                                <Badge variant="destructive" className="ms-2 px-3 py-1 text-lg">
                                    {leads.filter((lead) => lead.status === 'new').length}
                                </Badge>
                            )}
                        </h3>
                        {leads.filter((lead) => lead.status === 'new').length === 0 ? (
                            <Card
                                className="bg-blue-50 p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300 border border-blue-200">
                                <CardHeader>
                                    <CardTitle>
                                        <CheckCircle className="h-10 w-10 text-blue-500 mx-auto"/>
                                    </CardTitle>
                                    <CardDescription className="pt-4 text-lg text-gray-600">
                                        Aucun lead à traiter pour l'instant.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ) : (
                            <ScrollArea className="h-[70vh] overflow-y-auto rounded-md">
                                {filteredLeads.filter((lead) => lead.status === 'new').map((lead) => (
                                    <Show lead={lead} key={lead.id} companies={companies}/>
                                ))}
                            </ScrollArea>
                        )}
                    </div>

                    {/* Section "Pas encore de réponse" */}
                    {leads.filter((lead) => lead.status === 'no-response').length > 0 && (
                        <div className="w-1/3">
                            <h3 className="font-extrabold text-2xl text-gray-800 flex items-center mb-5">
                                <PhoneMissed className="mr-2 h-6 w-6 " style={{color: 'hsl(175,33%,53%)'}}/> Pas encore
                                de réponse
                                <Badge variant="secondary" className="ms-2 px-3 py-1 text-lg">
                                    {leads.filter((lead) => lead.status === 'no-response').length}
                                </Badge>
                            </h3>
                            <ScrollArea className="h-[70vh] overflow-y-auto rounded-md">
                                {filteredLeads.filter((lead) => lead.status === 'no-response').map((lead) => (
                                    <Show lead={lead} key={lead.id} companies={companies}/>
                                ))}
                            </ScrollArea>
                        </div>
                    )}

                    {/* Section "En attente closing" */}
                    {leads.filter((lead) => lead.status === 'waiting').length > 0 && (
                        <div className="w-1/3">
                            <h3 className="font-extrabold text-2xl text-gray-800 flex items-center mb-5">
                                <Loader className="mr-2 h-6 w-6 " style={{color: 'hsl(175,33%,53%)'}}/> En attente
                                closing
                                <Badge variant="secondary" className="ms-2 px-3 py-1 text-lg">
                                    {leads.filter((lead) => lead.status === 'waiting').length}
                                </Badge>
                            </h3>
                            <ScrollArea className="h-[70vh] overflow-y-auto rounded-md">
                                {filteredLeads.filter((lead) => lead.status === 'waiting').map((lead) => (
                                    <Show lead={lead} key={lead.id} companies={companies}/>
                                ))}
                            </ScrollArea>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
