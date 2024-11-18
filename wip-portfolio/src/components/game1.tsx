'use client'

import React, { useRef, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, push, set } from 'firebase/database'
import { fbAPIKey, fbAppID, fbAuthDomain, fbMessagingSenderID, fbProjectID, fbStorageBucket } from '@/sanity/env'

// Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase project configuration
  apiKey: fbAPIKey,
  authDomain: fbAuthDomain,
//   databaseURL: "YOUR_DATABASE_URL",
  projectId: fbProjectID,
  storageBucket: fbStorageBucket,
  messagingSenderId: fbMessagingSenderID,
  appId: fbAppID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default function CollaborativeDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    // Set up Firebase listener
    const drawingsRef = ref(database, 'drawings')
    onValue(drawingsRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) return

      context.clearRect(0, 0, canvas.width, canvas.height)
      Object.values(data).forEach((drawing: any) => {
        context.strokeStyle = drawing.color
        context.beginPath()
        context.moveTo(drawing.startX, drawing.startY)
        context.lineTo(drawing.endX, drawing.endY)
        context.stroke()
      })
    })
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    context.strokeStyle = color
    context.lineWidth = 2
    context.lineCap = 'round'

    context.lineTo(x, y)
    context.stroke()
    context.beginPath()
    context.moveTo(x, y)

    // Save drawing data to Firebase
    const drawingsRef = ref(database, 'drawings')
    const newDrawingRef = push(drawingsRef)
    set(newDrawingRef, {
      startX: x,
      startY: y,
      endX: x,
      endY: y,
      color: color
    })
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Collaborative Drawing</h1>
      <div className="flex items-center space-x-4">
        <label htmlFor="color-picker" className="font-medium">
          Color:
        </label>
        <input
          id="color-picker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 border border-gray-300 rounded"
        />
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
        className="border border-gray-300 rounded"
      />
    </div>
  )
}