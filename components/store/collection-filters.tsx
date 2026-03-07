"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORIES, Category } from "@/lib/types";

interface CollectionFiltersProps {
  selectedCategories: Category[];
  priceRange: [number, number];
  sortBy: "newest" | "price-asc" | "price-desc";
  onToggleCategory: (category: Category) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: "newest" | "price-asc" | "price-desc") => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function CollectionFilters({
  selectedCategories,
  priceRange,
  sortBy,
  onToggleCategory,
  onPriceRangeChange,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
}: CollectionFiltersProps) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Categories
        </h3>
        <div className="mt-4 space-y-3">
          {CATEGORIES.map((category) => (
            <label
              key={category.value}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={() => onToggleCategory(category.value)}
              />
              <span className="text-sm text-foreground">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Price Range
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              onPriceRangeChange([Number(e.target.value), priceRange[1]])
            }
            className="h-10 w-20 rounded-full border border-border bg-muted/30 px-4 text-center text-sm focus:border-foreground focus:outline-none"
            placeholder="Min"
          />
          <span className="text-xs text-muted-foreground">to</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], Number(e.target.value)])
            }
            className="h-10 w-20 rounded-full border border-border bg-muted/30 px-4 text-center text-sm focus:border-foreground focus:outline-none"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Sort By
        </h3>
        <div className="mt-4 space-y-2">
          {[
            { value: "newest" as const, label: "Newest" },
            { value: "price-asc" as const, label: "Price: Low to High" },
            { value: "price-desc" as const, label: "Price: High to Low" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={() => onSortChange(option.value)}
                className="h-4 w-4 accent-black dark:accent-white"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full cursor-pointer rounded-full text-xs font-bold uppercase tracking-widest"
          onClick={onClearFilters}
        >
          <X className="mr-2 h-3 w-3" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
