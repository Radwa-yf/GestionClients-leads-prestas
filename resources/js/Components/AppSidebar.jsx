import { Sidebar } from "@/components/ui/sidebar";
import { Link, usePage } from '@inertiajs/react';
import { HomeIcon, UsersIcon, BriefcaseIcon } from '@heroicons/react/solid';
import { SettingsIcon } from "lucide-react";
import { useState } from 'react';

export const AppSidebar = () => {
    const user = usePage().props.auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <Sidebar className="bg-gray-100 text-gray-900 p-4 border-r-2 border-gray-300">
            <nav>
                {/* Section Profil et Dropdown */}
                <div className="flex items-center justify-between p-2 mb-4 border-b-2 border-gray-300">
                    {/* Avatar Utilisateur */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <span className="font-medium">{user.name}</span>
                    </div>

                    {/* Dropdown pour Profil et Log Out */}
                    {dropdownOpen && (
                        <div className="absolute top-16 left-0 w-48 bg-white shadow-md rounded-lg border border-gray-200 mt-2">
                            <ul className="space-y-2 py-2">
                                <li>
                                    <Link
                                        href={route('profile.edit')}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                    >
                                        Profil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Autres liens de la barre latérale */}
                <ul className="space-y-4">
                    <li>
                        <Link href={route('dashboard')} className="flex items-center p-2 hover:bg-gray-200 hover:text-gray-800 rounded-lg">
                            <HomeIcon className="h-5 w-5 mr-3" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href={route('leads.index')} className="flex items-center p-2 hover:bg-gray-200 hover:text-gray-800 rounded-lg">
                            <UsersIcon className="h-5 w-5 mr-3" /> Leads
                        </Link>
                    </li>
                    <li>
                        <Link href={route('customers.index')} className="flex items-center p-2 hover:bg-gray-200 hover:text-gray-800 rounded-lg">
                            <UsersIcon className="h-5 w-5 mr-3" /> Customers
                        </Link>
                    </li>
                    <li>
                        <Link href={route('option.index')} className="flex items-center p-2 hover:bg-gray-200 hover:text-gray-800 rounded-lg">
                            <SettingsIcon className="h-5 w-5 mr-3" /> Options
                        </Link>
                    </li>
                </ul>
            </nav>
        </Sidebar>
    );
};
