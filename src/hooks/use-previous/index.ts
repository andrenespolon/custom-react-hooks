import { useEffect, useRef } from 'react';

/**
 * __Hook use previous__
 *
 * @param value
 * @returns value or undefined
 */
const usePrevious = <T = any>(value: T) => {
	/**
	 * The ref object is a generic container whose current property is mutable
	 * and can hold any value, similar to an instance property on a class
	 */
	const ref = useRef<T>();

	/**
	 * Store current value in ref
	 */
	useEffect(
		() => {
			ref.current = value;
		},
		/**
		 * Only re-run if value changes
		 */
		[value]
	);

	/**
	 * Return previous value (happens before update in useEffect above)
	 */
	return ref.current;
};

export default usePrevious;
