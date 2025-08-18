export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Background Image Test:</h2>
          <img 
            src="/images/background.png" 
            alt="Background test" 
            className="w-64 h-32 object-cover border"
            onError={(e) => console.error('Background failed:', e.target.src)}
            onLoad={() => console.log('Background loaded')}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">GlowCircle Image Test:</h2>
          <img 
            src="/images/glowCircle.png" 
            alt="GlowCircle test" 
            className="w-64 h-32 object-contain border"
            onError={(e) => console.error('GlowCircle failed:', e.target.src)}
            onLoad={() => console.log('GlowCircle loaded')}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Direct URL Test:</h2>
          <p>Try these URLs in your browser:</p>
          <ul className="list-disc list-inside">
            <li><a href="/images/background.png" target="_blank" className="text-blue-500 hover:underline">/images/background.png</a></li>
            <li><a href="/images/glowCircle.png" target="_blank" className="text-blue-500 hover:underline">/images/glowCircle.png</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
