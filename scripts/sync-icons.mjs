#!/usr/bin/env node
// scripts/sync-icons.mjs
// Copies the brand icons we use from the official @lobehub/icons-static-svg
// package (node_modules) into public/images/brands — keeps assets vendored,
// offline and reproducible. https://icons.lobehub.com
import { copyFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PKG = join(ROOT, 'node_modules', '@lobehub/icons-static-svg', 'icons')
const OUT = join(ROOT, 'public', 'images', 'brands')

const ICONS = [
  // brands (mono — rendered via CSS mask, inherits theme color)
  'github',
  'nousresearch',
  'kilocode',
  'midjourney',
  'openai',
  'claude',
  'gemini',
  'deepseek',
  'huggingface',
  // color variants (rendered as <img>, keep official colors)
  'cherrystudio-color'
  // telegram / linkedin / x are vendored from simple-icons (already in public/images/brands)
]

let copied = 0
for (const icon of ICONS) {
  copyFileSync(join(PKG, `${icon}.svg`), join(OUT, `${icon}.svg`))
  copied++
}
console.log(`synced ${copied} brand icons from @lobehub/icons-static-svg`)
