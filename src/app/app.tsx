"use client";

import { PROJECT_TITLE } from "~/lib/constants";
import GoonieGame from "~/components/GoonieGame";

export default function App() {
  return (
    <div className="w-[400px] mx-auto py-8 px-4 min-h-screen flex flex-col items-center justify-center">
      {/* TEMPLATE_CONTENT_START - Replace content below */}
      <GoonieGame />
      {/* TEMPLATE_CONTENT_END */}
    </div>
  );
}
