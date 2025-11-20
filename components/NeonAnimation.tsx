'use client'

import { useEffect, useRef } from 'react'

export function NeonAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system for sand/light effect
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      maxLife: number
      hue: number
    }

    const particles: Particle[] = []

    // Create particles with golden/blonde tones
    const createParticles = () => {
      for (let i = 0; i < 60; i++) {
        const hue = Math.random() * 60 + 30 // Golden to blonde range (30-90 degrees)
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.15,
          life: 0,
          maxLife: Math.random() * 400 + 250,
          hue,
        })
      }
    }
    createParticles()

    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.0003

      // Gradient background - golden hour to sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#FFE4B5')      // Moccasin - light blonde
      gradient.addColorStop(0.3, '#FFD580')    // Golden
      gradient.addColorStop(0.5, '#FFC966')    // Darker gold
      gradient.addColorStop(0.7, '#E8C547')    // Sand
      gradient.addColorStop(1, '#D4A574')      // Beach sand

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw flowing wave patterns (past meets future)
      const waveCount = 5
      for (let w = 0; w < waveCount; w++) {
        const waveY = (canvas.height * 0.4) + w * 30
        const amplitude = 15 + w * 5
        const frequency = 0.008 - w * 0.001

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - w * 0.02})`
        ctx.lineWidth = 2 - w * 0.3
        ctx.beginPath()

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = waveY + Math.sin(x * frequency + time) * amplitude + Math.cos(x * frequency * 0.5 + time * 0.7) * amplitude * 0.5
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Update and draw particles (light dancing in the air)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx + Math.sin(time + i) * 0.1
        p.y += p.vy - 0.05 // Slight upward drift
        p.life++

        // Fade in and out
        let alpha = p.opacity
        if (p.life < p.maxLife * 0.2) {
          alpha *= p.life / (p.maxLife * 0.2)
        } else if (p.life > p.maxLife * 0.7) {
          alpha *= 1 - (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3)
        }

        // Draw particle with golden/blonde glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Respawn if dead or out of bounds
        if (p.life > p.maxLife || p.y < -20 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          const hue = Math.random() * 60 + 30
          particles[i] = {
            x: Math.random() * canvas.width,
            y: canvas.height + 20,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.6 + 0.15,
            life: 0,
            maxLife: Math.random() * 400 + 250,
            hue,
          }
        }
      }

      // Radial glow - future energy radiating from center
      const centerX = canvas.width / 2
      const centerY = canvas.height * 0.5
      const radialGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height) * 0.8)
      radialGradient.addColorStop(0, 'rgba(255, 220, 100, 0.1)')
      radialGradient.addColorStop(0.5, 'rgba(255, 200, 80, 0.05)')
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = radialGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle vignette (respecting the past)
      const vignetteGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height))
      vignetteGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)')
      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
