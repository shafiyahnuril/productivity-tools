"use client";

import { motion, useAnimation, PanInfo } from "framer-motion";
import { Trash2, Edit } from "lucide-react";
import { ReactNode } from "react";

interface SwipeableItemProps {
  children: ReactNode;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function SwipeableItem({
  children,
  onDelete,
  onEdit,
}: SwipeableItemProps) {
  const controls = useAnimation();

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      await controls.start({ x: -140, transition: { duration: 0.2 } });
    } else {
      controls.start({
        x: 0,
        transition: { type: "spring", bounce: 0, duration: 0.4 },
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-y-0 right-0 flex items-center justify-end px-4 gap-2 bg-danger/10 w-full"
        style={{ zIndex: 0 }}
      >
        <button
          onClick={onEdit}
          className="w-10 h-10 rounded-full bg-paper-card flex flex-col items-center justify-center text-paper-fg2 active:scale-95"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="w-10 h-10 rounded-full bg-danger text-white flex flex-col items-center justify-center active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -140, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="relative z-10 w-full bg-paper-card"
        style={{ touchAction: "pan-y" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
