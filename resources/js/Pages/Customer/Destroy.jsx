import {useForm} from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog.jsx';
import { Button } from '@/Components/ui/button';
import { Trash } from 'lucide-react';


export default function Destroy({ customer }) {
    const { delete: destroy, errors, processing } = useForm();

    const handleDelete = () => {
        destroy(route('customers.destroy', customer.id), {
            preserveScroll: true,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="ml-3" variant="ghost">
                    <Trash color={'#EF4444'} size={10} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        La suppression est définitive.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={handleDelete}>
                            Oui, supprimer
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
