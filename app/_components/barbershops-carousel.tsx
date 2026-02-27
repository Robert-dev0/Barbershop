"use client";

import { useRef } from "react";
import BarbershopItem from "./barbershop-item";
import { Barbershop } from "@/generated/prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface BarbershopsCarouselProps {
    barbershops: Barbershop[];
}

const BarbershopsCarousel = ({ barbershops }: BarbershopsCarouselProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -280, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 280, behavior: "smooth" });
        }
    };

    return (
        <div className="group relative w-full">
            <Button
                variant="secondary"
                size="icon"
                className="absolute -left-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full shadow-lg opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
                onClick={scrollLeft}
            >
                <ChevronLeft className="size-5" />
            </Button>

            <div
                ref={containerRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            >
                {barbershops.map((barbershop) => (
                    <div key={barbershop.id} className="min-w-[260px] shrink-0 snap-start">
                        <BarbershopItem barbershop={barbershop} />
                    </div>
                ))}
            </div>

            <Button
                variant="secondary"
                size="icon"
                className="absolute -right-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full shadow-lg opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
                onClick={scrollRight}
            >
                <ChevronRight className="size-5" />
            </Button>
        </div>
    );
};

export default BarbershopsCarousel;
