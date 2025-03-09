// app/components/recipe/RecipeList.tsx
"use client"; 

import React, { useState } from 'react';
import { useRecipes, Recipe } from '@/lib/context/RecipeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClockIcon, UtensilsIcon, UsersIcon, SearchIcon } from 'lucide-react';

export const RecipeList: React.FC = () => {
  const { recipes, setSelectedRecipe } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get unique categories from all recipes
  const allCategories = Array.from(
    new Set(recipes.flatMap(recipe => recipe.categories))
  ).sort();
  
  // Filter recipes based on search term and active category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = searchTerm === '' || 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeCategory === null || 
      recipe.categories.includes(activeCategory);
      
    return matchesSearch && matchesCategory;
  });
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };
  
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} hr ${mins > 0 ? `${mins} min` : ''}`;
    }
    
    return `${mins} min`;
  };
  
  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    
    // Find the "Scale Recipe" tab trigger and click it
    const scaleTab = document.querySelector('[value="calculate"]') as HTMLElement;
    if (scaleTab) {
      scaleTab.click();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allCategories.map(category => (
          <Badge 
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      {filteredRecipes.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p>No recipes found. Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map(recipe => (
            <Card key={recipe.id} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <CardTitle>{recipe.name}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.categories.map(category => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                  <div className="flex flex-col items-center text-center">
                    <ClockIcon className="h-4 w-4 mb-1" />
                    <span className="text-gray-500">Prep</span>
                    <span>{formatTime(recipe.prepTime)}</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <UtensilsIcon className="h-4 w-4 mb-1" />
                    <span className="text-gray-500">Cook</span>
                    <span>{formatTime(recipe.cookTime)}</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <UsersIcon className="h-4 w-4 mb-1" />
                    <span className="text-gray-500">Serves</span>
                    <span>{recipe.servings}</span>
                  </div>
                </div>
                
                <div className="text-sm mb-2">
                  <span className="font-medium">Difficulty: </span>
                  <span className={
                    recipe.difficulty === 'easy' 
                      ? 'text-green-600' 
                      : recipe.difficulty === 'medium'
                        ? 'text-amber-600'
                        : 'text-red-600'
                  }>
                    {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  Select recipe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};