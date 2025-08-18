import { useMemo } from 'react';

export default function PulsingBorderShader(props: any) {
  // Generate random movement values only once when component is created
  const { randomDuration, randomDelay } = useMemo(() => ({
    randomDuration: 15 + Math.random() * 10, // 15-25 seconds
    randomDelay: Math.random() * 5 // 0-5 seconds delay
  }), []);

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{
        width: "800px",
        height: "800px",
        border: "none",
        outline: "none",
        animation: `float ${randomDuration}s ease-in-out infinite`,
        animationDelay: `${randomDelay}s`,
        ...props.style,
      }}
    >
      {/* Glowing circle PNG */}
      <img
        src="/images/glowCircle.png"
        alt="Glowing circle"
        className="w-full h-full object-contain animate-spin-slow rounded-full"
        style={{ 
          width: "800px", 
          height: "800px",
          border: "none",
          outline: "none",
          mask: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 0%, transparent 100%)",
          WebkitMask: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.4) 40%, transparent 60%)"
        }}
      />     
    </div>
    );
}
