import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GitHubSignIn } from "../components/github-sign-in";
import { SignInFormSection } from "../sections/sign-in-form.section";
import { Separator } from "@/components/ui/separator";

export function SignInScreen({ className }: { className?: string }) {
	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>
						Login with your Apple or Google account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<section className="grid gap-6">
						<div className="flex flex-col gap-4">
							<GitHubSignIn />
						</div>
						<div className="relative">
							<Separator />
							<span className="absolute z-10 bg-card px-2 text-muted-foreground -top-3 left-1/2 -translate-x-1/2">
								O continua con
							</span>
						</div>
						<SignInFormSection />
					</section>
				</CardContent>
			</Card>
		</div>
	);
}
