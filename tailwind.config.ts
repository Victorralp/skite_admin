import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}'
	],
	theme: {
		extend: {
			colors: {
				// Semantic color tokens for dark mode support
				brand: {
					primary: 'var(--brand-primary)',
					purple: 'var(--brand-purple)'
				},
				text: {
					primary: 'var(--text-primary)',
					secondary: 'var(--text-secondary)',
					tertiary: 'var(--text-tertiary)',
					brand: 'var(--text-brand)',
					success: 'var(--text-success)',
					warning: 'var(--text-warning)',
					danger: 'var(--text-danger)'
				},
				surface: {
					primary: 'var(--surface-primary)',
					secondary: 'var(--surface-secondary)',
					tertiary: 'var(--surface-tertiary)',
					active: 'var(--surface-active)',
					success: 'var(--surface-success)',
					warning: 'var(--surface-warning)',
					danger: 'var(--surface-danger)'
				},
				border: {
					primary: 'var(--border-primary)',
					secondary: 'var(--border-secondary)',
					brand: 'var(--border-brand)',
					DEFAULT: 'hsl(var(--border))'
				},
				// Legacy shadcn/ui tokens (keep for compatibility)
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			// Table system spacing
			spacing: {
				'table-header': '2rem', // 32px - Header row height
				'table-row': '3.125rem', // 50px - Data row height  
				'table-padding-x': '1.5rem', // 24px - Horizontal padding
				'table-padding-y': '0.625rem', // 10px - Vertical padding
				'table-gap': '1rem', // 16px - Gap between columns
				'avatar-sm': '1.875rem', // 30px - Small avatar size
				'status-dot': '0.5625rem', // 9px - Status indicator
				'action-button': '1.125rem', // 18px - Action button size
				'menu-item': '2.3125rem', // 37px - Menu item height
			},
			fontSize: {
				'heading-xl': ['24px', { lineHeight: '29px', letterSpacing: '-0.01em', fontWeight: '700' }],
				'heading-lg': ['20px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '600' }],
				'heading-md': ['18px', { lineHeight: '22px', letterSpacing: '-0.01em', fontWeight: '600' }],
				'heading-sm': ['16px', { lineHeight: '19px', letterSpacing: '-0.01em', fontWeight: '500' }],
				'body-lg': ['16px', { lineHeight: '19px', letterSpacing: '0', fontWeight: '700' }],
				'body-md': ['14px', { lineHeight: '17px', letterSpacing: '0', fontWeight: '500' }],
				'body-sm': ['13.5px', { lineHeight: '16px', letterSpacing: '0', fontWeight: '500' }],
				'caption-lg': ['12px', { lineHeight: '14px', letterSpacing: '0', fontWeight: '500' }],
				'caption-md': ['11px', { lineHeight: '13px', letterSpacing: '0', fontWeight: '400' }],
				'caption-sm': ['10px', { lineHeight: '12px', letterSpacing: '0', fontWeight: '500' }]
			},
			fontFamily: {
				sans: ['"Neue Montreal"'],
			},
			boxShadow: {
				// Standard shadow scale
				'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
				'sm': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
				
				// Semantic shadows for components
				'card': '0 8px 24px rgba(17, 16, 35, 0.08)',
				'card-hover': '0 12px 24px rgba(26, 24, 44, 0.18)',
				'popover': '0 12px 24px rgba(26, 24, 44, 0.18)',
				'modal': '0 25px 50px rgba(0, 0, 0, 0.25)',
				'dropdown': '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
				
				// Button shadows
				'button': '0 1px 2px rgba(0, 0, 0, 0.05)',
				'button-inset': 'inset 0 1px 1px rgba(255, 255, 255, 0.11)',
				'button-active': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
				
				// Input shadows
				'input': '0 1px 2px rgba(0, 0, 0, 0.05)',
				'input-focus': '0 0 0 3px rgba(95, 46, 252, 0.1)',
				
				// Tab shadows
				'tab-active': '0 0 3px rgba(22, 0, 155, 0.35)'
			},
			borderRadius: {
				panel: '14px',
				card: '12px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
};

export default config;
