// components/Layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArchiveBoxIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    name: "Empacotamento",
    href: "/empacotamento",
    icon: ArchiveBoxIcon,
  },
  {
    name: "Colaboradores",
    href: "/colaboradores",
    icon:   UserGroupIcon,
  },
];

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Overlay mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen
          bg-gray-800 text-white
          border-r border-gray-800
          transition-all duration-300 ease-in-out

          ${sidebarOpen ? "w-64" : "w-20"}

          ${mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-800 px-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold">
              A
            </div>

            {sidebarOpen && (
              <span className="truncate text-lg font-semibold">
                Meu App
              </span>
            )}

          </div>

          {/* Fechar mobile */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="ml-auto rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

        </div>

        {/* Navegação */}
        <nav className="p-3">

          <p
            className={`
              mb-3 px-3 text-xs font-semibold uppercase tracking-wider
              text-gray-500
              ${!sidebarOpen && "text-center"}
            `}
          >
            {sidebarOpen ? "Menu" : "•"}
          </p>

          <ul className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>

                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    title={!sidebarOpen ? item.name : undefined}
                    className={`
                      group flex items-center gap-3 rounded-lg px-3 py-2.5
                      text-sm font-medium
                      transition-colors

                      ${
                        active
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }

                      ${!sidebarOpen && "justify-center"}
                    `}
                  >

                    <Icon
                      className={`
                        h-5 w-5 shrink-0
                        ${active
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                        }
                      `}
                    />

                    {sidebarOpen && (
                      <span>{item.name}</span>
                    )}

                  </Link>

                </li>
              );
            })}

          </ul>

        </nav>

      </aside>

      {/* Área principal */}
      <div
        className={`
          min-h-screen transition-all duration-300
          ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"}
        `}
      >

        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-gray-900 px-4 shadow-sm sm:px-6">

          <div className="flex items-center gap-3">

            {/* Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="Abrir menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Desktop */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:block"
              aria-label="Alternar menu"
            >
              {sidebarOpen ? (
                <ChevronLeftIcon className="h-5 w-5" />
              ) : (
                <ChevronRightIcon className="h-5 w-5" />
              )}
            </button>

            <div>
              <h1 className="text-lg font-semibold text-gray-200">
                Meu App
              </h1>

              <p className="hidden text-xs text-gray-400 sm:block">
                Sistema administrativo
              </p>
            </div>

          </div>

          {/* Usuário */}
          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-200">
                Usuário
              </p>

              <p className="text-xs text-gray-400">
                Administrador
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              U
            </div>

          </div>

        </header>

        {/* Conteúdo */}
        <main className="bg-gray-900 min-h-[calc(100vh-4rem)] p-4 sm:p-6">

          <div className="mx-auto max-w-7xl">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}