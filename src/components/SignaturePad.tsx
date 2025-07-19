import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { RotateCcw, Check } from 'lucide-react';

interface SignaturePadProps {
  value?: string;
  onChange?: (signature: string) => void;
  width?: number;
  height?: number;
  disabled?: boolean;
  className?: string;
}

export function SignaturePad({ 
  value, 
  onChange, 
  width = 400, 
  height = 200, 
  disabled = false,
  className = '' 
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Set drawing style
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Load existing signature if provided
    if (value && value.startsWith('data:image')) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        setIsEmpty(false);
      };
      img.src = value;
    }
  }, [width, height, value]);

  const getEventPos = (event: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in event) {
      const touch = event.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    
    event.preventDefault();
    const pos = getEventPos(event);
    setIsDrawing(true);
    setLastPos(pos);
    setIsEmpty(false);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;
    
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const currentPos = getEventPos(event);

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    setLastPos(currentPos);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveSignature();
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    onChange?.(dataURL);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    setIsEmpty(true);
    onChange?.('');
  };

  return (
    <div className={`signature-pad ${className}`}>
      <div className="border-2 border-default-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="block cursor-crosshair touch-none"
          style={{ width: '100%', height: 'auto', maxWidth: `${width}px` }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="text-xs text-default-500">
          {isEmpty ? 'Sign above' : 'Signature captured'}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="warning"
            startContent={<RotateCcw size={16} />}
            onPress={clearSignature}
            isDisabled={disabled || isEmpty}
          >
            Clear
          </Button>
          {!isEmpty && (
            <Button
              size="sm"
              color="success"
              variant="flat"
              startContent={<Check size={16} />}
              onPress={saveSignature}
              isDisabled={disabled}
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
