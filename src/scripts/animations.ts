import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide GSAP polish:
 * - Soft fade/slide-in for article content on load and scroll
 * - Hover lift on character / audio boxes
 * - Subtle nav link scale on hover (desktop)
 *
 * Mentorship note: GSAP runs in the browser only. Astro's
 * <script> tags are bundled as client modules — perfect for this.
 */
export function initSiteAnimations() {
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduceMotion) return;

	const article = document.querySelector('article');
	if (article) {
		gsap.from(article, {
			opacity: 0,
			y: 28,
			duration: 0.75,
			ease: 'power2.out',
		});
	}

	const revealItems = document.querySelectorAll(
		'.characterbox, .audiobox, article dl dt, article dl dd, .imageSquare, .imageWorld',
	);

	revealItems.forEach((el) => {
		gsap.from(el, {
			scrollTrigger: {
				trigger: el,
				start: 'top 88%',
				toggleActions: 'play none none none',
			},
			opacity: 0,
			y: 24,
			duration: 0.55,
			ease: 'power2.out',
		});
	});

	document.querySelectorAll('.characterbox, .audiobox').forEach((box) => {
		const el = box as HTMLElement;
		el.addEventListener('mouseenter', () => {
			gsap.to(el, { y: -4, duration: 0.25, ease: 'power2.out' });
		});
		el.addEventListener('mouseleave', () => {
			gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' });
		});
	});

	document.querySelectorAll('.nav-links a').forEach((link) => {
		const el = link as HTMLElement;
		el.addEventListener('mouseenter', () => {
			gsap.to(el, { scale: 1.06, duration: 0.2, ease: 'power1.out' });
		});
		el.addEventListener('mouseleave', () => {
			gsap.to(el, { scale: 1, duration: 0.25, ease: 'power1.out' });
		});
	});

	document.querySelectorAll('footer a').forEach((link) => {
		const el = link as HTMLElement;
		el.addEventListener('mouseenter', () => {
			gsap.to(el, { x: 3, duration: 0.2, ease: 'power1.out' });
		});
		el.addEventListener('mouseleave', () => {
			gsap.to(el, { x: 0, duration: 0.25, ease: 'power1.out' });
		});
	});
}
