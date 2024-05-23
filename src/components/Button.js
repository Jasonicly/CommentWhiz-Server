export function Button({ onClick }) {
    return (
        <button 
            className="relative w-full h-12 px-6 pt-6 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg 
            group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900
            focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            onClick={onClick}
        >
        <span className="absolute inset-0 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Scan the comments!
        </span>
    </button>                
    );
}