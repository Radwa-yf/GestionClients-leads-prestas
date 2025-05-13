import { useState } from "react";
import {useForm, usePage} from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import InputError from "@/Components/InputError";

export default function ManagePrestation({ trigger, companies = [], customer, prestation = null }) {
    console.log("Companies:", companies);
    console.log('Customer:', customer);



    const [open, setOpen] = useState(false);
    const { data, setData, post, put, errors, processing } = useForm({
        company_id: prestation?.company_id || '',
        type: prestation?.type || '',
        sites: prestation?.sites || '',
        price: prestation?.price || '',
        abonnement_duration: prestation?.abonnement_duration || '',
        keywords: prestation?.keywords || '',
        recurrence: prestation?.recurrence || '',
    });

    const prestationTypesByCompany = {
        1: ['Type Qwenty A', 'Type Qwenty B'],
        2: ['Maintenance', 'Hébergement', 'Les deux', 'Réparation'],
        3: ['Technique SEO', 'Prestation ponctuelle', 'Rédaction articles de blog'],
    };

    const submit = (e) => {
        e.preventDefault();

        if (!customer || !customer.id) {
            console.error("Customer ID is missing!");
            return;
        }

        const routeName = prestation
            ? route('customers.services.update', {
                customer: prestation.customer_id,
                prestation: prestation.id
            })
            : route('customers.services.store', { customer: customer.id });

        const method = prestation ? put : post;

        method(routeName, {
            onSuccess: () => setOpen(false),
            onError: () => console.log('Erreur lors de la soumission'),
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{prestation ? "Modifier la Prestation" : "Créer une Prestation"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        {/* Sélection de l'entreprise */}
                        <div>
                            <Label htmlFor="company_id">Entreprise</Label>
                            <select
                                id="company_id"
                                value={data.company_id}
                                onChange={(e) => setData('company_id', e.target.value)}
                                className="border rounded p-2 w-full"
                            >
                                <option value="">Sélectionnez une entreprise</option>
                                {Array.isArray(companies) &&
                                    companies.map((company) => {
                                        if (!company || !company.id) {
                                            console.error("Invalid company:", company); // Debugging
                                            return null; // Ignore cette entrée invalide
                                        }
                                        return (
                                            <option key={company.id} value={company.id}>
                                                {company.name}
                                            </option>
                                        );
                                    })
                                }

                            </select>
                            <InputError message={errors.company_id}/>
                        </div>

                        {/* Sélection du type de prestation */}
                        {data.company_id && (
                            <div>
                                <Label htmlFor="type">Type de prestation</Label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="border rounded p-2 w-full"
                                >
                                    <option value="">Sélectionnez un type</option>
                                    {prestationTypesByCompany[data.company_id] &&
                                        prestationTypesByCompany[data.company_id].map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))
                                    }
                                </select>
                                <InputError message={errors.type}/>
                            </div>
                        )}

                        {/* Liste des sites */}
                        <div>
                            <Label htmlFor="sites">Liste des sites</Label>
                            <Input
                                id="sites"
                                type="text"
                                placeholder="https://exemple.com, https://autre.com"
                                value={data.sites}
                                onChange={(e) => setData('sites', e.target.value)}
                            />
                            <InputError message={errors.sites}/>
                        </div>

                        {/* Prix */}
                        <div>
                            <Label htmlFor="price">Prix (€ HT)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="79"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            <InputError message={errors.price}/>
                        </div>
                        {/* Durée */}
                        <div>
                            <Label htmlFor="duration">Durée (en mois) (facultatif)</Label>
                            <Input
                                id="abonnement_duration"
                                type="number"
                                placeholder="12"
                                value={data.abonnement_duration}
                                onChange={(e) => setData('abonnement_duration', e.target.value)}
                            />
                            <InputError message={errors.abonnement_duration}/>
                        </div>

                        {/* Champs spécifiques à Azerto */}
                        {parseInt(data.company_id) === 3 && (
                            <>
                                <div>
                                    <Label htmlFor="mot_cles">Mot(s) clés</Label>
                                    <Input
                                        id="keywords"
                                        type="text"
                                        placeholder="Entrez les mots clés"
                                        value={data.keywords}
                                        onChange={(e) => setData('keywords', e.target.value)}
                                    />
                                    <InputError message={errors.keywords}/>
                                </div>
                                <div>
                                    <Label htmlFor="recurrence">Récurrence</Label>
                                    <select
                                        id="recurrence"
                                        value={data.recurrence}
                                        onChange={(e) => setData('recurrence', e.target.value)}
                                        className="border rounded p-2 w-full"
                                    >
                                        <option value="">Sélectionnez une récurrence</option>
                                        <option value="Mensuel">Mensuel</option>
                                        <option value="Hebdomadaire">Hebdomadaire</option>
                                        <option value="Annuel">Annuel</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {prestation ? "Mettre à jour" : "Créer"} la Prestation
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
