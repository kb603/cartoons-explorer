import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Cartoon } from "@/types/cartoon";

interface CartoonCardProps {
  cartoon: Cartoon;
  onClick: () => void;
}

export default function CartoonCard({ cartoon, onClick }: CartoonCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-card border-border">
      <CardContent className="p-0">
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-t-lg"
          onClick={onClick}
        >
          <Image
            src={cartoon.image || "/globe.svg"}
            alt={cartoon.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="sm"
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="text-white text-sm font-medium line-clamp-2">
              {cartoon.title}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-card-foreground line-clamp-1 text-balance">
              {cartoon.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {cartoon.year} • {cartoon.episodes} episodes
            </p>
          </div>

          {cartoon.rating && (
            <Badge variant="secondary" className="text-xs">
              {cartoon.rating}
            </Badge>
          )}

          <div className="flex flex-wrap gap-1">
            {cartoon.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
            {cartoon.genre.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{cartoon.genre.length - 2}
              </Badge>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            className="w-full mt-2 bg-transparent"
          >
            <Eye className="h-4 w-4 mr-2" />
            View More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
