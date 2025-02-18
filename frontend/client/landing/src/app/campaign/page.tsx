import Link from "next/link";

export default function Page() {
	return (
		<div className="flex flex-col gap-4 items-center justify-center h-screen">
			<h1 className="text-4xl font-bold text-gray-800">Coming Soon</h1>
			<Link href="/" className="hover:underline text-gray-800 dark:text-white">Back Home</Link>
		</div>
	);
}