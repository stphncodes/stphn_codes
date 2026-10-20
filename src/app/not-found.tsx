import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <Eyebrow>404</Eyebrow>
      <Heading level={1} size="xl" className="mt-5">
        That page does not exist.
      </Heading>
      <p className="mt-5 max-w-md text-lg text-ink-300">
        The link may be out of date, or the page may have moved. Head back to the start or tell us what you were looking
        for.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </Container>
  );
}
