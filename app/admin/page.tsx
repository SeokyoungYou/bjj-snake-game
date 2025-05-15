"use client";
import { Button } from "@/components/ui/button";
import { gameSounds } from "@/lib/sounds";
import React, { useEffect } from "react";

export default function page() {
  return (
    <div className="p-10 flex flex-col justify-center items-center w-full">
      <section className="bg-indigo-50 p-4 flex flex-col gap-6">
        <span>Play Sounds</span>
        <div className="flex flex-col gap-2">
          <span className="text-neutral-800 font-semibold">
            Background Music
          </span>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                gameSounds.init();
                gameSounds.stopBackgroundMusic();
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
      </section>
    </div>
  );
}
