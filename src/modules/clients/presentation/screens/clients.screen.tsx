import { Suspense, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { ClientsTableSkeleton } from "../components/clients-table/skeleton";
import { ClientsTable } from "../components/clients-table";
import { useMutateClients } from "@/modules/clients/application/hooks/use.mutate-clients";
import { ClientFormDialog } from "../components/client-form/dialog";

export function ClientsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { create } = useMutateClients();
  return (
    <div className="m-10">
      <header className="flex justify-between gap-x-5">
        <div className="w-1/2">
          <SearchInput
            query={searchQuery}
            setQuery={setSearchQuery}
            placeholder="Busca por nombre o identificador"
          />
        </div>
        <div>
          <ClientFormDialog
            isPending={create.isPending}
            onSubmit={(data) => {
              create.mutate(data);
            }}
          />
        </div>
      </header>
      <Suspense fallback={<ClientsTableSkeleton pageSize={10} />}>
        <ClientsTable searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
}
