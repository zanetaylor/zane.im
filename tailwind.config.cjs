const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// hack to fix this issue w/ deprecated color names https://github.com/tailwindlabs/tailwindcss/issues/4690
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: ['./public/**/*.html', './src/**/*.{astro,js,ts}'],
    // purge: {
    //     content: ['./public/**/*.html', './src/**/*.{astro,js,ts}'],
    //     options: {
    //         safelist: ['dark'],
    //     },
    // },
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
			sans: ['Atkinson Hyperlegible', ...fontFamily.sans],
            serif: ['Fira Mono', ...fontFamily.serif],
            mono: ['Fira Mono', ...fontFamily.mono],
            display: ['Atkinson Hyperlegible', ...fontFamily.sans]
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
    // variants: {
    //     extend: { typography: ["dark"] }
    // },
    plugins: [
        require('@tailwindcss/typography'),
        // require('@tailwindcss/forms'),
        // require('@tailwindcss/line-clamp'),
        // require('@tailwindcss/aspect-ratio'),
    ]
};
