import {useForm} from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/Components/ui/alert-dialog.jsx";
import {Button} from "@/Components/ui/button.jsx";
import { Trash } from "lucide-react";



export default function DestroyNote({ note }) {
    const { delete: destroy, errors, processing } = useForm();

    const handleDelete = () => {
        destroy(route('notes.destroy', note.id), {
            preserveScroll: true
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
                        <Button onClick={handleDelete} disabled={processing}>
                            Oui, supprimer
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
