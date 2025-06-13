"use client";

// 1. Imports
// React and hooks
import type React from "react";
import { useState } from "react";

// UI Components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons (grouped for clarity)
import {
  RefreshCw,
  Gamepad2,
  Smile,
  ClubIcon as Football, // Renamed for clarity within the component
  Cat,
} from "lucide-react";

// Custom Components (grouped)
import ThemeSelector from "@/components/theme-selector";
// import ImageUploader from "@/components/image-uploader"; // Keep commented if not in use
import ActionButtons from "@/components/action-buttons";
import ProblemDisplay from "@/components/problem-display";
import Header from "@/components/header";

// 2. Type Definitions
// Define types relevant to the component
type Theme = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

// 3. Main Component Definition
export default function MathProblemPersonalizer() {
  // 4. State Management
  // Group related state variables together
  const [originalProblem, setOriginalProblem] = useState<string>("");
  const [rewrittenProblem, setRewrittenProblem] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("football");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 5. Constants and Configuration Data
  // Data that doesn't change based on user interaction
  const themes: Theme[] = [
    { id: "cartoon", name: "Cartoon", icon: <Smile className="h-5 w-5" /> },
    {
      id: "football",
      name: "Football",
      icon: <Football className="h-5 w-5" />,
    },
    { id: "games", name: "Games", icon: <Gamepad2 className="h-5 w-5" /> },
    { id: "animals", name: "Animals", icon: <Cat className="h-5 w-5" /> },
  ];

  // Example rewritten problems for simulation
  const exampleRewrittenProblems = {
    football:
      "Coach Adam is setting up for the big football tournament at school. He has 6 large storage racks in the equipment room. On each rack, he carefully places 12 shiny footballs so that each team has enough to practice. How many footballs does Coach Adam place on the racks in total?",
    games:
      "In Minecraft, Steve is building 6 bookshelves for his enchantment room. Each bookshelf requires 12 books to craft. How many books will Steve need to collect in total?",
    animals:
      "A wildlife sanctuary has 6 large habitats. Each habitat houses 12 rescued animals. How many animals are being cared for at the sanctuary in total?",
    cartoon:
      "SpongeBob is organizing his jellyfish collection. He has 6 special tanks and puts 12 jellyfish in each tank. How many jellyfish does SpongeBob have in his collection?",
  };

  // 6. Event Handlers and Functions
  // Functions that handle user interactions or component logic
  const handleImageUpload = (text: string) => {
    setOriginalProblem(text);
  };

  const handleRewrite = () => {
    if (!originalProblem) return;

    setIsLoading(true);

    // Simulate API call to rewrite the problem
    setTimeout(() => {
      setRewrittenProblem(
        exampleRewrittenProblems[
          selectedTheme as keyof typeof exampleRewrittenProblems
        ]
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleTextToSpeech = () => {
    if (!rewrittenProblem) return;

    // Use the Web Speech API for text-to-speech
    const speech = new SpeechSynthesisUtterance(rewrittenProblem);
    speech.rate = 0.9;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  };

  const handleSave = () => {
    if (!rewrittenProblem) return;

    // Create a text file and trigger download
    const blob = new Blob([rewrittenProblem], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `math-problem-${selectedTheme}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 7. Render Logic (JSX)
  // The structure of the component's output
  return (
    <div className="space-y-6 py-4">
      <Header />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-2">Original Problem</h2>
            <div className="min-h-24 p-4 bg-amber-50 rounded-md">
              {originalProblem || (
                <p className="text-gray-400 italic">
                  Upload or take a photo of a math problem to get started
                </p>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <ThemeSelector
            // Don't forget to add the props back if needed
              // themes={themes} // Uncommented and passed props
              // selectedTheme={selectedTheme} // Uncommented and passed props
              // onSelectTheme={setSelectedTheme} // Uncommented and passed props
            />

            <Button
              onClick={handleRewrite}
              disabled={!originalProblem || isLoading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white text-lg py-6"
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Rewrite!"
              )}
            </Button>
          </div>
        </div>

        {/* ProblemDisplay and ActionButtons are now grouped and ProblemDisplay comes first */}
        <div className="space-y-6">
          {" "}
          {/* Added a div to group them and apply spacing */}
          <ProblemDisplay
            rewrittenProblem={rewrittenProblem}
            onListen={handleTextToSpeech}
            onRephrase={handleRewrite}
            onSave={handleSave}
          />
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}
