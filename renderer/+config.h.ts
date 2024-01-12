import type { Config } from 'vike/types'
import { PageLayout as Layout } from '_shared/ui/layouts'
import Head from '_shared/ui/layouts/HeadDefault'
import logoUrl from '_shared/assets/icon.svg'
import vikeReact from 'vike-react'

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "My Vike App",
  // <meta name="description">
  description: "Demo showcasing Vike",
  // <link rel="icon" href="${favicon}" />
  favicon: logoUrl,
  extends: vikeReact,
} satisfies Config
