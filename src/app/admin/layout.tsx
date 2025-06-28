import SidebarNav from "./SidebarNav";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen flex bg-background text-foreground'>
			<aside className='w-64 bg-card text-card-foreground flex flex-col py-8 px-4 space-y-8'>
				<div className='text-2xl font-bold mb-8'>Admin</div>
				<SidebarNav />
			</aside>
			<main className='flex-1 p-8'>{children}</main>
		</div>
	);
}
