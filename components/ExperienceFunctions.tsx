"use client";
import { useState } from "react";

/* Component */
import { MajesticonsClose } from "./ui/MajesticonsClose";

/* Models */
import { ExperienceFunction } from "@/core/models/ExperienceFunction";

interface ExperienceFunctionViewProps {
  functions: ExperienceFunction[];
}

export default function ExperienceFunctions({
  functions,
}: ExperienceFunctionViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const functionItems = functions;
  const handleClick = (open: boolean) => setIsOpen(open);

  return (
    <div>
      <button
        onClick={() => handleClick(true)}
        className="py-4 px-5 border border-primary text-primary rounded-3xl hover:bg-primary hover:text-background"
      >
        Functions
      </button>
      {isOpen && (
        <div
          className={`${
            isOpen ? "opacity-100" : "opacity-0"
          } fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/50 px-2 transition-opacity delay-500 duration-500`}
        >
          <div className="flex items-center justify-center h-full overflow-y-auto">
            <div className="bg-backgroundsecondary p-4 relative max-w-[450px] md:max-w-[500px]">
              <div className="text-right">
                <button onClick={() => handleClick(false)}>
                  <MajesticonsClose className="size-8" />
                </button>
              </div>
              <h4 className="text-center">Functions</h4>
              <div className="px-4 py-6">
                <ul className="list-disc">
                  {functions.map((item) => (
                    <li className="mb-3" key={item.id}>
                      {item.functionDetail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full text-center">
                <button
                  onClick={() => handleClick(false)}
                  className="py-4 px-8 border border-primary text-primary rounded-3xl hover:bg-primary hover:text-background mx-auto mb-3"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
