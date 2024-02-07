import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import fontMagician from 'postcss-font-magician'
import { fontFamily } from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

import { adjustColors, fontVariants } from './app/shared/utils'

const COLOR_PRIMARY = '#e37777'
const COLOR_SECONDARY = '#f2f2f2'

const FONT_FAMILY = 'Mukta,Lora'
const FONT_STYLES = '300,400,500,600,700'

export default {

    content: [
        './app/**/*.{html,js,jsx,ts,tsx,vue}',
        './renderer/*.{html,js,jsx,ts,tsx,vue}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [FONT_FAMILY.split(',')[0], ...fontFamily.sans],
                serif: [FONT_FAMILY.split(',')[1], ...fontFamily.serif],
            },
            fontSize: {
                xxs: '0.625rem',
            },
            colors: {
                primary: {
                    lighter: adjustColors(COLOR_PRIMARY, 0.2),
                    "DEFAULT": COLOR_PRIMARY,
                    darker: adjustColors(COLOR_PRIMARY, -0.2),
                },
                secondary: {
                    lighter: adjustColors(COLOR_SECONDARY, 0.01),
                    "DEFAULT": COLOR_SECONDARY,
                    darker: adjustColors(COLOR_SECONDARY, -0.05),
                }
            },
            maxWidth: {
                '8xl': '88rem'
            }
        },
    },
    plugins: [
        forms,
        typography,
        fontMagician({
            variants: fontVariants(FONT_FAMILY.split(','), FONT_STYLES.split(',')),
            foundries: ['google']
        })
    ],
} satisfies Config