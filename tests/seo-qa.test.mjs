import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

test('SEO & Meta Tag Check: index.html has lang="ko", title, description, canonical, and Open Graph tags', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8')
  assert.match(html, /<html lang="ko">/)
  assert.match(html, /<meta charset="UTF-8"\s*\/?>/i)
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1\.0"\s*\/?>/i)
  assert.match(html, /<title>.*EBRSoft.*Experience Beyond Reality.*<\/title>/)
  assert.match(html, /<meta name="description" content="[^"]{40,}"\s*\/?>/)
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.ebrsoft\.co\.kr\/"\s*\/?>/)
  assert.match(html, /<meta property="og:title"/)
  assert.match(html, /<meta property="og:description"/)
  assert.match(html, /<meta property="og:image"/)
})

test('Semantic Heading & Asset Check: Single H1 in HeroSection, proper alt and fetchpriority on logo', () => {
  const hero = fs.readFileSync(path.join(rootDir, 'src/components/sections/HeroSection.vue'), 'utf-8')
  const h1Matches = hero.match(/<h1\b/g) || []
  assert.equal(h1Matches.length, 1, 'HeroSection must contain exactly one <h1> tag')

  const header = fs.readFileSync(path.join(rootDir, 'src/components/layout/AppHeader.vue'), 'utf-8')
  assert.match(header, /fetchpriority="high"/)
  assert.match(header, /:alt=/)

  assert.ok(fs.existsSync(path.join(rootDir, 'public/images/logo-horizontal.png')))
  assert.ok(fs.existsSync(path.join(rootDir, 'public/images/logo-vertical.png')))
})

test('Korean Typography Check: word-break: keep-all is enforced in global styles', () => {
  const mainCss = fs.readFileSync(path.join(rootDir, 'src/assets/styles/main.css'), 'utf-8')
  assert.match(mainCss, /word-break:\s*keep-all/)
})

