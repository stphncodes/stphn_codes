"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesId = useId();
  const drawerId = useId();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes (state adjusted during render, per React guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Escape closes whichever menu is open; outside click closes the dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setServicesOpen(false);
      setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      )
        setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);

  const servicesActive = isActive(pathname, "/services");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || menuOpen
            ? "border-b border-ink-700 bg-ink-900/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo onClick={closeAll} />

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls={servicesId}
                onClick={() => setServicesOpen((o) => !o)}
                className={cn(
                  "flex h-10 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition-colors",
                  servicesActive
                    ? "text-bone-50"
                    : "text-ink-300 hover:text-bone-50",
                )}
              >
                Services
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-300",
                    servicesOpen && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    id={servicesId}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-[34rem] overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 p-2 shadow-2xl shadow-black/50">
                      <ul className="grid grid-cols-2 gap-1">
                        {services.map((s) => {
                          const Icon = s.icon;
                          return (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                onClick={closeAll}
                                className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-ink-800 focus-visible:bg-ink-800"
                              >
                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-900 text-ink-300 transition-colors group-hover:border-ember-500/50 group-hover:text-ember-400">
                                  <Icon aria-hidden="true" className="size-4" />
                                </span>
                                <span>
                                  <span className="block text-sm font-medium text-bone-50">
                                    {s.name}
                                  </span>
                                  <span className="mt-0.5 block text-xs leading-snug text-ink-400">
                                    {s.tagline}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                        <li className="col-span-2 mt-1 border-t border-ink-700 pt-1">
                          <Link
                            href="/services"
                            onClick={closeAll}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink-300 transition-colors hover:bg-ink-800 hover:text-bone-50"
                          >
                            All services
                            <ArrowRight aria-hidden="true" className="size-4" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  isActive(pathname, item.href) ? "page" : undefined
                }
                className={cn(
                  "flex h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors",
                  isActive(pathname, item.href)
                    ? "text-bone-50"
                    : "text-ink-300 hover:text-bone-50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="/start-project" size="sm">
                Start a project
              </Button>
            </div>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls={drawerId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className="flex size-11 items-center justify-center rounded-full border border-ink-700 text-bone-50 transition-colors hover:bg-ink-800 lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer. Rendered outside <header> because its backdrop-filter would
          otherwise become the containing block for this fixed element. */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 overflow-y-auto bg-ink-900 lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex min-h-full max-w-7xl flex-col px-5 pb-10 pt-6 sm:px-8"
            >
              <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">
                Services
              </p>
              <ul className="grid gap-1 border-b border-ink-700 pb-5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="flex min-h-12 items-center justify-between py-2 text-lg text-bone-50"
                    >
                      {s.name}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-ink-500"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="grid gap-1 py-5">
                {[
                  { label: "All services", href: "/services" },
                  ...primaryNav,
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      aria-current={
                        isActive(pathname, item.href) ? "page" : undefined
                      }
                      className="flex min-h-12 items-center py-2 font-display text-3xl text-bone-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button href="/start-project" size="lg" className="w-full">
                  Start a project
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
