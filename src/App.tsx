import React from 'react';
import { CanvasBackground } from './components/CanvasBackground';

export default function App() {
  return (
    <div className="relative min-h-[600vh] bg-[#030305] text-white">
      {/* 3D Video Frame Canvas Scroll Background */}
      <CanvasBackground />
    </div>
  );
}

