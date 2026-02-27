"use client";

import Image from "next/image";
import { BarbershopService, Barbershop } from "@/generated/prisma/client";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { useAction } from "next-safe-action/hooks";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getDateAvailableTimeSlots } from "../_actions/get-date-available-time-slots";

interface ServiceItemProps {
  service: BarbershopService & {
    barbershop: Barbershop;
  };
}

export function ServiceItem({ service }: ServiceItemProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const { executeAsync, isPending } = useAction(createBooking);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const { data: availableTimeSlots } = useQuery({
    queryKey: ["date-available-time-slots", service.barbershopId, selectedDate],
    queryFn: () =>
      getDateAvailableTimeSlots({
        barbershopId: service.barbershopId,
        date: selectedDate!,
      }),
    enabled: Boolean(selectedDate),
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const priceInReaisInteger = Math.floor(service.priceInCents / 100);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
    : "";

  const isConfirmDisabled = !selectedDate || !selectedTime;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleConfirm = async () => {
    if (!selectedTime || !selectedDate) {
      return;
    }

    const timeSplitted = selectedTime.split(":"); // [10, 00]
    const hours = timeSplitted[0];
    const minutes = timeSplitted[1];
    const date = new Date(selectedDate);
    date.setHours(Number(hours), Number(minutes));

    const result = await executeAsync({
      serviceId: service.id,
      date,
    });

    if (result?.serverError || result?.validationErrors) {
      toast.error(result.validationErrors?._errors?.[0] || "Erro ao criar agendamento");
      return;
    }

    toast.success("Agendamento criado com sucesso!");
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSheetIsOpen(false);
  };

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <div className="border-border bg-card flex w-full items-center gap-3 rounded-2xl border border-solid p-3">
        {/* IMAGE CONTAINER */}
        <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-[10px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT CONTAINER */}
        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <div className="flex flex-col gap-1">
            <h3 className="text-card-foreground text-sm font-bold truncate">
              {service.name}
            </h3>
            <p className="text-muted-foreground text-sm font-normal line-clamp-2">
              {service.description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-card-foreground text-sm font-bold">
              {priceInReais}
            </p>
            <SheetTrigger asChild>
              <Button className="rounded-full px-4 py-2" size="sm">Reservar</Button>
            </SheetTrigger>
          </div>
        </div>
      </div>

      <SheetContent className="w-full sm:max-w-[400px] overflow-y-auto p-0">
        <div className="flex h-full flex-col gap-6">
          <SheetHeader className="px-5 pt-6">
            <SheetTitle className="text-lg font-bold">Fazer Reserva</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-5">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={{ before: today }}
              className="w-full p-0"
              locale={ptBR}
            />
          </div>

          {selectedDate && (
            <>
              <Separator />

              <div className="flex items-center gap-3 overflow-x-auto px-5 py-5 [&::-webkit-scrollbar]:hidden">
                {availableTimeSlots?.data?.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="shrink-0 rounded-full px-4 py-2"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="flex flex-col gap-3 px-5">
                <div className="border-border bg-card flex w-full flex-col gap-3 rounded-[10px] border border-solid p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-card-foreground text-base font-bold">
                      {service.name}
                    </p>
                    <p className="text-card-foreground text-sm font-bold">
                      R${priceInReaisInteger},00
                    </p>
                  </div>

                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <p>Data</p>
                    <p>{formattedDate}</p>
                  </div>

                  {selectedTime && (
                    <div className="text-muted-foreground flex items-center justify-between text-sm">
                      <p>Horário</p>
                      <p>{selectedTime}</p>
                    </div>
                  )}

                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <p>Barbearia</p>
                    <p>{service.barbershop.name}</p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-6 pt-2">
                <Button
                  className="w-full rounded-full"
                  disabled={isConfirmDisabled || isPending}
                  onClick={handleConfirm}
                >
                  Confirmar
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
