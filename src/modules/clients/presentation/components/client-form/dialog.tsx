import { useState } from "react";
import { Edit2Icon, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClientForm } from ".";
import type { CreateClientDto } from "@/modules/clients/application/models/create-client.dto";
import type { CompleteClient } from "@/modules/clients/application/models";

interface Props {
  onSubmit: (data: CreateClientDto) => void;
  isPending: boolean;
  client?: CompleteClient;
  triggerVariant?: "icon";
}

export function ClientFormDialog({
  onSubmit,
  isPending,
  triggerVariant,
  client,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={triggerVariant === "icon" ? "icon" : "default"}
          variant={triggerVariant === "icon" ? "ghost" : "default"}
        >
          {client ? <Edit2Icon /> : <PlusCircleIcon />}
          {triggerVariant !== "icon"
            ? client
              ? "Editar cliente"
              : "Agregar nuevo cliente"
            : ""}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle>Agregar nuevo cliente</DialogTitle>
          <DialogDescription>
            Aqui podras agregar un nuevo cliente
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          isPending={isPending}
          client={client}
          onSubmit={onSubmit}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
