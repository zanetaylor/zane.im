const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
delete colors['lightBlue'] // A bit hackful but fixes - https://github.com/tailwindlabs/tailwindcss/issues/4690

module.exports = {
    mode: 'jit',
    darkMode: 'class',
    purge: {
        content: ['./public/**/*.html', './src/**/*.{astro,js,ts}'],
        options: {
            safelist: ['dark'],
        },
    },
    theme: {
        colors: {
            ...colors,
            // Shades-of-X
            // keep one group of colors enabled at a time

            primary: colors.violet[700],
            primaryDark: colors.violet[600],
            primarySecondary: colors.violet[700],
            primarySecondaryDark: colors.violet[600],
        },
		fontFamily: {
			sans: ['Fira Mono', ...fontFamily.sans],
            mono: ['Fira Mono', ...fontFamily.mono],
            display: ['Work Sans', ...fontFamily.sans]
		},
		extend: {
            typography: (theme) => ({
                dark: {
                    css: {
                        color: theme("colors.gray.200"),
                    },
                },
                DEFAULT: {
                    css: {
                        a: {
                            color: theme('colors.primarySecondaryDark'),
                              '&:hover': {
                                color: theme('colors.primary'),
                              },
                        },
                        blockquote: {
                            color: theme('colors.primary'),
                            borderColor: theme('colors.primaryDark')
                        },
                        'blockquote > p::before, p::after': {
                            color: theme('colors.primaryDark'),
                        },
                        h1: {
                            color: theme('colors.primarySecondaryDark'),
                        },
                        h2: {
                            color: theme('colors.primarySecondaryDark'),
                        },
                        h3: {
                            color: theme('colors.primarySecondaryDark'),
                        },
                    }
                },
            }),
		},
	},
    variants: {
        extend: { typography: ["dark"] }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        // require('@tailwindcss/line-clamp'),
        // require('@tailwindcss/aspect-ratio'),
    ]
};
