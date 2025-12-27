"use client";

import { use } from "react";
import Blocks from "@/blocks";
import type { ContentfulBlock } from "@/types/contentful";

interface PortfolioBlocksProps {
  blocksPromise: Promise<{ items: ContentfulBlock[] } | undefined>;
}

export default function PortfolioBlocks({ blocksPromise }: PortfolioBlocksProps) {
  const blocksCollection = use(blocksPromise);

  if (!blocksCollection) return null;

  return <Blocks blocksCollection={blocksCollection} />;
}
