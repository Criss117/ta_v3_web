import {
	FolderIcon,
	LayoutDashboardIcon,
	ListIcon,
	PlusCircleIcon,
	Users2Icon,
	UsersIcon,
} from "lucide-react";
import {
	SidebarContent as SContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";
import { useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const dashboardLinks = {
	navMain: [
		{
			title: "Home",
			url: "/dashboard",
			icon: LayoutDashboardIcon,
		},
		{
			title: "Productos",
			url: "/dashboard/products",
			icon: ListIcon,
		},
		{
			title: "Clientes",
			url: "/dashboard/clients",
			icon: Users2Icon,
		},
		{
			title: "Projects",
			url: "#",
			icon: FolderIcon,
		},
		{
			title: "Team",
			url: "#",
			icon: UsersIcon,
		},
	],
};

export function SidebarContent() {
	const { pathname } = useLocation();

	return (
		<SContent>
			<SidebarGroup>
				<SidebarGroupContent className="flex flex-col gap-2">
					<SidebarMenu>
						<SidebarMenuItem className="flex items-center gap-2">
							<SidebarMenuButton
								tooltip="Quick Create"
								className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
								asChild
							>
								<Link to="/sales">
									<PlusCircleIcon />
									<span>Ir a Ventas</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
					<SidebarMenu>
						{dashboardLinks.navMain.map((item) => (
							<SidebarMenuItem key={item.title}>
								<Link to={item.url}>
									<SidebarMenuButton
										tooltip={item.title}
										isActive={pathname === item.url}
									>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</Link>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SContent>
	);
}
