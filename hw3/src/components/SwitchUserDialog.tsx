"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, validateHandle, validateUsername } from "@/lib/utils";

type SwitchUserDialogProps = {
    open: boolean;
    onClose: () => void;
}

export default function SwitchUserDialog({open, onClose}:SwitchUserDialogProps){

    const handleSwitchUser = () => {
        onClose();
    }


  return (
    <Dialog open={open} onOpenChange={handleSwitchUser}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Switch User</DialogTitle>
          <DialogDescription>
            Click on the user you want to switch to.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button onClick={handleSwitchUser}>finished</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
