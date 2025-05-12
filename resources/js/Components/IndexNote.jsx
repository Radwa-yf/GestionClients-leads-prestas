import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet.jsx";
import { PenBox } from "lucide-react";
import moment from "moment/moment";
import ManageNote from "@/Components/ManageNote.jsx";
import { Badge } from "@/Components/ui/badge.jsx";
import { Button } from "@/Components/ui/button.jsx";

export default function IndexNote({ notes = [], morphableType, morphableId }) {
    console.log("Notes dans IndexNote:", notes);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Badge
                    className="cursor-pointer mt-2 text-[#60AFA8] border-[#60AFA8] hover:bg-[#60AFA8] hover:text-white transition-colors duration-200"
                    variant="outline"
                >
                    <PenBox className="w-4 h-4 me-2" />
                    {notes.length} note{notes.length > 1 ? "s" : ""}
                </Badge>
            </SheetTrigger>
            <SheetContent className="bg-white p-6 rounded-lg shadow-lg border border-[#60AFA8]">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-[#60AFA8]">Notes</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm text-gray-600">
                                    {moment(note.created_at).format("DD/MM/YYYY")}{" "}
                                    <span className="font-medium text-[#60AFA8]">
                                        {note.user?.name ? `${note.user.name} :` : "Utilisateur inconnu :"}
                                    </span>
                                </div>
                                <div className="mt-1 text-base italic text-gray-800">
                                    {note.content}
                                </div>
                                <div className="mt-2">
                                    <ManageNote
                                        note={note}
                                        morphable_type={note.morphable_type}
                                        morphable_id={note.morphable_id}
                                        trigger={
                                            <PenBox className="w-4 h-4 text-[#60AFA8] cursor-pointer inline" />
                                        }
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500">Aucune note disponible.</div>
                    )}
                    {/* Bouton pour ajouter une nouvelle note */}
                    <div className="mt-4">
                        <ManageNote
                            note={null}
                            morphable_type={morphableType}
                            morphable_id={morphableId}
                            trigger={
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#60AFA8] border-[#60AFA8] hover:bg-[#60AFA8] hover:text-white transition-colors duration-200"
                                >
                                    Ajouter une note
                                </Button>
                            }
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
