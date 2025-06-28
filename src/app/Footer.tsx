import { Button } from "@/components/ui/button";

const year = new Date().getFullYear();

export default function Footer() {
	return (
		<footer className='bg-card border-t border-border shadow-sm mt-12'>
			<div className='container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-card-foreground text-sm'>
				<div className='mb-2 md:mb-0'>
					&copy; {year} Soccer League. All rights reserved.
				</div>
				<div className='flex space-x-6'>
					<Button asChild variant='link' className='text-card-foreground'>
						<a href='/privacy-policy'>Privacy Policy</a>
					</Button>
					<Button asChild variant='link' className='text-card-foreground'>
						<a href='/terms'>Terms & Conditions</a>
					</Button>
					<Button asChild variant='link' className='text-card-foreground'>
						<a href='/contact'>Contact</a>
					</Button>
				</div>
			</div>
		</footer>
	);
}
