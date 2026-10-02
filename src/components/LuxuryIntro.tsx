import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface LuxuryIntroProps {
  onComplete: () => void;
}

interface CandleParticle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  speedY: number;
  speedX: number;
  oscillation: number;
  oscillationSpeed: number;
}

export const LuxuryIntro: React.FC<LuxuryIntroProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 6-Second Timing & Progress Controller
  useEffect(() => {
    const startTime = performance.now();
    const duration = 6000; // Exact 6.0 seconds

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (elapsed >= 5200 && !isExiting) {
        setIsExiting(true);
      }

      if (elapsed >= duration) {
        clearInterval(timer);
        onComplete();
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isExiting, onComplete]);

  // High-Performance Candle Glow Canvas Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Warm candle colors: soft champagne, golden ember, deep honey, amber glow
    const palette = [
      'rgba(255, 230, 150,', // Light champagne flame tip
      'rgba(245, 205, 100,', // Warm gold
      'rgba(212, 175, 55,',  // Alvéra Royal Gold
      'rgba(235, 160, 60,',  // Amber core
      'rgba(255, 140, 30,',  // Candle fire ember
    ];

    const particleCount = 48;
    const particles: CandleParticle[] = [];

    // Initialize particles clustered around center behind the logo
    for (let i = 0; i < particleCount; i++) {
      const pColor = palette[Math.floor(Math.random() * palette.length)];
      const baseR = Math.random() * 3.5 + 1.2;
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * Math.min(width * 0.5, 420),
        y: height / 2 + (Math.random() - 0.5) * 260 + 40,
        radius: baseR,
        baseRadius: baseR,
        color: pColor,
        alpha: Math.random() * 0.7,
        maxAlpha: Math.random() * 0.75 + 0.25,
        speedY: -(Math.random() * 0.7 + 0.35),
        speedX: (Math.random() - 0.5) * 0.45,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial ambient candlelight gradient behind logo
      const centerX = width / 2;
      const centerY = height / 2;
      const ambientGlow = ctx.createRadialGradient(
        centerX,
        centerY - 20,
        20,
        centerX,
        centerY - 20,
        Math.min(width * 0.45, 380)
      );
      ambientGlow.addColorStop(0, 'rgba(235, 185, 75, 0.24)');
      ambientGlow.addColorStop(0.35, 'rgba(212, 175, 55, 0.12)');
      ambientGlow.addColorStop(0.7, 'rgba(180, 120, 35, 0.04)');
      ambientGlow.addColorStop(1, 'rgba(18, 15, 13, 0)');

      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 20, Math.min(width * 0.45, 380), 0, Math.PI * 2);
      ctx.fill();

      // Render individual candle embers & glowing orbs
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.oscillation += p.oscillationSpeed;
        p.x += Math.sin(p.oscillation) * 0.55 + p.speedX;

        // Dynamic pulsing radius
        p.radius = p.baseRadius + Math.sin(p.oscillation * 1.5) * 0.8;

        // Respawn when floated too high or faded
        if (p.y < height / 2 - 280 || p.alpha <= 0.01) {
          p.x = width / 2 + (Math.random() - 0.5) * Math.min(width * 0.4, 360);
          p.y = height / 2 + (Math.random() - 0.2) * 220;
          p.alpha = 0.05;
        } else {
          // Fade in then fade out gently as it rises
          const distFromCenterY = Math.abs(p.y - height / 2);
          if (distFromCenterY < 120) {
            p.alpha = Math.min(p.maxAlpha, p.alpha + 0.015);
          } else {
            p.alpha = Math.max(0.01, p.alpha - 0.006);
          }
        }

        // Draw glowing particle with soft shadow blur
        ctx.save();
        ctx.shadowBlur = p.radius * 6;
        ctx.shadowColor = `${p.color}${p.alpha})`;
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, p.radius), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(8px)',
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#120F0D] text-[#FAF8F5] select-none"
        >
          {/* Candle Glow Canvas Layer (Placed behind the logo, absolutely free without box) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Quick Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onClick={onComplete}
            className="absolute top-6 right-6 z-30 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            aria-label="Pular introdução e entrar no site"
          >
            <span>Entrar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* Central Area: Candle Flame + Free Floating Large Logo with Variable Opacity */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-2xl text-center">
            {/* Candle Flame Element with Natural Flicker & Glow */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 15 }}
              animate={{
                scale: [0.92, 1.08, 0.96, 1.04, 0.95],
                opacity: [0.9, 1, 0.85, 1, 0.92],
                y: [0, -3, 1, -2, 0],
                rotate: [-0.8, 0.8, -0.4, 0.6, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
              className="relative mb-5 flex flex-col items-center"
            >
              {/* Flame Tear Shape with Warm Radial Spectrum */}
              <div className="relative w-8 h-13">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 82%, #ffffff 0%, #fff0a8 22%, #ffa114 62%, rgba(212,175,55,0) 100%)',
                    filter:
                      'drop-shadow(0 0 14px rgba(255, 175, 20, 0.9)) drop-shadow(0 0 32px rgba(212, 175, 55, 0.65))',
                    borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                  }}
                />
                {/* Blueish-White Inner Flame Core */}
                <div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, #ffffff 40%, rgba(140, 210, 255, 0.85) 95%)',
                  }}
                />
              </div>

              {/* Cotton Wick */}
              <div className="w-[2px] h-3 bg-stone-900 rounded-full -mt-1 shadow" />
            </motion.div>

            {/* VERY LARGE FREE FLOATING LOGO - 100% Free with Variable Opacity & Independent Levitation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25, filter: 'blur(10px)' }}
              animate={{
                // Independent gentle floating on Y, X, with organic micro-tilt
                y: [0, -12, 2, -9, 0],
                x: [0, 4, -3, 2, 0],
                rotate: [-0.6, 0.5, -0.3, 0],
                // Variable opacity simulating candlelight reflection
                opacity: [0.85, 1, 0.9, 1, 0.84, 1],
                filter: [
                  'blur(0px) drop-shadow(0 0 25px rgba(212, 175, 55, 0.45))',
                  'blur(0px) drop-shadow(0 0 52px rgba(245, 210, 110, 0.75))',
                  'blur(0px) drop-shadow(0 0 28px rgba(212, 175, 55, 0.48))',
                  'blur(0px) drop-shadow(0 0 45px rgba(230, 190, 85, 0.7))',
                  'blur(0px) drop-shadow(0 0 25px rgba(212, 175, 55, 0.45))',
                ],
              }}
              transition={{
                y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                filter: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative select-none pointer-events-none"
            >
              <img
                src="https://i.postimg.cc/Nf2pLJ1Z/Chat-GPT-Image-30-de-set-de-2026-07-54-12.png"
                alt="Alvéra Logo Oficial"
                className="w-auto h-44 sm:h-60 md:h-72 object-contain mx-auto filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Brand Name & Categories */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 space-y-2"
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] font-bold text-white uppercase drop-shadow-[0_2px_18px_rgba(212,175,55,0.45)]">
                ALVÉRA
              </h1>

              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
                <span className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#D4AF37] font-medium font-sans">
                  Velas • Aromas • Bem-Estar
                </span>
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
              </div>
            </motion.div>

            {/* Poetic Whisper */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.95] }}
              transition={{ delay: 2.2, duration: 1.4 }}
              className="mt-4 text-xs sm:text-sm text-stone-300 font-light tracking-wider max-w-md mx-auto italic font-serif"
            >
              "Acendendo memórias, acolhendo sentidos."
            </motion.p>
          </div>

          {/* Golden Progress Bar (Exact 6-Second Clock) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 sm:w-64 flex flex-col items-center gap-2 z-20">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C5A059] via-[#E6CA65] to-[#D4AF37] shadow-[0_0_10px_#D4AF37] transition-all ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] tracking-[0.25em] text-stone-400 uppercase font-sans">
              Entrando no ateliê...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
