"use client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableList<T extends { id?: number }>({
  items,
  onReorder,
  children
}: {
  items: T[];
  onReorder: (next: T[]) => void;
  children: (item: T) => React.ReactNode;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => String(i.id) === String(active.id));
    const newIndex = items.findIndex((i) => String(i.id) === String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.filter((i) => i.id != null).map((i) => String(i.id))} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">{items.map((item) => children(item))}</div>
      </SortableContext>
    </DndContext>
  );
}

export function SortableItem({ id, children }: { id: number | string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: String(id) });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return (
    <div ref={setNodeRef} style={style} className="relative">
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 bg-on-surface text-white px-2 py-1 font-label text-[10px] font-black uppercase cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        ⋮⋮ DRAG
      </button>
      {children}
    </div>
  );
}

export async function persistOrder(model: string, ids: number[]) {
  await fetch("/api/admin/reorder", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, ids })
  });
}
