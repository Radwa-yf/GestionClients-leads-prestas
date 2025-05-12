import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from '@/Components/ui/button.jsx';
import InputError from "@/Components/InputError.jsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog.jsx';
import { PhoneInput } from '@/Components/phone-input.jsx';
import { Label } from "@/Components/ui/label.jsx";
import { Textarea } from "@/Components/ui/textarea.jsx";
import React from "react";



export default function CreateLead({ lead, trigger, companies }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, errors, processing } = useForm({
        name: lead?.name || '',
        email: lead?.email || '',
        phone: lead?.phone || '',
        sites: lead?.sites || '',
        project: lead?.project || '',
        status: lead?.status || '',
        source: lead?.source || '',
        gclid: lead?.gclid || '',
        company_id: lead?.company_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (lead) {
            put(route('leads.update', lead.id), {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        } else {
            post(route('leads.store'), {
                onSuccess: () => setOpen(false),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* Ici, on clone le bouton `trigger` pour lui ajouter `onClick` */}
                {React.cloneElement(trigger, {
                    onClick: () => setOpen(true),
                })}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>{lead ? "Modifier le lead" : "Créer un lead"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        {/* Sélection de l'entreprise */}
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="company_id">Entreprise</Label>
                            <select
                                id="company_id"
                                value={data.company_id}
                                onChange={(e) => setData("company_id", e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="">Sélectionnez une entreprise</option>
                                {Array.isArray(companies) &&
                                    companies.map((company) => (
                                        <option key={company.id} value={company.id}>
                                            {company.name}
                                        </option>
                                    ))}
                            </select>
                            <InputError className="mt-2" message={errors.company_id}/>
                        </div>

                        {/* Champ pour le nom */}
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="name">Nom</Label>
                            <input
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                id="name"
                                placeholder="Nom"
                                className="border rounded px-2 py-1"
                            />
                            <InputError className="mt-2" message={errors.name}/>
                        </div>

                        {/* Champ pour l'email */}
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="email">Email</Label>
                            <input
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                id="email"
                                placeholder="Email"
                                className="border rounded px-2 py-1"
                            />
                            <InputError className="mt-2" message={errors.email}/>
                        </div>

                        {/* Champ pour le téléphone */}
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="phone">Téléphone</Label>
                            <PhoneInput
                                id="phone"
                                value={data.phone}
                                onChange={(value) => setData('phone', value)}
                                placeholder="Téléphone"
                            />
                            <InputError className="mt-2" message={errors.phone}/>
                        </div>

                        {/* Champ pour les sites */}
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="sites">Sites</Label>
                            <input
                                value={data.sites}
                                onChange={(e) => setData("sites", e.target.value)}
                                id="sites"
                                placeholder="Sites"
                                className="border rounded px-2 py-1"
                            />
                            <InputError className="mt-2" message={errors.sites}/>
                        </div>

                        {/* Champ pour le projet */}
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="project">Projet</Label>
                            <Textarea
                                value={data.project}
                                onChange={(e) => setData("project", e.target.value)}
                                id="project"
                                placeholder="Projet"
                                className="border rounded px-2 py-1"
                            />
                            <InputError className="mt-2" message={errors.project}/>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="source">Source</Label>
                            <input
                                value={data.source}
                                onChange={(e) => setData("source", e.target.value)}
                                id="source"
                                placeholder="Source"
                                className="border rounded px-2 py-1"
                            />
                            <InputError className="mt-2" message={errors.source}/>
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {lead ? "Modifier" : "Créer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

