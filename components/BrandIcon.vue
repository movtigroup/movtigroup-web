<template>
  <span
    class="brand-icon"
    :style="{
      width: size + 'px',
      height: size + 'px',
     WebkitMaskImage: `url('/images/brands/${icon}.svg')`,
      maskImage: `url('/images/brands/${icon}.svg')`
    }"
    role="img"
    :aria-label="label || icon"
  ></span>
</template>

<script setup>
// Recolorable brand icon: the vendored SVG (public/images/brands) is used as a
// CSS mask, so the glyph inherits `currentColor` and adapts to the theme.
defineProps({
  icon: { type: String, required: true },
  size: { type: Number, default: 24 },
  label: { type: String, default: '' }
})
</script>

<style scoped>
.brand-icon {
  display: inline-block;
  flex: none;
  background-color: currentColor;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  vertical-align: middle;
}
</style>
