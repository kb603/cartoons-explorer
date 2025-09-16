"use client";

import ErrorHandler from "@/components/ErrorHandler";
import CartoonExplorer from "./CartoonExplorer";

export default function CartoonExplorerWithHandler() {
  return (
    <ErrorHandler>
      <CartoonExplorer />
    </ErrorHandler>
  );
}
