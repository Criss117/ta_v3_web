import { z } from 'zod';
import * as _libsql_client from '@libsql/client';
import * as _trpc_server from '@trpc/server';
import * as drizzle_orm_sqlite_core from 'drizzle-orm/sqlite-core';
import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';

interface PaymentSummary {
    id: number;
    clientId: string;
    amount: number;
    createdAt: Date;
}

declare const ticketStatus: readonly ["unpaid", "partial", "paid"];
declare const installmentModality: readonly ["weekly", "monthly", "biweekly"];
type InstallmentModality = (typeof installmentModality)[number];
type TicketStaus = (typeof ticketStatus)[number];

declare const products: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "products";
    schema: undefined;
    columns: {
        isActive: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_active";
            tableName: "products";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "products";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "products";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "deleted_at";
            tableName: "products";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        barcode: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "barcode";
            tableName: "products";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "products";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        costPrice: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cost_price";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        salePrice: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sale_price";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        wholesalePrice: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "wholesale_price";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        stock: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "stock";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        minStock: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "min_stock";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        categoryId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "category_id";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;

declare const installmentPaymentSummaryDto: z.ZodObject<{
    id: z.ZodNumber;
    status: z.ZodEnum<["unpaid", "partial", "paid"]>;
    subtotalPaid: z.ZodNumber;
    subtotal: z.ZodNumber;
    installmentNumber: z.ZodNumber;
    dueDate: z.ZodEffects<z.ZodNumber, Date, number>;
    createdAt: z.ZodEffects<z.ZodNumber, Date, number>;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    status: "partial" | "unpaid" | "paid";
    subtotal: number;
    installmentNumber: number;
    dueDate: Date;
    subtotalPaid: number;
}, {
    id: number;
    createdAt: number;
    status: "partial" | "unpaid" | "paid";
    subtotal: number;
    installmentNumber: number;
    dueDate: number;
    subtotalPaid: number;
}>;
type InstallmentsPaymentSchema = z.infer<typeof installmentPaymentSummaryDto>;

interface InstallmentDetail {
    id: number;
    clientId: string;
    numberOfInstallments: number;
    installmentsPaid: number;
    modality: InstallmentModality;
    totalPaid: number;
    total: number;
    status: TicketStaus;
    createdAt: Date;
    installments: InstallmentsPaymentSchema[];
}

interface ClientSummary {
    isActive: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    id: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    creditLimit: number;
    clientCode: string;
    globalNumberOfInstallments: number;
    globalInstallmentModality: InstallmentModality;
}
interface ClientDetail {
    id: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    creditLimit: number;
    clientCode: string;
    globalNumberOfInstallments: number;
    globalInstallmentModality: InstallmentModality;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    totalTickets: number;
    totalTicketsUnpaid: number;
    totalTicketsPaid: number;
    totalDebt: number;
    totalInstallments: number;
    lastTicketDate: Date | null;
}

interface Category {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
}

interface Paginated<T, Y> {
    items: T[];
    nextCursor: Y;
}

type Product = typeof products.$inferSelect & {
    category: {
        id: number;
        name: string;
    } | null;
};

declare const appRouter: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
    ctx: undefined;
    meta: object;
    errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
    transformer: true;
}, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
    products: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                limit: number;
                searchQuery: string;
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            output: Paginated<Product, {
                createdAt: Date | null;
                lastId: number | null;
            }>;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                description: string;
                barcode: string;
                costPrice: number;
                salePrice: number;
                wholesalePrice: number;
                stock: number;
                minStock: number;
                categoryId?: number | null | undefined;
            };
            output: void;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                data: {
                    description?: string | undefined;
                    barcode?: string | undefined;
                    costPrice?: number | undefined;
                    salePrice?: number | undefined;
                    wholesalePrice?: number | undefined;
                    stock?: number | undefined;
                    minStock?: number | undefined;
                    categoryId?: number | null | undefined;
                };
                productId: number;
            };
            output: void;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                productId: number;
            };
            output: void;
        }>;
        findOneBy: _trpc_server.TRPCQueryProcedure<{
            input: {
                barcode?: string | null | undefined;
                productId?: number | null | undefined;
            };
            output: {
                category: {
                    id: number;
                    name: string;
                } | null;
                isActive: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                id: number;
                barcode: string | null;
                description: string;
                costPrice: number;
                salePrice: number;
                wholesalePrice: number;
                stock: number;
                minStock: number;
                categoryId: number | null;
            };
        }>;
    }>>;
    categories: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                limit: number;
                searchQuery: string;
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            output: {
                items: Category[];
                nextCursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description?: string | null | undefined;
            };
            output: _libsql_client.ResultSet;
        }>;
    }>>;
    clients: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                limit: number;
                searchQuery: string;
                cursor: {
                    createdAt?: Date | null | undefined;
                    lastClientCode?: string | null | undefined;
                };
            };
            output: Paginated<ClientSummary, {
                createdAt?: Date | null | undefined;
                lastClientCode?: string | null | undefined;
            }>;
        }>;
        findOneBy: _trpc_server.TRPCQueryProcedure<{
            input: {
                clientId?: string | null | undefined;
                clientCode?: string | null | undefined;
            };
            output: ClientDetail;
        }>;
        findManyInstallments: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: InstallmentDetail[];
        }>;
        findManyPayments: _trpc_server.TRPCQueryProcedure<{
            input: {
                limit: number;
                clientId: string;
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            output: Paginated<PaymentSummary, {
                createdAt: Date | null;
                lastId: number | null;
            }>;
        }>;
        createClient: _trpc_server.TRPCMutationProcedure<{
            input: {
                fullName: string;
                creditLimit: number;
                clientCode: string;
                email?: string | null | undefined;
                phone?: string | null | undefined;
                address?: string | null | undefined;
            };
            output: {
                id: string;
            };
        }>;
        updateClient: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                email?: string | null | undefined;
                fullName?: string | undefined;
                phone?: string | null | undefined;
                address?: string | null | undefined;
                creditLimit?: number | undefined;
                clientCode?: string | undefined;
                numberOfInstallments?: number | null | undefined;
                modality?: "weekly" | "monthly" | "biweekly" | null | undefined;
            };
            output: ResultSet;
        }>;
        payDebt: _trpc_server.TRPCMutationProcedure<{
            input: {
                type: "pay_debt" | "settle_debt";
                clientId: string;
                amount?: number | null | undefined;
            };
            output: void;
        }>;
        deleteManyPayments: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                ids: number[];
            };
            output: any;
        }>;
    }>>;
    tickets: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                payType: "cash" | "credit";
                items: {
                    description: string;
                    productId: number;
                    price: number;
                    quantity: number;
                }[];
                clientId?: string | null | undefined;
            };
            output: void;
        }>;
        findManyByClient: _trpc_server.TRPCQueryProcedure<{
            input: {
                clientId: string;
            };
            output: {
                items: {
                    id: number;
                    description: string;
                    productId: number;
                    quantity: number;
                    subtotal: number;
                }[];
                isActive: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                id: number;
                clientId: string | null;
                total: number;
                totalPaid: number;
                status: "partial" | "unpaid" | "paid";
                payType: "cash" | "credit" | null;
            }[];
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                ticketId: number;
            };
            output: any;
        }>;
    }>>;
    greets: _trpc_server.TRPCQueryProcedure<{
        input: void;
        output: string;
    }>;
}>>;
type AppRouter = typeof appRouter;

export type { AppRouter };
