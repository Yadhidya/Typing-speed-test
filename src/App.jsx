import { useState, useEffect } from "react"
import passages from "./data/data.json"

function App() {

  const [difficulty, setDifficulty] = useState("hard")
  const [typed, setTyped] = useState("")
  const [passage, setPassage] = useState("")

  useEffect(() => {
    loadPassage()
  }, [difficulty])

  const loadPassage = () => {
    const list = passages[difficulty]
    const random = Math.floor(Math.random() * list.length)
    setPassage(list[random].text)
    setTyped("")
  }

  const characters = passage.split("")

  const handleTyping = (e) => {
    setTyped(e.target.value)
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex justify-center">

      <div className="max-w-5xl w-full px-6 py-10">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">

          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              ⌨️ Typing Speed Test
            </h1>
            <p className="text-sm text-neutral-400">
              Type as fast as you can in 60 seconds
            </p>
          </div>

          <div className="text-sm text-yellow-400">
            🏆 Personal best: 0 WPM
          </div>

        </div>

        {/* Stats */}
        <div className="flex gap-6 text-lg mb-4">

          <span>
            WPM: <span className="font-semibold">0</span>
          </span>

          <span>
            Accuracy: <span className="text-red-400">0%</span>
          </span>

          <span>
            Time: <span className="text-yellow-300">0:00</span>
          </span>

        </div>

        <hr className="border-neutral-700 mb-6"/>

        {/* Controls */}
        <div className="flex justify-between mb-6 text-sm">

          {/* Difficulty */}
          <div className="flex items-center gap-2">

            <span className="text-neutral-400">Difficulty:</span>

            {["easy","medium","hard"].map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-3 py-1 rounded border 
                ${difficulty === level
                  ? "border-blue-500 text-blue-400"
                  : "border-neutral-700 text-neutral-400"}
                `}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}

          </div>

          {/* Mode */}
          <div className="flex items-center gap-2">

            <span className="text-neutral-400">Mode:</span>

            <button className="px-3 py-1 rounded border border-blue-500 text-blue-400">
              Timed (60s)
            </button>

            <button className="px-3 py-1 rounded border border-neutral-700 text-neutral-400">
              Passage
            </button>

          </div>

        </div>

        {/* Typing Area */}
        <div className="bg-neutral-900 text-xl leading-relaxed">

          {characters.map((char, index) => {

            let style = "text-neutral-500"

            if (index < typed.length) {
              style =
                typed[index] === char
                  ? "text-green-400"
                  : "text-red-400 underline"
            }

            return (
              <span key={index} className={style}>
                {char}
              </span>
            )
          })}

        </div>

        {/* Hidden Input */}
        <textarea
          value={typed}
          onChange={handleTyping}
          className="opacity-0 absolute"
          autoFocus
        />

        {/* Restart */}
        <div className="flex justify-center mt-10">

          <button
            onClick={loadPassage}
            className="bg-neutral-700 hover:bg-neutral-600 px-5 py-2 rounded flex items-center gap-2"
          >
            Restart Test ↻
          </button>

        </div>

      </div>

    </div>
  )
}

export default App