import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog.jsx';
import InputError from '@/Components/InputError.jsx';
import { Textarea } from '@/Components/ui/textarea.jsx';
import { Button } from '@/Components/ui/button.jsx';
import { useForm } from '@inertiajs/react';
import DestroyNote from '@/Components/DestroyNote.jsx';



export default function ManageNote({ note, morphable_type, morphable_id, trigger }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, put, errors } = useForm({
        morphable_type: morphable_type,
        morphable_id: morphable_id,
        content: note?.content || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (note) {
            put(route('notes.update', note.id), {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        } else {
            post(route('notes.store'), {
                onSuccess: () => setOpen(false),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>{note ? 'Modifier la note' : 'Créer une note'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-2 items-center">
                            <Textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                id="content"
                                placeholder="Note"
                            />
                            <InputError className="mt-2" message={errors.content} />
                        </div>
                    </div>
                    <DialogFooter>
                        {note && <DestroyNote note={note} />}
                        <Button type="submit">Enregistrer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
