"use client";
import GameControls from "@/components/controls/game-controls";
import { Button } from "@/components/ui/button";
import { gameSounds } from "@/lib/sounds";
import React from "react";

export default function page() {
  return (
    <div className="p-10 flex flex-col justify-center items-center w-full">
      <section className="bg-indigo-50 p-4 flex flex-col gap-6">
        <span>Sounds</span>
        <div className="flex flex-col gap-2">
          <span className="text-neutral-800 font-semibold">
            Background Music
          </span>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                await gameSounds.init();
                gameSounds.createBackgroundMusic();
              }}
            >
              Play
            </Button>
            <Button
              onClick={() => gameSounds.stopBackgroundMusic()}
              variant="destructive"
            >
              Stop
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-neutral-800 font-semibold">Play Effects</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={async () => {
                gameSounds.eat();
              }}
            >
              Eat
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                gameSounds.gameOver();
              }}
            >
              Game Over
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                gameSounds.specialItem();
              }}
            >
              Special Item
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                gameSounds.promotion();
              }}
            >
              Promotion
            </Button>
          </div>
        </div>
      </section>
      <GameControls />
    </div>
  );
}
