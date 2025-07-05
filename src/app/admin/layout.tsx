import SidebarNav from "./SidebarNav";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen flex flex-col md:flex-row bg-background text-foreground'>
			<aside className='w-full md:w-64 bg-card text-card-foreground flex md:flex-col flex-row items-center md:items-start py-4 md:py-8 px-2 md:px-4 space-y-0 md:space-y-8 border-b md:border-b-0 md:border-r border-border'>
				<span className='md:hidden mr-4'>
					<svg
						width='32'
						height='32'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<line x1='4' y1='6' x2='20' y2='6' />
						<line x1='4' y1='12' x2='20' y2='12' />
						<line x1='4' y1='18' x2='20' y2='18' />
					</svg>
				</span>
				<div className='text-2xl font-bold mb-0 md:mb-8 mr-4 md:mr-0'>
					Admin
				</div>
				<SidebarNav />
			</aside>
			<main className='flex-1 p-4 md:p-8'>{children}</main>
		</div>
	);
}
