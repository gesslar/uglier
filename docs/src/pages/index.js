import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import {useEffect, useRef, useState} from 'react';

import styles from './index.module.css';

const beforeCode = `
// .eslintrc.json — 200+ lines of this
{
  "extends": ["eslint:recommended", "prettier"],
  "plugins": ["@stylistic"],
  "rules": {
    "semi": ["error", "never"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "@stylistic/arrow-parens": ["error", "as-needed"],
    "@stylistic/brace-style": ["error", "1tbs"],
    "@stylistic/keyword-spacing": ["error", {
      "before": true, "after": false,
      "overrides": { "return": { "after": true } }
    }],
    // ... another 50 rules ...
  }
}
// And you still need prettier.config.js too.
`;

const afterCode = `
// eslint.config.js — that's it, that's the whole file
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js",
      "lints-jsdoc",
      "node",
    ]
  })
]
`;

const features = [
  {
    title: 'Composable Blocks',
    description: 'Mix and match from 10 config blocks. Node, React, Tauri, VSCode extensions — pick what you need, skip what you don\'t.',
    icon: '[+]',
  },
  {
    title: 'No Prettier Required',
    description: 'All formatting handled by ESLint alone. No conflicting tools, no extra configs, no arguing about semicolons.',
    icon: '!;',
  },
  {
    title: 'Flat Config Native',
    description: 'Built for ESLint v9+ flat configs from the ground up. No legacy compatibility layers or .eslintrc baggage.',
    icon: 'v9',
  },
  {
    title: 'CLI Setup',
    description: 'One command to install, init, add, or remove configs. Detects your package manager automatically.',
    icon: 'npx',
  },
  {
    title: 'Fully Customizable',
    description: 'Override indent, max line length, file patterns, and individual rules per config block. Opinionated defaults, flexible escape hatches.',
    icon: '{*}',
  },
  {
    title: 'TypeScript Ready',
    description: 'Full TypeScript definitions generated from JSDoc. Autocomplete and type checking for all options.',
    icon: '.ts',
  },
];

function useScrollShrink() {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const shrinkAt = 80;
    const unshrinkAt = 40;
    let ticking = false;

    const onScroll = () => {
      if(!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setShrunk(prev => {
            if(!prev && y > shrinkAt) return true;
            if(prev && y < unshrinkAt) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return shrunk;
}

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if(!el) return;

    const observer = new IntersectionObserver(
      entries => {
        for(const entry of entries) {
          entry.target.classList.toggle(styles.revealed, entry.isIntersecting);
        }
      },
      {threshold: 0.15, rootMargin: '0px 0px -100px 0px'}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function RevealSection({children, className, ...props}) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className={clsx(styles.revealSection, className)} {...props}>
      {children}
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const shrunk = useScrollShrink();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, shrunk && styles.heroBannerShrunk)}>
      <div className={clsx('container', styles.heroInner, shrunk && styles.heroInnerShrunk)}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={clsx(styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div>
        </div>
        <div className={clsx(styles.buttons)}>
          <Link
            className="button button--primary button--lg" to="/docs/quick-start/intro">
            Get Started
          </Link>
          <Link
            className={clsx("button button--outline button--lg", styles.buttonOutline)} to="/docs/reference/api">
            Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function BeforeAfter() {
  return (
    <RevealSection className={styles.beforeAfter}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Config files should be short
        </Heading>
        <div className={styles.codeComparison}>
          <div className={styles.codeBlock}>
            <div className={styles.codeLabel}>Without Uglier — sprawling JSON config</div>
            <CodeBlock language="json">{beforeCode}</CodeBlock>
          </div>
          <div className={styles.codeBlock}>
            <div className={styles.codeLabel}>With Uglier — composable, readable, done</div>
            <CodeBlock language="js">{afterCode}</CodeBlock>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

function Feature({title, description, icon}) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

function Features() {
  return (
    <RevealSection className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Everything you need, nothing you don't
        </Heading>
        <div className={styles.featureGrid}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function Audiences() {
  return (
    <RevealSection className={styles.audiences}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Pick your path
        </Heading>
        <div className={styles.audienceGrid}>
          <Link to="/docs/quick-start/intro" className={styles.audienceCard}>
            <Heading as="h3">Quick Start</Heading>
            <p>Install uglier and have a working ESLint config in under two minutes.</p>
          </Link>
          <Link to="/docs/configs/lints-js" className={styles.audienceCard}>
            <Heading as="h3">Configs</Heading>
            <p>Explore each of the 10 composable config blocks and what they enforce.</p>
          </Link>
          <Link to="/docs/customization/options" className={styles.audienceCard}>
            <Heading as="h3">Customization</Heading>
            <p>Override indent, line length, file patterns, and individual rules per block.</p>
          </Link>
          <Link to="/docs/reference/api" className={styles.audienceCard}>
            <Heading as="h3">Reference</Heading>
            <p>Complete API documentation, CLI commands, and type definitions.</p>
          </Link>
          <Link to="/docs/nerds/lints-js" className={styles.audienceCard}>
            <Heading as="h3">Nerds</Heading>
            <p>Read the actual source for every config block. The actual source for every config block. No trust fall required.</p>
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}

/**
 * The home page!
 */
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Opinionated, composable ESLint flat configs for the rest of us.">
      <HomepageHeader />
      <main>
        <BeforeAfter />
        <Features />
        <Audiences />
      </main>
    </Layout>
  );
}
