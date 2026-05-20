import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { AuthAccessScreen, AuthLoginScreen, AuthSignUpScreen } from '../index';

const meta = {
	title: 'Auth/Sign Up',
	component: AuthSignUpScreen,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		productName: {
			control: 'text',
		},
	},
} satisfies Meta<typeof AuthSignUpScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimediaCortexx: Story = {
	args: {
		supportAction: {
			href: 'https://wa.me/27100000000',
			iconLabel: 'WA',
			label: 'Call us on WhatsApp',
		},
	},
	parameters: {
		docs: {
			source: {
				code: `import { AuthSignUpScreen, ThemeProvider } from '@pikaboo/t2-design-system';

<ThemeProvider theme="primedia" applyToRoot>
  <AuthSignUpScreen
    ssoProviders={[
      { id: 'google', label: 'Google' },
      { id: 'github', label: 'GitHub' },
    ]}
    onSubmit={({ email }) => startStytchLogin(email)}
    onSsoSelect={(provider) => startStytchSso(provider.id)}
  />
</ThemeProvider>`,
			},
		},
	},
	render: (args) => <AuthSignUpScreen {...args} />,
	play: async ({ canvas }) => {
		await expect(canvas.getAllByRole('textbox').length).toBeGreaterThan(0);
	},
};

export const Pikaboo: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { AuthSignUpScreen, ThemeProvider } from '@pikaboo/t2-design-system';

<ThemeProvider theme="pikaboo" applyToRoot>
  <AuthSignUpScreen onSubmit={({ email }) => startStytchLogin(email)} />
</ThemeProvider>`,
			},
		},
	},
	render: () => <AuthSignUpScreen />,
	play: async ({ canvas }) => {
		await expect(canvas.getAllByRole('textbox').length).toBeGreaterThan(0);
	},
};

export const Login: StoryObj<typeof AuthLoginScreen> = {
	parameters: {
		docs: {
			source: {
				code: `import { AuthLoginScreen, ThemeProvider } from '@pikaboo/t2-design-system';

<ThemeProvider theme="pikaboo" applyToRoot>
  <AuthLoginScreen onSsoSelect={(provider) => startStytchSso(provider.id)} />
</ThemeProvider>`,
			},
		},
	},
	render: () => <AuthLoginScreen defaultEmail="owner@example.com" />,
	play: async ({ canvas }) => {
		await expect(canvas.getAllByRole('textbox').length).toBeGreaterThan(0);
	},
};

export const FullAccessPanel: StoryObj<typeof AuthAccessScreen> = {
	parameters: {
		docs: {
			source: {
				code: `import { AuthAccessScreen, ThemeProvider } from '@pikaboo/t2-design-system';

<ThemeProvider theme="pikaboo-dark" applyToRoot>
  <AuthAccessScreen
    defaultMode="signup"
    supportAction={{ href: 'https://wa.me/27100000000', label: 'Call us on WhatsApp' }}
  />
</ThemeProvider>`,
			},
		},
	},
	render: () => (
		<AuthAccessScreen
			defaultMode="signup"
			supportAction={{
				href: 'https://wa.me/27100000000',
				iconLabel: 'WA',
				label: 'Call us on WhatsApp',
			}}
		/>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole('link', { name: /call us on whatsapp/i }),
		).toBeVisible();
	},
};
