/**
 * A reactive counter that increments every `interval` ms while `running()` is true.
 * Skips ticks while the tab is hidden. Call during component init; the interval
 * is cleared when the component unmounts or `running()` turns false.
 */
export function useTicker(interval: number, running: () => boolean = () => true) {
	let count = $state(0);

	$effect(() => {
		if (!running()) return;
		const id = setInterval(() => {
			if (!document.hidden) count++;
		}, interval);
		return () => clearInterval(id);
	});

	return {
		get count() {
			return count;
		},
		reset() {
			count = 0;
		}
	};
}
