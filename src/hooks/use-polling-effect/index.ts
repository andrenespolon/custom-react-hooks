import React from 'react';

export const DEFAULT_POLLING_INTERVAL = 15;

type Options = {
	interval?: number;
	pollingPersist?: boolean;
	onCleanUp?: () => void;
};

/**
 * Hook `usePollingEffect`
 */
export function usePollingEffect(
	asyncCallback: (...args: any) => Promise<any> | any,
	dependencies: any[],
	options?: Options
): void {
	const timeoutRef = React.useRef<any>(null);

	const interval = options?.interval
		? options.interval * 1000
		: DEFAULT_POLLING_INTERVAL * 1000;

	const pollingPersist =
		typeof options?.pollingPersist !== 'undefined'
			? options.pollingPersist
			: true;

	const onCleanUp = options?.onCleanUp || null;

	React.useEffect(() => {
		let stopped = false;
		/**
		 * Side note: preceding semicolon needed for IIFEs.
		 */
		(async function pollingCallback(): Promise<any> {
			try {
				await asyncCallback();
			} finally {
				/**
				 * Set timeout after it finished, unless stopped
				 */
				timeoutRef.current =
					!stopped && pollingPersist && setTimeout(pollingCallback, interval);
			}
		})();

		/**
		 * Clean up if dependencies change
		 */
		return (): void => {
			stopped = true;
			clearTimeout(timeoutRef.current);
			if (onCleanUp instanceof Function) {
				onCleanUp();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies, pollingPersist, interval, asyncCallback, onCleanUp]);
}
