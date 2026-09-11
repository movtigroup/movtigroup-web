<template>
  <img
    v-if="raw"
    :src="`/images/brands/${icon}.svg`"
    :alt="label || icon"
    :width="size"
    :height="size"
    class="brand-icon-raw"
  />
  <span
    v-else
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
// Brand icons vendored from @lobehub/icons-static-svg + simple-icons.
// Mask mode (default): recolorable — the glyph inherits `currentColor`.
// Raw mode: renders the official (multi-color) SVG as an <img>.
defineProps({
  icon: { type: String, required: true },
  size: { type: Number, default: 24 },
  label: { type: String, default: '' },
  raw: { type: Boolean, default: false }
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

.brand-icon-raw {
  display: inline-block;
  flex: none;
  vertical-align: middle;
}
</style>
