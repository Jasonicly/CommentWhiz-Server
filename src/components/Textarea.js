export function Textarea({ onChange }) {
	return (
		<div>
			<label className="block text-lg font-medium text-gray-700 text-center">
				Enter Link to Product:
			</label>
			<div className="mt-1">
				<textarea
					rows="1"
					name="comment"
					placeholder="text goes here..."
					className="block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
					onChange={onChange}
				></textarea>
			</div>
		</div>
	);
}
