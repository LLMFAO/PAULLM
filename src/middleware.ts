import { defineMiddleware } from 'astro/middleware';
import { createHash } from 'crypto';

// Create a deterministic seed from IP address
function getIPSeed(ip: string): number {
  const hash = createHash('sha256').update(ip).digest('hex');
  return parseInt(hash.slice(0, 8), 16);
}

// Generate content based on IP seed
function generateContent(seed: number) {
  const rng = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const titles = [
    "EXPLORING NEURAL NETWORKS",
    "QUANTUM COMPUTING FRONTIERS",
    "AI CONSCIOUSNESS RESEARCH",
    "LATENT SPACE DISCOVERIES"
  ];

  const descriptions = [
    "Diving deep into the architecture of artificial minds",
    "Pushing the boundaries of quantum-inspired AI",
    "Investigating the nature of machine consciousness",
    "Mapping the topology of latent representations"
  ];

  const titleIndex = Math.floor(rng() * titles.length);
  
  return {
    title: titles[titleIndex],
    description: descriptions[titleIndex],
    randomValue: rng()
  };
}

export const onRequest = defineMiddleware(async (context, next) => {
  const ip = context.request.headers.get('x-forwarded-for') || 
             context.request.headers.get('x-real-ip') || 
             '127.0.0.1';
             
  const seed = getIPSeed(ip);
  const content = generateContent(seed);
  
  // Add the generated content to locals so it's available in components
  context.locals.generatedContent = content;
  
  return next();
});