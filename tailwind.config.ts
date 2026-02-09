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
				brand: {
					purple: '#5B3DF5',
					primary: '#5F2EFC'
				},
				text: {
					main: '#2B2834',
					muted: '#5F5971',
					light: '#A5A1AF'
				},
				ink: '#0B0B0F',
				line: '#ECECF2',
				border: {
					DEFAULT: 'hsl(var(--border))',
					subtle: '#EBEBEB'
				},
				soft: '#F7F7FB',
				surface: '#F9F9FB',
				active: '#F7F5FF',
				success: {
					DEFAULT: '#18B26B',
					soft: '#E7F3EF',
					text: '#239B73'
				},
				warning: {
					DEFAULT: '#F59E0B',
					soft: '#FFF3EB',
					text: '#FB6A00'
				},
				danger: {
					DEFAULT: '#EF4444',
					soft: '#FBECEB',
					text: '#CD110A'
				},
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
			fontFamily: {
				sans: ['"Neue Montreal"'],
			},
			boxShadow: {
				card: '0 8px 24px rgba(17, 16, 35, 0.08)',
				pop: '0 12px 24px rgba(26, 24, 44, 0.18)'
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
