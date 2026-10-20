import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { footerCompanyLinks, legalLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "inline-flex items-center gap-1 text-sm text-ink-300 transition-colors hover:text-bone-50";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Cached so the prerendered shell can include the current year without a request-time read. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-ink-300">
              A software development and AI agency building websites, web and mobile applications, AI-powered
              products and business automation. {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 inline-block font-display text-xl text-bone-50 underline decoration-ink-600 underline-offset-[0.3em] transition-colors hover:decoration-ember-400"
            >
              {siteConfig.email}
            </a>
            <p className="mt-3 text-sm text-ink-400">{siteConfig.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title="Services">
              {services.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services/${s.slug}`}>{s.name}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/services">All services</FooterLink>
              </li>
            </FooterColumn>
            <FooterColumn title="Company">
              {footerCompanyLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title="Work">
              {projects.map((p) => (
                <li key={p.slug}>
                  <FooterLink href={`/work/${p.slug}`}>{p.name}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/work">All work</FooterLink>
              </li>
            </FooterColumn>
            <FooterColumn title="Connect">
              <li>
                <FooterLink href={`mailto:${siteConfig.email}`} external>
                  Email
                </FooterLink>
              </li>
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <FooterLink href={s.href} external>
                    {s.label}
                  </FooterLink>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-700 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-bone-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
