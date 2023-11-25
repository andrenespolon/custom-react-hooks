const intersectionObserver = () => ({
	observe: jest.fn(),
	disconnect: jest.fn(),
	unobserve: jest.fn(),
});

window.IntersectionObserver = jest
	.fn()
	.mockImplementation(intersectionObserver);

const resizeObserver = () => ({
	observe: jest.fn(),
	disconnect: jest.fn(),
	unobserve: jest.fn(),
});

window.ResizeObserver = jest.fn().mockImplementation(resizeObserver);
