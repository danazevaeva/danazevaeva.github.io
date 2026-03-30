import { useState } from 'react'
import { DeviceFrame, StatusBar } from '@aton/components'

export function App() {
  const [screen, setScreen] = useState<'feed' | 'profile'>('feed')

  return (
    <DeviceFrame>
      <StatusBar />
      <div className="flex-1 flex items-center justify-center text-c2 text-sm">
        {screen === 'feed' ? (
          <div className="text-center">
            <p className="text-c1 font-bold text-lg mb-2">ATON Messenger</p>
            <p className="mb-4">Telegram-style channel feed</p>
            <button
              onClick={() => setScreen('profile')}
              className="text-c14 underline cursor-pointer"
            >
              Open profile →
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-c1 font-bold text-lg mb-2">Channel Profile</p>
            <p className="mb-4">ATON Investments</p>
            <button
              onClick={() => setScreen('feed')}
              className="text-c14 underline cursor-pointer"
            >
              ← Back to feed
            </button>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
