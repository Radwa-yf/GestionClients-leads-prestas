import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader, DrawerTitle,
    DrawerTrigger
} from "@/Components/ui/drawer.jsx";
import { Button } from '@/Components/ui/button.jsx';
import { Input } from '@/Components/ui/input.jsx';
import { useForm } from "@inertiajs/react";

export default function LeadPotentialValue({ lead = {}, trigger }) {
    console.log("Lead reçu dans LeadPotentialValue:", lead);

    if (!lead || !lead.id) {
        return <div>Lead non trouvé</div>;
    }

    const [open, setOpen] = useState(false); // Gère l'état du Drawer (ou du panneau)
    const { data, setData, put, errors, processing } = useForm({
        valeur_potentielle: lead.valeur_potentielle ?? 0, // Si lead.valeur_potentielle n'est pas défini, on met 0
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('leads.value.update', lead.id), {
            preserveScroll: true, // Préserve le défilement de la page
            onSuccess: () => setOpen(false), // Ferme le panneau une fois la mise à jour réussie
        });
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild><div>{trigger}</div></DrawerTrigger> {/* Le déclencheur du Drawer (par exemple un bouton) */}
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">
                            Valeur potentielle en €
                        </DrawerTitle>
                        <DrawerDescription className="text-center">
                            Une fois client, combien de valeur potentielle ce lead pourrait-il générer ?
                        </DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={submit}>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="flex-1 text-center">
                                    <Input
                                        type="number"
                                        className="text-center"
                                        placeholder="340"
                                        value={data.valeur_potentielle}
                                        onChange={(e) =>
                                            setData('valeur_potentielle', parseFloat(e.target.value)) // Met à jour la valeur de l'input
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button type="submit" disabled={processing}>Enregistrer</Button> {/* Bouton pour enregistrer la valeur */}
                            <DrawerClose asChild>
                                <Button variant="outline">Annuler</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
