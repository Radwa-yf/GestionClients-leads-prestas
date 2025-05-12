"use client"

import * as React from "react"
import { Link } from 'react-router-dom';


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function SimpleNavigationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {/* Premier élément du menu */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link to="/page-1">Page 1</Link> {/* Utilisation de href */}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>

                {/* Deuxième élément du menu */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link to="/page-2">Page 2</Link> {/* Utilisation de href */}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>

                {/* Troisième élément du menu */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link to="/page-3">Page 3</Link> {/* Utilisation de href */}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
