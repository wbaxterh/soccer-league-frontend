const year = new Date().getFullYear();

export default function Footer() {
	return (
		<footer className='bg-league-dark border-t border-league-medium shadow-sm mt-12'>
			<div className='container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-league-light text-sm'>
				<div className='mb-2 md:mb-0'>
					&copy; {year} Soccer League. All rights reserved.
				</div>
				<div className='flex space-x-6'>
					<a
						href='/privacy-policy'
						className='hover:text-league-medium underline'
					>
						Privacy Policy
					</a>
					<a href='/terms' className='hover:text-league-medium underline'>
						Terms &amp; Conditions
					</a>
					<a href='/contact' className='hover:text-league-medium underline'>
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
}
