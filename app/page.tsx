import GameContainer from "@/components/game-container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-100">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">BJJ Snake Game</h1>
        <p className="text-gray-700 text-center mb-8">
          Progress from White to Black Belt. Eat food and get special items to
          level up your belt!
        </p>

        <GameContainer />

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p className="mt-1">© 2025 Post Black Belt</p>
        </footer>
      </div>
    </main>
  );
}
