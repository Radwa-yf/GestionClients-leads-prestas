import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { formatFrenchPrice, truncateString } from "@/lib/utils.jsx";
import { Badge } from "@/Components/ui/badge.jsx";
import { Button } from '@/Components/ui/button.jsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu.jsx';
import {
    AtSignIcon,
    ChevronDown,
    EuroIcon,
    FileTextIcon,
    FrownIcon,
    GlobeIcon,
    Grip,
    Loader,
    MagnetIcon,
    PartyPopper,
    PhoneIcon,
    PhoneMissed,
    PlusIcon,
    SettingsIcon,
    SkullIcon,
} from "lucide-react";
import ManageNote from "@/Components/ManageNote.jsx";
import LeadPotentialValue from "@/Components/LeadPotentialValue.jsx";
import Manage from "@/Pages/Customer/Manage.jsx";
import CreateLead from "@/Pages/Lead/Create.jsx";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/Components/ui/hover-card.jsx';
import moment from 'moment/moment';
import IndexNote from "@/Components/IndexNote.jsx";

export default function Show({ lead , companies }) {

    const { data, setData, put, delete: destroy } = useForm({
        status: '',
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (data.status.length > 0) {
            put(route('leads.status.update', lead.id), {
                preserveScroll: true,
            });
        }
    }, [data]);

    const handleSpam = (lead) => {
        destroy(route('leads.spam', lead.id), {
            preserveScroll: true,
        });
    };

    return (
        <div
            className="bg-white p-3 rounded-lg shadow-md mb-4"
            style={{
                border: '1px solid hsl(202,21%,78%)',
                height: '200px'
            }}
        >
            {/* Badge valeur potentielle */}
            {lead.valeur_potentielle > 0 && (
                <Badge variant="default">{formatFrenchPrice(lead.valeur_potentielle)}</Badge>
            )}

            {lead.company && (
                <div className="text-sm font-semibold italic mt-0 mb-2"
                     style={{float: 'right', fontFamily: 'Arial, sans-serif', color: 'black', fontStyle: 'normal'}}>
                    {lead.company.name}
                </div>
            )}


            {/* Dropdown pour gérer le lead */}
            <span className="block mb-2">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="float-end p-0">
                            <ChevronDown className="w-4 h-4"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Gérer le lead</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                           <ManageNote
                               trigger={
                                   <DropdownMenuItem
                                       className="cursor-pointer"
                                       onSelect={(e) => {
                                           e.preventDefault();
                                           e.stopPropagation();
                                       }}
                                   >
                                       <PlusIcon className="mr-2 h-4 w-4"/>
                                       <span>Ajouter une note</span>
                                   </DropdownMenuItem>
                               }
                               morphable_type="App\Models\Lead"
                               morphable_id={lead.id}
                           />

                        </DropdownMenuGroup>

                        {/* Valeur potentielle */}
                        <DropdownMenuGroup>
                            {lead ? (
                                <LeadPotentialValue
                                    lead={lead}
                                    trigger={
                                        <DropdownMenuItem className="cursor-pointer"
                                                          onSelect={(e) => e.preventDefault()}>
                                            Valeur potentielle
                                        </DropdownMenuItem>
                                    }
                                />
                            ) : (
                                <div>Lead non trouvé</div>
                            )}
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            {/* Statut du lead */}
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <MagnetIcon className="mr-2 h-4 w-4"/>
                                    <span>Convertir</span>
                                </DropdownMenuSubTrigger>

                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem className="cursor-pointer"
                                                          onClick={() => setData('status', 'new')}>
                                            <Grip className="mr-2 h-4 w-4"/>
                                            <span>À traiter</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer"
                                                          onClick={() => setData('status', 'no-response')}>
                                            <PhoneMissed className="mr-2 h-4 w-4"/>
                                            <span>Pas encore de réponse</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer"
                                                          onClick={() => setData('status', 'waiting')}>
                                            <Loader className="mr-2 h-4 w-4"/>
                                            <span>En attente closing</span>
                                        </DropdownMenuItem>
                                        <Manage
                                            trigger={
                                                <DropdownMenuItem className="cursor-pointer"
                                                                  onSelect={(e) => e.preventDefault()}>
                                                    <PartyPopper className="mr-2 h-4 w-4"/>
                                                    <span>Nouveau client</span>
                                                </DropdownMenuItem>
                                            }
                                            lead={lead}
                                        />
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem className="cursor-pointer"
                                                          onClick={() => setData('status', 'lost')}>
                                            <FrownIcon className="mr-2 h-4 w-4"/>
                                            <span>Perdu</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator/>
                            <CreateLead
                                trigger={
                                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                        <SettingsIcon className="mr-2 h-4 w-4"/>
                                        <span>Modifier les données</span>
                                    </DropdownMenuItem>
                                }
                                lead={lead}
                                companies={companies}
                            />
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleSpam(lead)}>
                                <SkullIcon className="mr-2 h-4 w-4 text-red-600"/>
                                <span className="text-red-600">Spam</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>

            {/* Date de création et source */}
            <div className="text-sm font-semibold mb-2">
                <span>{moment(lead.created_at).format('DD/MM/YYYY')}</span>
                {lead.source && (
                    <Badge variant="secondary" className="ms-2">
                        {lead.source}
                    </Badge>
                )}
            </div>

            {/* Email, Téléphone et Site Web */}
            <p className="mt-2">
                <small>
                    {lead.email && (
                        <span className="block mb-1">
                            <AtSignIcon className="inline w-3 h-3 me-1"/>
                            <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        </span>
                    )}

                    {lead.phone && (
                        <span className="block mb-1">
                            <PhoneIcon className="inline w-3 h-3 me-1"/>
                            {lead.phone}
                        </span>
                    )}

                    {lead.sites && (
                        <span className="block mb-1">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <GlobeIcon className="inline w-3 h-3 me-1"/>{' '}
                                        {truncateString(lead.sites, 30)}
                                    </p>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <small>{lead.sites}</small>
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        </span>
                    )}
                </small>
            </p>

            {/* Projet */}
            <HoverCard>
                <HoverCardTrigger asChild>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <small>{truncateString(lead.project, 50)}</small>
                    </p>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <small>{lead.project}</small>
                    </p>
                </HoverCardContent>
            </HoverCard>

            {Array.isArray(lead.notes) && lead.notes.length > 0 && <IndexNote notes={lead.notes}/>}
        </div>
    );
}
