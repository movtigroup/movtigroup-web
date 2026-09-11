<template>
  <canvas ref="canvas" class="hero-three" aria-hidden="true"></canvas>
</template>

<script setup>
// Ambient WebGL particle sphere for the hero — lazily initialized after load,
// paused when off-screen/hidden, and skipped entirely for reduced-motion users.
const canvas = ref(null)

let renderer, scene, camera, points, rafId
let visible = true
let inView = true
let running = false

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const tick = () => {
  rafId = requestAnimationFrame(tick)
  if (!visible || !inView) return
  if (points) {
    points.rotation.y += 0.0006
    points.rotation.x += 0.0002
  }
  renderer?.render(scene, camera)
}

const start = () => {
  if (running) return
  running = true
  tick()
}

const stop = () => {
  running = false
  if (rafId) cancelAnimationFrame(rafId)
}

onMounted(async () => {
  if (reducedMotion()) return

  try {
    const THREE = await import('three')

    const width = canvas.value.clientWidth
    const height = canvas.value.clientHeight

    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height, false)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 7.5

    // Particle sphere in brand colors
    const COUNT = 900
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const c1 = new THREE.Color('#6c5ce7')
    const c2 = new THREE.Color('#00cec9')
    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (COUNT - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = 2.39996 * i
      positions[i * 3] = Math.cos(theta) * radius * 3.4
      positions[i * 3 + 1] = y * 3.4
      positions[i * 3 + 2] = Math.sin(theta) * radius * 3.4
      const mixed = c1.clone().lerp(c2, (i / COUNT + Math.random() * 0.2) % 1)
      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    points = new THREE.Points(geometry, material)
    points.position.x = 4.2
    scene.add(points)

    // Pause rendering when the tab or the hero is not visible
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden
    })
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
    }, { threshold: 0.05 })
    io.observe(canvas.value)

    window.addEventListener('resize', () => {
      if (!renderer) return
      const w = canvas.value.clientWidth
      const h = canvas.value.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })

    start()
  } catch (err) {
    // WebGL unavailable — fail silently, the CSS orbs remain as fallback
    console.warn('three.js hero disabled:', err?.message)
  }
})

onUnmounted(() => {
  stop()
  renderer?.dispose()
})
</script>

<style scoped>
.hero-three {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.55;
  pointer-events: none;
}
</style>
