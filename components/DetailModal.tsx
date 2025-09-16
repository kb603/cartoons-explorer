"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Calendar, Clock, Users, Star } from "lucide-react";
import type { Cartoon } from "@/types/cartoon";

interface CartoonDetailModalProps {
  cartoon: Cartoon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DetailModal({
  cartoon,
  open,
  onOpenChange,
}: CartoonDetailModalProps) {
  if (!cartoon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-balance">
            {cartoon.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <Image
                src={cartoon.image || "/placeholder.svg"}
                alt={cartoon.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {cartoon.wikiUrl && (
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <a
                  href={cartoon.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Wikipedia
                </a>
              </Button>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{cartoon.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{cartoon.runtime_in_minutes} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{cartoon.episodes} episodes</span>
                </div>
              </div>

              {cartoon.rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="text-sm">
                    {cartoon.rating}
                  </Badge>
                </div>
              )}
            </div>

            <Separator />

            {/* Creators */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                Creator{cartoon.creator.length > 1 ? "s" : ""}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cartoon.creator.map((creator, index) => (
                  <Badge key={index} variant="outline">
                    {creator}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Genres */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                Genre{cartoon.genre.length > 1 ? "s" : ""}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cartoon.genre.map((genre, index) => (
                  <Badge key={index} variant="default">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Additional Info */}
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-foreground">Year:</span>
                  <p className="text-muted-foreground">{cartoon.year}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Episodes:</span>
                  <p className="text-muted-foreground">{cartoon.episodes}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Runtime:</span>
                  <p className="text-muted-foreground">
                    {cartoon.runtime_in_minutes} minutes
                  </p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Rating:</span>
                  <p className="text-muted-foreground">
                    {cartoon.rating || "Not rated"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
