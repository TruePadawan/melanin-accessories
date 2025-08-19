import { useStore } from "@nanostores/react";
import { interests, isSidebarOpen } from "../store/store";
import XMarkIcon from "./icons/XMarkIcon";
import XMarkOutlinedIcon from "./icons/XMarkOutlinedIcon";

export default function Sidebar() {
	const $isSidebarOpen = useStore(isSidebarOpen);
	const $interests = useStore(interests);
	const interestsList = Object.values($interests);

	function closeSidebar() {
		isSidebarOpen.set(false);
	}

	function handleAsideClick(e: React.MouseEvent) {
		e.stopPropagation();
	}

	return $isSidebarOpen ? (
		<div
			className="fixed inset-0 bg-black/35 bg-opacity-50 z-50"
			onClick={closeSidebar}>
			<aside
				className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50"
				onClick={handleAsideClick}>
				<div className="p-6 flex flex-col h-full">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-bold">My Interests</h2>
						<button
							onClick={closeSidebar}
							className="text-gray-500 hover:text-gray-700 cursor-pointer">
							<XMarkOutlinedIcon className="w-6 h-auto" />
						</button>
					</div>
					{interestsList.length === 0 ? (
						<p className="text-gray-500 text-center py-8">
							No items in your interests yet
						</p>
					) : (
						<ul className="flex-1 space-y-4">
							{interestsList.map((item) => (
								<li
									key={item._id}
									className="flex gap-4 items-center">
									<img
										src={item.image}
										alt={item.title}
										className="w-20 h-20 object-cover rounded-md"
									/>
									<div>
										<h3 className="font-medium">
											{item.title}
										</h3>
										<p className="text-primary font-semibold">
											₦{item.price.toLocaleString()}
										</p>
									</div>
									<button
										className="text-red-500 hover:text-red-700 ms-auto"
										onClick={() =>
											interests.setKey(
												item._id,
												undefined
											)
										}>
										<XMarkIcon className="w-8 h-auto" />
									</button>
								</li>
							))}
						</ul>
					)}
					{interestsList.length > 0 && (
						<button className="mt-auto cursor-pointer px-10 py-6 bg-accent rounded hover:bg-accent-dark transition-colors duration-200 font-semibold">
							Make Inquiries
						</button>
					)}
				</div>
			</aside>
		</div>
	) : null;
}
