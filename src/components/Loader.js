export function Loader() {
	return (
		<div
			className="pl-10 pr-4 py-2 ml-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-black w-full rounded-r-xl bg-emerald-500 transition ease-in-out duration-60 cursor-not-allowed"
			style={{ height: '70px' }}
		>
			<svg
				className="animate-spin -ml-3 mt-4 h-6 w-6 text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				></circle>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		</div>
	);
}
