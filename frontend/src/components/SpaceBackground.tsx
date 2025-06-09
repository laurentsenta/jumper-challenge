'use client';

import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class
    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      trail: { x: number; y: number; z: number }[];
      maxTrailLength: number;

      constructor() {
        this.x = Math.random() * canvas.width - canvas.width / 2;
        this.y = Math.random() * canvas.height - canvas.height / 2;
        this.z = Math.random() * 1500;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 2 + 1; // Increased speed
        this.trail = [];
        this.maxTrailLength = 10; // Number of trail segments
      }

      update() {
        // Store current position in trail
        this.trail.unshift({ x: this.x, y: this.y, z: this.z });
        
        // Limit trail length
        if (this.trail.length > this.maxTrailLength) {
          this.trail.pop();
        }

        this.z -= this.speed;
        if (this.z <= 1) {
          this.z = 1500;
          this.x = Math.random() * canvas.width - canvas.width / 2;
          this.y = Math.random() * canvas.height - canvas.height / 2;
          this.trail = []; // Clear trail when star resets
        }
      }

      draw() {
        if (!ctx || !canvas) return;

        // Draw trail
        for (let i = this.trail.length - 1; i >= 0; i--) {
          const point = this.trail[i];
          const x = (point.x / point.z) * 1000 + canvas.width / 2;
          const y = (point.y / point.z) * 1000 + canvas.height / 2;
          const size = (1 - point.z / 1500) * this.size * 0.5;
          const opacity = (i / this.trail.length) * 0.5;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }

        // Draw main star
        const x = (this.x / this.z) * 1000 + canvas.width / 2;
        const y = (this.y / this.z) * 1000 + canvas.height / 2;
        const size = (1 - this.z / 1500) * this.size;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z / 1500})`;
        ctx.fill();

        // Add glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Create stars
    const stars: Star[] = Array.from({ length: 200 }, () => new Star());

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Create a more pronounced trail effect
      ctx.fillStyle = 'rgba(0, 0, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        bgcolor: 'black',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default SpaceBackground; 
