import { Eye, Footprints, Scissors, Sparkles, User, Waves } from "lucide-react";
import Link from "next/link";

const QuickSearchButtons = () => {
  return (
    <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <Link
        href="/barbershops?search=cabelo"
        className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2 lg:shrink"
      >
        <Scissors className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Cabelo</span>
      </Link>

      <Link
        href="/barbershops?search=barba"
        className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2 lg:shrink"
      >
        <User className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Barba</span>
      </Link>

      <Link
        href="/barbershops?search=acabamento"
        className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2 lg:shrink"
      >
        <Sparkles className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
          Acabamento
        </span>
      </Link>

      <Link
        href="/barbershops?search=sobrancelha"
        className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2 lg:shrink"
      >
        <Eye className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
          Sobrancelha
        </span>
      </Link>

      <Link
        href="/barbershops?search=pézinho"
        className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2 lg:shrink"
      >
        <Footprints className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
          Pézinho
        </span>
      </Link>

      <Link
        href="/barbershops?search=progressiva"
        className="border-border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2 lg:shrink"
      >
        <Waves className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
          Progressiva
        </span>
      </Link>
    </div>
  );
};

export default QuickSearchButtons;
