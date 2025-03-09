// app/pages/calculator.tsx

import React from 'react';
import { useRecipes } from '@/lib/context/RecipeContext';
import { RecipeList } from '@/components/recipe/RecipeList';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { ResultsDisplay } from '@/components/calculator/ResultsDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CalculatorPage() {
  const { selectedRecipe, scaledRecipe, userPreferences, updateUserPreferences } = useRecipes();
  
  const handleFontSizeChange = (value: 'normal' | 'large' | 'extra-large') => {
    updateUserPreferences({ fontSize: value });
  };
  
  const handleContrastChange = (checked: boolean) => {
    updateUserPreferences({ highContrast: checked });
  };
  
  // Apply font size class based on user preferences
  const getFontSizeClass = () => {
    switch (userPreferences.fontSize) {
      case 'large':
        return 'text-lg';
      case 'extra-large':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };
  
  // Apply high contrast class based on user preferences
  const getContrastClass = () => {
    return userPreferences.highContrast ? 'contrast-high' : '';
  };
  
  return (
    <div className={`container mx-auto px-4 py-8 ${getFontSizeClass()} ${getContrastClass()}`}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pastry recipe calculator</h1>
        <p className="text-gray-600 mb-6">
          Scale your favorite recipes to any serving size or pan dimension
        </p>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Accessibility settings</CardTitle>
            <CardDescription>
              Customize the display to make it easier to read
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <Label htmlFor="font-size" className="text-base">Font size</Label>
              <Select 
                value={userPreferences.fontSize} 
                onValueChange={(value: 'normal' | 'large' | 'extra-large') => 
                  handleFontSizeChange(value)
                }
              >
                <SelectTrigger id="font-size" className="w-40">
                  <SelectValue placeholder="Font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="extra-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="high-contrast" 
                checked={userPreferences.highContrast}
                onCheckedChange={handleContrastChange}
              />
              <Label htmlFor="high-contrast" className="text-base">High contrast mode</Label>
            </div>
          </CardContent>
        </Card>
      </header>
      
      <main>
        <Tabs defaultValue="select" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="select">Select Recipe</TabsTrigger>
            <TabsTrigger value="calculate" disabled={!selectedRecipe}>
              Scale Recipe
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="select">
            <RecipeList />
          </TabsContent>
          
          <TabsContent value="calculate">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-1">
                <CalculatorForm />
              </div>
              
              <div className="md:col-span-1 lg:col-span-2">
                {scaledRecipe ? (
                  <ResultsDisplay />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Scaled recipe</CardTitle>
                      <CardDescription>
                        Fill out the calculator form to see your scaled recipe
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>
          This calculator is provided as a free service for our community.
          For more recipes and cooking tips, join our{' '}
          <a href="#" className="text-blue-600 underline">
            Premium Recipe Community
          </a>
        </p>
      </footer>
    </div>
  );
}