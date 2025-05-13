import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../Components/AppSidebar';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { BriefcaseIcon, HomeIcon, UsersIcon } from "@heroicons/react/solid";
import { SettingsIcon } from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Fonction pour fermer le menu après avoir cliqué sur un lien
    const handleLinkClick = () => {
        setShowMobileMenu(false);
    };

    return (
        <SidebarProvider>
            <div className="flex w-full">
                {/* Barre latérale (affichage desktop) */}
                <div className="w-64 bg-gray-800 text-white shadow-lg p-4 hidden sm:block">
                    <AppSidebar />
                    <div className="mt-8">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md text-white cursor-pointer">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700"
                                    >
                                        {user.name}
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                {/* Contenu principal */}
                <main className="flex-1 p-6 bg-gray-100 max-w-full">
                    {/* Barre de navigation mobile */}
                    <nav className="border-b border-gray-300 bg-white mb-4 sm:hidden">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Menu mobile */}
                    {showMobileMenu && (
                        <div className="fixed top-0 left-0 w-1/2 h-full bg-gray-800 text-white z-50 overflow-y-auto">
                            <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                                        <span className="text-white font-bold">{user.name[0]}</span>
                                    </div>
                                    <span className="text-white text-lg">{user.name}</span>
                                </div>
                                {/* Bouton de fermeture */}
                                <button
                                    className="text-white text-2xl"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    X
                                </button>
                            </div>

                            {/* Liens de navigation avec icônes */}
                            <div className="space-y-4 p-4">
                                <Link href="/dashboard" onClick={handleLinkClick} className="flex items-center space-x-4 text-white text-lg">
                                    <HomeIcon className="w-6 h-6" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link href="/leads" onClick={handleLinkClick} className="flex items-center space-x-4 text-white text-lg">
                                    <UsersIcon className="w-6 h-6" />
                                    <span>Leads</span>
                                </Link>
                                <Link href="/customers" onClick={handleLinkClick} className="flex items-center space-x-4 text-white text-lg">
                                    <UsersIcon className="w-6 h-6" />
                                    <span>Customers</span>
                                </Link>

                                {/* Dropdown Profil et Log Out */}
                                <div className="mt-4">
                                    <Link
                                        href={route('profile.edit')}
                                        onClick={handleLinkClick}
                                        className="block px-4 py-2 text-white hover:bg-gray-700"
                                    >
                                        Profil
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        onClick={handleLinkClick}
                                        className="block px-4 py-2 text-white hover:bg-gray-700"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contenu de la page avec le header */}
                    <div className="mb-6">
                        {header && <h1 className="text-3xl font-semibold text-gray-800">{header}</h1>}
                    </div>

                    {/* Contenu principal de la page */}
                    <div className="bg-white shadow-sm p-6 rounded-lg">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
