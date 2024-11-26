"use client";

import Link from "next/link";
import { Store, Home, Phone, Menu, X, Search, ShoppingCart, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart/cart-sheet";
import { useCart } from "@/store/cart";
import Image from "next/image";
import { SearchDropdown } from "@/components/search/search-dropdown";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Abarrotes",
    href: "/categories/abarrotes",
    subcategories: [
      { name: "Aceites", href: "/categories/abarrotes/aceites" },
      { name: "Arroz", href: "/categories/abarrotes/arroz" },
      { name: "Aderezos", href: "/categories/abarrotes/aderezos" },
      { name: "Azúcar/Endulzantes", href: "/categories/abarrotes/azucar-endulzantes" },
      { name: "Bebidas Calientes", href: "/categories/abarrotes/bebidas-calientes" },
      { name: "Conservas", href: "/categories/abarrotes/conservas" },
      { name: "Harinas", href: "/categories/abarrotes/harinas" },
      { name: "Pastas", href: "/categories/abarrotes/pastas" },
      { name: "Salsas", href: "/categories/abarrotes/salsas" },
      { name: "Jaleas/Flanes", href: "/categories/abarrotes/jaleas-flanes" },
      { name: "Sopas/Instantáneos", href: "/categories/abarrotes/sopas-instantaneos" },
      { name: "Legumbres", href: "/categories/abarrotes/legumbres" },
    ],
  },
  {
    name: "Bebestibles",
    href: "/categories/bebestibles",
    subcategories: [
      { name: "Bebidas", href: "/categories/bebestibles/bebidas" },
      { name: "Energéticas", href: "/categories/bebestibles/energeticas" },
      { name: "Jugos/Agua Mineral", href: "/categories/bebestibles/jugos-agua-mineral" },
    ],
  },
  {
    name: "Comida Mascota",
    href: "/categories/comida-mascota",
    subcategories: [
      { name: "Comida Gato", href: "/categories/comida-mascota/comida-gato" },
      { name: "Comida Perro", href: "/categories/comida-mascota/comida-perro" },
    ],
  },
  {
    name: "Cuidado Personal",
    href: "/categories/cuidado-personal",
    subcategories: [
      { name: "Desodorante", href: "/categories/cuidado-personal/desodorante" },
      { name: "Máquinas de Afeitar", href: "/categories/cuidado-personal/maquinas-de-afeitar" },
      { name: "Pañales Bebé", href: "/categories/cuidado-personal/panales-bebe" },
      { name: "Pañal Adulto", href: "/categories/cuidado-personal/panal-adulto" },
      { name: "Cepillos Dentales/Pasta de Dientes/Enjuagues Bucales", href: "/categories/cuidado-personal/cepillos-pasta-enjuagues" },
      { name: "Talcos", href: "/categories/cuidado-personal/talcos" },
      { name: "Shampoo/Acondicionador", href: "/categories/cuidado-personal/shampoo-acondicionador" },
      { name: "Toallas Húmedas", href: "/categories/cuidado-personal/toallas-humedas" },
    ],
  },
  {
    name: "Lácteos",
    href: "/categories/lacteos",
    subcategories: [
      { name: "Cremas", href: "/categories/lacteos/cremas" },
      { name: "Leche", href: "/categories/lacteos/leche" },
      { name: "Manjar", href: "/categories/lacteos/manjar" },
    ],
  },
  {
    name: "Limpieza/Hogar",
    href: "/categories/limpieza-hogar",
    subcategories: [
      { name: "Ambientales", href: "/categories/limpieza-hogar/ambientales" },
      { name: "Ampolletas", href: "/categories/limpieza-hogar/ampolletas" },
      { name: "Bolsas de Basura", href: "/categories/limpieza-hogar/bolsas-de-basura" },
      { name: "Ceras", href: "/categories/limpieza-hogar/ceras" },
      { name: "Cloro", href: "/categories/limpieza-hogar/cloro" },
      { name: "Detergentes/Suavizantes", href: "/categories/limpieza-hogar/detergentes-suavizantes" },
      { name: "Escobas", href: "/categories/limpieza-hogar/escobas" },
      { name: "Insecticidas", href: "/categories/limpieza-hogar/insecticidas" },
      { name: "Jabones", href: "/categories/limpieza-hogar/jabones" },
      { name: "Lava lozas", href: "/categories/limpieza-hogar/lava-lozas" },
      { name: "Limpiadores", href: "/categories/limpieza-hogar/limpiadores" },
      { name: "Desinfectantes", href: "/categories/limpieza-hogar/desinfectantes" },
      { name: "Papel Higiénico", href: "/categories/limpieza-hogar/papel-higienico" },
      { name: "Servilletas", href: "/categories/limpieza-hogar/servilletas" },
      { name: "Velas", href: "/categories/limpieza-hogar/velas" },
    ],
  },
  {
    name: "Industrial",
    href: "/categories/industrial",
    subcategories: [],
  },
];

const mainNavItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Tiendas", href: "/stores", icon: Store },
  { name: "Catálogo", href: "/catalog", icon: FileText },
  { name: "Contacto", href: "/contact", icon: Phone },
];

export default function Header() {
  const { items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-[#027046] text-white sticky top-0 z-50 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-24 h-12 sm:w-32">
                <Image
                  src="https://comercialteba.cl/wp-content/uploads/2023/05/logo-nuevo-teba-1024x1024.png"
                  alt="TEBA Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white/20 text-white hover:bg-white/30 hover:text-white">
                    Categorías
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-3 gap-4 p-4 bg-white">
                      {categories.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <Link
                            href={category.href}
                            className="font-medium text-[#027046] hover:underline"
                          >
                            {category.name}
                          </Link>
                          <ul className="space-y-1">
                            {category.subcategories.map((subcategory) => (
                              <li key={subcategory.name}>
                                <Link
                                  href={subcategory.href}
                                  className="text-sm text-gray-600 hover:text-[#027046]"
                                >
                                  {subcategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex lg:w-96">
              <SearchDropdown />
            </div>

            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/20 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white text-[#027046] text-xs flex items-center justify-center font-medium">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <CartSheet />
            </Sheet>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-2 px-2">
            <SearchDropdown className="w-full" />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/20">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/20 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <div className="pt-2 border-t border-white/20">
              <div className="px-4 py-2 font-semibold">Categorías</div>
              {categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <Link
                    href={category.href}
                    className="block px-4 py-2 hover:bg-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-8 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.name}
                        href={subcategory.href}
                        className="block py-1 text-sm text-white/80 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}