"use client";

import { useState } from "react";

import type { Cartoon } from "@/types/cartoon";
import DetailModal from "./DetailModal";
import CartoonCard from "./CartoonCard";

interface GridProps {
  cartoons: Cartoon[];
}

export default function Grid({ cartoons }: GridProps) {
  const [selectedCartoon, setSelectedCartoon] = useState<Cartoon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (cartoon: Cartoon) => {
    setSelectedCartoon(cartoon);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cartoons.map((cartoon) => (
          <CartoonCard
            key={cartoon.id}
            cartoon={cartoon}
            onClick={() => handleCardClick(cartoon)}
          />
        ))}
      </div>

      <DetailModal
        cartoon={selectedCartoon}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
