import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { ThemeToggle, themeToggleBootScript } from './theme-toggle';

(
	globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const mountedRoots: Root[] = [];
const mountedContainers: HTMLElement[] = [];

const render = (ui: ReactNode) => {
	const container = document.createElement('div');
	document.body.append(container);
	const root = createRoot(container);
	mountedRoots.push(root);
	mountedContainers.push(container);
	act(() => {
		root.render(ui);
	});
	return container;
};

const click = (element: Element | null | undefined) => {
	act(() => {
		element?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	});
};

beforeEach(() => {
	window.localStorage.clear();
	document.documentElement.removeAttribute('data-theme');
});

afterEach(() => {
	for (const root of mountedRoots.splice(0)) {
		act(() => root.unmount());
	}
	for (const container of mountedContainers.splice(0)) {
		container.remove();
	}
	window.localStorage.clear();
	document.documentElement.removeAttribute('data-theme');
});

describe('ThemeToggle', () => {
	it('renders both options + the moving thumb', () => {
		const container = render(<ThemeToggle defaultValue="dark" />);
		const options = container.querySelectorAll('.pds-theme-toggle__option');
		expect(options.length).toBe(2);
		expect(container.querySelector('.pds-theme-toggle__thumb')).toBeTruthy();
		expect(options[0]?.getAttribute('aria-label')).toBe('Light');
		expect(options[1]?.getAttribute('aria-label')).toBe('Dark');
	});

	it('marks the dark option active by default and translates the thumb', () => {
		const container = render(<ThemeToggle defaultValue="dark" />);
		const options = container.querySelectorAll('.pds-theme-toggle__option');
		expect(options[0]?.getAttribute('aria-pressed')).toBe('false');
		expect(options[1]?.getAttribute('aria-pressed')).toBe('true');
		expect(
			container
				.querySelector('.pds-theme-toggle__thumb')
				?.classList.contains('pds-theme-toggle__thumb--dark'),
		).toBe(true);
	});

	it('toggles uncontrolled state on click + writes document data-theme + persists to localStorage', () => {
		const container = render(<ThemeToggle defaultValue="dark" />);
		const lightButton = container.querySelectorAll(
			'.pds-theme-toggle__option',
		)[0];
		click(lightButton);
		expect(lightButton?.getAttribute('aria-pressed')).toBe('true');
		expect(document.documentElement.dataset.theme).toBe('pikaboo');
		expect(window.localStorage.getItem('pikaboo:website:theme')).toBe(
			'pikaboo',
		);
		expect(
			container
				.querySelector('.pds-theme-toggle__thumb')
				?.classList.contains('pds-theme-toggle__thumb--dark'),
		).toBe(false);
	});

	it('reads the persisted theme from localStorage when uncontrolled', () => {
		window.localStorage.setItem('pikaboo:website:theme', 'pikaboo');
		const container = render(<ThemeToggle defaultValue="dark" />);
		const lightButton = container.querySelectorAll(
			'.pds-theme-toggle__option',
		)[0];
		expect(lightButton?.getAttribute('aria-pressed')).toBe('true');
	});

	it('honours controlled `value` + fires onChange without managing internal state', () => {
		const calls: string[] = [];
		const container = render(
			<ThemeToggle onChange={(m) => calls.push(m)} value="light" />,
		);
		const options = container.querySelectorAll('.pds-theme-toggle__option');
		expect(options[0]?.getAttribute('aria-pressed')).toBe('true');
		click(options[1]);
		expect(calls).toEqual(['dark']);
		// In controlled mode the component does not flip its own state.
		expect(options[0]?.getAttribute('aria-pressed')).toBe('true');
	});

	it('honours applyToDocument=false', () => {
		document.documentElement.dataset.theme = 'pikaboo-dark';
		const container = render(
			<ThemeToggle applyToDocument={false} defaultValue="dark" />,
		);
		click(container.querySelectorAll('.pds-theme-toggle__option')[0]);
		expect(document.documentElement.dataset.theme).toBe('pikaboo-dark');
	});

	it('honours persistKey=false', () => {
		const container = render(
			<ThemeToggle defaultValue="dark" persistKey={false} />,
		);
		click(container.querySelectorAll('.pds-theme-toggle__option')[0]);
		expect(window.localStorage.getItem('pikaboo:website:theme')).toBeNull();
	});

	it('honours a custom persistKey', () => {
		const container = render(
			<ThemeToggle defaultValue="dark" persistKey="my-app-theme" />,
		);
		click(container.querySelectorAll('.pds-theme-toggle__option')[0]);
		expect(window.localStorage.getItem('my-app-theme')).toBe('pikaboo');
	});

	it('renders custom labels', () => {
		const container = render(
			<ThemeToggle
				ariaLabel="Site theme"
				darkLabel="Night mode"
				defaultValue="dark"
				lightLabel="Day mode"
			/>,
		);
		const options = container.querySelectorAll('.pds-theme-toggle__option');
		expect(options[0]?.getAttribute('aria-label')).toBe('Day mode');
		expect(options[1]?.getAttribute('aria-label')).toBe('Night mode');
		expect(
			container.querySelector('.pds-theme-toggle')?.getAttribute('aria-label'),
		).toBe('Site theme');
	});

	it('exports a boot script that reads the default key', () => {
		const script = themeToggleBootScript();
		expect(script).toContain('pikaboo:website:theme');
		expect(script).toContain('document.documentElement.setAttribute');
	});

	it('exports a boot script with a custom key', () => {
		const script = themeToggleBootScript('my-key');
		expect(script).toContain('"my-key"');
		expect(script).not.toContain('pikaboo:website:theme');
	});
});
