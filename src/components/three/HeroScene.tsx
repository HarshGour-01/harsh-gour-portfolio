import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmall = window.matchMedia('(max-width: 720px)').matches
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isSmall, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.25 : 1.8))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0.2, 6.3)

    const group = new THREE.Group()
    group.rotation.set(0.08, -0.2, 0)
    scene.add(group)

    const gold = new THREE.MeshPhysicalMaterial({ color: 0xc9a45c, metalness: 1, roughness: 0.2, clearcoat: 0.85, clearcoatRoughness: 0.18 })
    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.42, 4), gold)
    group.add(sphere)

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.07, 2),
      new THREE.MeshBasicMaterial({ color: 0xf3e6c8, wireframe: true, transparent: true, opacity: 0.18 })
    )
    group.add(inner)

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd8b978, transparent: true, opacity: 0.52 })
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.012, 8, 160), ringMaterial)
    ringA.rotation.set(0.82, 0.24, 0.18)
    group.add(ringA)
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.008, 8, 160), new THREE.MeshBasicMaterial({ color: 0xf3e6c8, transparent: true, opacity: 0.24 }))
    ringB.rotation.set(-0.45, 0.86, -0.14)
    group.add(ringB)

    const particleCount = isSmall ? 90 : 170
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.2 + Math.random() * 1.9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.72
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xf3e6c8, size: isSmall ? 0.022 : 0.028, transparent: true, opacity: 0.72, sizeAttenuation: true }))
    scene.add(particles)

    scene.add(new THREE.AmbientLight(0xf3e6c8, 1.6))
    const keyLight = new THREE.PointLight(0xd8b978, 12, 18)
    keyLight.position.set(3.5, 3.2, 4.5)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0x9d7940, 8, 15)
    fillLight.position.set(-3.5, -1.8, 2)
    scene.add(fillLight)

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', resize)
    resize()

    let frame = 0
    const animate = () => {
      frame = window.requestAnimationFrame(animate)
      const drift = reducedMotion ? 0 : 0.0018
      sphere.rotation.y += drift
      sphere.rotation.x += drift * 0.36
      inner.rotation.y -= drift * 0.6
      ringA.rotation.z += drift * 0.45
      ringB.rotation.z -= drift * 0.2
      particles.rotation.y += drift * 0.25
      if (!reducedMotion) {
        group.rotation.y += (pointer.x * 0.09 - group.rotation.y) * 0.025
        group.rotation.x += (-pointer.y * 0.045 + 0.08 - group.rotation.x) * 0.025
      }
      renderer.render(scene, camera)
    }
    if (reducedMotion) {
      renderer.render(scene, camera)
    } else {
      animate()
    }

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
      particleGeometry.dispose()
      particles.material.dispose()
      sphere.geometry.dispose(); sphere.material.dispose()
      inner.geometry.dispose(); inner.material.dispose()
      ringA.geometry.dispose(); ringA.material.dispose()
      ringB.geometry.dispose(); ringB.material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-scene" aria-label="Interactive metallic gold geometric sculpture" role="img" />
}
