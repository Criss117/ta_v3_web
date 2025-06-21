export const operationName = {
	writeText: "EscribirTexto",
	cut: "Corte",
} as const;

type Operation = {
	nombre: (typeof operationName)[keyof typeof operationName];
	argumentos: (string | number)[];
};

export class ThermalPrinter {
	private static uri = "http://192.168.101.12:8788/printer";
	private operations: Operation[] = [];

	public writeText(text: string) {
		this.operations.push({
			nombre: operationName.writeText,
			argumentos: text.includes("\n") ? [text] : [text.concat("\n")],
		});

		return this;
	}

	public cut(numLines: number) {
		this.operations.push({
			nombre: operationName.cut,
			argumentos: [numLines],
		});

		return this;
	}

	public get connectedPrinters(): Promise<string[]> {
		return fetch("http://192.168.101.12:8788/printer/impresoras").then((r) =>
			r.json(),
		);
	}

	public async print() {
		if (this.operations.length === 0) {
			throw new Error("No operations to print");
		}

		this.operations.push({
			nombre: operationName.cut,
			argumentos: [0],
		});

		const response = await fetch(`${ThermalPrinter.uri}/imprimir`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				serial: "",
				nombreImpresora: "POS-80C",
				operaciones: this.operations,
			}),
		});

		if (!response.ok) {
			throw new Error("Something went wrong");
		}
	}
}
