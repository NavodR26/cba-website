'use client'

import { useEffect } from 'react'

export default function GsapHero() {
  useEffect(() => {
    let ctx: any = null
    let gsap: any
    async function run() {
      const mod = await import('gsap')
      gsap = mod.default || mod
      try {
        const ScrollTriggerMod = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTriggerMod.default || ScrollTriggerMod)
      } catch (e) {
        // ScrollTrigger optional
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.out' } })

        const navbarItems = gsap.utils.toArray('.cba-site-navbar')
        const heroTitle = gsap.utils.toArray('.cba-hero-title')
        const heroSub = gsap.utils.toArray('.cba-hero-sub')
        const heroButtons = gsap.utils.toArray('.cba-hero-buttons > *')
        const heroRightCard = gsap.utils.toArray('.cba-hero-right-card')

        if (navbarItems.length) tl.from(navbarItems, { y: -18, opacity: 0 }, 0)
        if (heroTitle.length) tl.from(heroTitle, { y: 36, opacity: 0 }, 0.08)
        if (heroSub.length) tl.from(heroSub, { y: 24, opacity: 0 }, 0.2)
        if (heroButtons.length) tl.from(heroButtons, { y: 18, opacity: 0, stagger: 0.08 }, 0.4)
        if (heroRightCard.length) tl.from(heroRightCard, { scale: 0.98, opacity: 0 }, 0.45)
      })
    }

    run()

    return () => {
      if (ctx && ctx.revert) ctx.revert()
    }
  }, [])

  return null
}
