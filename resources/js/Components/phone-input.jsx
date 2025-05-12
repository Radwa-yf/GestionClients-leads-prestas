import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Input } from "@/Components/ui/input.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command.jsx";
import { ScrollArea } from "@/Components/ui/scroll-area.jsx";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils.jsx";

const FlagComponent = ({ country, countryName }) => {
    const Flag = flags[country];
    return (
        <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};
FlagComponent.displayName = "FlagComponent";

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
    <Input
        className={cn("rounded-e-lg rounded-s-none", className)}
        placeholder="06 37 67 56 45"
        {...props}
        ref={ref}
    />
));
InputComponent.displayName = "InputComponent";

const CountrySelect = ({ disabled, value, onChange, options }) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selectedCountry, setSelectedCountry] = React.useState(value);

    const filteredOptions = options.filter((x) =>
        x.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (country) => {
        if (!country) return; // Empêche la sélection d'un pays vide
        onChange(country);
        setSelectedCountry(country);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn("flex gap-1 rounded-e-none rounded-s-lg px-3")}
                    disabled={disabled}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <FlagComponent country={selectedCountry || "FR"} countryName={selectedCountry || "France"} />
                    <ChevronsUpDown className={cn("-mr-2 h-4 w-4 opacity-50", disabled ? "hidden" : "opacity-100")} />
                </Button>
            </PopoverTrigger>
            {open && (
                <PopoverContent className="w-[300px] p-0 z-[9999]">
                    <Command>
                        <CommandInput
                            placeholder="Search country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <CommandList>
                            <ScrollArea className="h-72">
                                {filteredOptions.length === 0 ? (
                                    <CommandEmpty>No country found.</CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {filteredOptions.slice(0, 20).map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                className="gap-2"
                                                onClick={() => handleSelect(option.value)}
                                            >
                                                <FlagComponent country={option.value} countryName={option.label} />
                                                <span className="flex-1 text-sm">{option.label}</span>
                                                <span className="text-foreground/50 text-sm">
                                                    {`+${RPNInput.getCountryCallingCode(option.value)}`}
                                                </span>
                                                {option.value === selectedCountry && (
                                                    <CheckIcon className="ml-auto h-4 w-4 opacity-100" />
                                                )}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            )}
        </Popover>
    );
};

const PhoneInput = React.forwardRef(({ className, onChange, ...props }, ref) => {
    return (
        <RPNInput.default
            defaultCountry="FR"
            value={props.value || ""}
            onChange={(value) => onChange && onChange(value || "")}
            {...props}
        />
    );
});
PhoneInput.displayName = "PhoneInput";

// --- Exemple d'utilisation avec une liste de pays limitée --- //

const CountrySelector = () => {
    const allCountries = [
        { label: "France", value: "FR" },
        { label: "Belgique", value: "BE" },
        { label: "Canada", value: "CA" },
        { label: "États-Unis", value: "US" },
        { label: "Suisse", value: "CH" },
        { label: "Allemagne", value: "DE" },
        { label: "Royaume-Uni", value: "GB" },
        { label: "Italie", value: "IT" },
        { label: "Espagne", value: "ES" },
    ];

    const [selectedCountry, setSelectedCountry] = React.useState("");

    return (
        <div className="w-64 p-4 border rounded-lg shadow-lg">
            <CountrySelect
                options={allCountries}
                value={selectedCountry}
                onChange={setSelectedCountry}
            />
            {selectedCountry && (
                <p className="mt-2 text-gray-700">Pays sélectionné : {selectedCountry}</p>
            )}
        </div>
    );
};

export { PhoneInput, CountrySelector };
