"use client"

import React, { useEffect, useState } from 'react';
import { RecipeProvider } from '@/lib/context/RecipeContext';
import { sampleRecipes } from '@/lib/data/sampleRecipes';
import { useRecipes } from '@/lib/context/RecipeContext';
import { RecipeList } from '@/components/recipe/RecipeList';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { ResultsDisplay } from '@/components/calculator/ResultsDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Apply global high contrast styles if needed
const highContrastStyles = `
  .contrast-high {
    filter: contrast(1.2);
  }
  
  .contrast-high button {
    border-width: 2px;
  }
  
  .contrast-high a, 
  .contrast-high button {
    text-decoration: underline;
  }
`;

function CalculatorContent() {
  const { selectedRecipe, scaledRecipe, userPreferences, updateUserPreferences } = useRecipes();
  const [activeStep, setActiveStep] = useState<string>("step1");
  
  // Update active step when recipe state changes
  useEffect(() => {
    if (scaledRecipe) {
      setActiveStep("step3");
    } else if (selectedRecipe) {
      setActiveStep("step2");
    } else {
      setActiveStep("step1");
    }
  }, [selectedRecipe, scaledRecipe]);
  
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
        <p className="text-gray-600 mb-4">
          Scale your favorite recipes to any serving size or pan dimension
        </p>
        
        <Card className="mb-6 border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Accessibility settings</CardTitle>
            <CardDescription>
              Customize the display to make it easier to read
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6 pt-2">
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
      
      <main className="max-w-4xl mx-auto">
        <Accordion 
          type="single" 
          collapsible 
          value={activeStep}
          onValueChange={setActiveStep}
          defaultValue="step1"
          className="w-full space-y-4"
        >
          {/* Step 1: Select Recipe */}
          <AccordionItem value="step1" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <AccordionTrigger className="px-6 py-4 bg-white hover:bg-gray-50">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-3 shadow-sm">1</span>
                <div className="text-left">
                  <h3 className="text-lg font-medium">Select Recipe</h3>
                  <p className="text-sm text-muted-foreground">Choose a recipe to scale</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <RecipeList />
            </AccordionContent>
          </AccordionItem>

          {/* Step 2: Scale Recipe */}
          <AccordionItem value="step2" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm" disabled={!selectedRecipe}>
            <AccordionTrigger className="px-6 py-4 bg-white hover:bg-gray-50">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-3 shadow-sm">2</span>
                <div className="text-left">
                  <h3 className="text-lg font-medium">Scale Recipe</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRecipe 
                      ? `Adjust scaling for "${selectedRecipe.name}"`
                      : "Select a recipe first"}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              {selectedRecipe ? (
                <CalculatorForm />
              ) : (
                <p className="text-muted-foreground py-4">Please select a recipe first</p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Step 3: View Scaled Recipe */}
          <AccordionItem value="step3" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm" disabled={!scaledRecipe}>
            <AccordionTrigger className="px-6 py-4 bg-white hover:bg-gray-50">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-3 shadow-sm">3</span>
                <div className="text-left">
                  <h3 className="text-lg font-medium">Scaled Recipe</h3>
                  <p className="text-sm text-muted-foreground">
                    {scaledRecipe 
                      ? `"${scaledRecipe.name}" scaled to ${scaledRecipe.servings} servings`
                      : "Complete steps 1 and 2 first"}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              {scaledRecipe ? (
                <ResultsDisplay />
              ) : (
                <p className="text-muted-foreground py-4">Please select a recipe and set scaling options first</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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

export default function Home() {
  return (
    <>
      <style jsx global>{highContrastStyles}</style>
      <RecipeProvider initialRecipes={sampleRecipes}>
        <CalculatorContent />
      </RecipeProvider>
    </>
  );
}
