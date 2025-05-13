import {useState} from "react";
import countries from 'i18n-iso-countries';
import frLocale from 'i18n-iso-countries/langs/fr.json';
import {router, useForm} from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog.jsx';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import InputError from "@/Components/InputError.jsx";
import { PhoneInput } from '@/Components/phone-input.jsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import Destroy from "@/Pages/Customer/Destroy.jsx";



countries.registerLocale(frLocale);

export default function Manage({ customer, lead, trigger }) {
    const isEditing = customer && customer.id;

    const countryList = countries.getNames('fr');
    const [open, setOpen] = useState(false);
    const { data, setData, post, put, errors, processing } = useForm({
        name: customer?.name || lead?.name || '',
        email: customer?.email || lead?.email || '',
        phone: customer?.phone || lead?.phone || '',
        address: customer?.address || '',
        zip: customer?.zip || '',
        city: customer?.city || '',
        country: customer?.country || '',
        lead_id: lead?.id || '',
    });
    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('customers.update', customer.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    router.visit(window.location.href, { replace: true, preserveScroll: true, preserveState: false });
                },
            });
        } else {
            post(route('customers.store'), {
                onSuccess: () => {
                    setOpen(false);
                    router.visit(window.location.href, { replace: true, preserveScroll: true, preserveState: false });
                },
            });
        }
    };
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
            onCloseAutoFocus={(event) => event.preventDefault()}
        >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>{ isEditing ? 'Modifier le client' : 'Créer un client' }</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                id="name"
                                placeholder="Nom"
                            />
                            <InputError className="mt-2" message={errors.name}/>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                id="email"
                                placeholder="Email"
                            />
                            <InputError className="mt-2" message={errors.email}/>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="phone">Téléphone</Label>
                            <PhoneInput
                                value={data.phone}
                                onChange={(e) => setData('phone', e)}
                                id="phone"
                                placeholder="Téléphone"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="sites">Adresse</Label>
                            <Input
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                id="sites"
                                placeholder="Adresse"
                            />
                            <InputError className="mt-2" message={errors.address}/>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="project">Code postal</Label>
                            <Input
                                value={data.zip}
                                onChange={(e) => setData('zip', e.target.value)}
                                id="zip"
                                placeholder="67000"
                            />
                            <InputError className="mt-2" message={errors.zip}/>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="status">Ville</Label>
                            <Input
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                id="city"
                                placeholder="Strasbourg"
                            />
                            <InputError className="mt-2" message={errors.city}/>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor="status">Pays</Label>
                            <Select
                                value={data.country}
                                onValueChange={(value) => setData('country', value)}
                            >
                                <SelectTrigger className="w-[100%]">
                                    <SelectValue placeholder="Choisir un pays"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Communs</SelectLabel>
                                        <SelectItem value="FR">France</SelectItem>
                                        <SelectItem value="BE">Belgique</SelectItem>
                                        <SelectItem value="CH">Suisse</SelectItem>
                                        <SelectItem value="LU">Luxembourg</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Tous</SelectLabel>
                                        {Object.entries(countryList)
                                            .filter(([code]) => !['FR', 'BE', 'CH', 'LU'].includes(code))
                                            .sort((a, b) => a[1].localeCompare(b[1]))
                                            .map(([code, name]) => (
                                                <SelectItem key={code} value={code}>{name}</SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.city}/>
                        </div>
                    </div>
                    <DialogFooter>
                        {customer && <Destroy customer={customer}/>}
                        <Button type="submit">Enregistrer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
