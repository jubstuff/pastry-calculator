// app/lib/context/RecipeContext.tsx
"use client"; 

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'pinch' | 'piece';
  notes?: string;
  scalingFactor?: number; // For ingredients that don't scale linearly
  minimumQuantity?: number; // For ingredients with minimum viable quantities
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  servings: number;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  equipment: string[];
  ingredients: Ingredient[];
  instructions: string[];
  notes: string[];
  categories: string[];
  imageUrl?: string;
}

export interface ScaledRecipe extends Recipe {
  originalServings: number;
  scalingFactor: number;
}

interface RecipeContextType {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  scalingFactor: number;
  scaledRecipe: ScaledRecipe | null;
  recentCalculations: ScaledRecipe[];
  userPreferences: {
    fontSize: 'normal' | 'large' | 'extra-large';
    highContrast: boolean;
  };
  setSelectedRecipe: (recipe: Recipe | null) => void;
  setScalingFactor: (factor: number) => void;
  scaleRecipe: (recipe: Recipe, factor: number) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

interface UserPreferences {
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
  initialRecipes: Recipe[];
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ 
  children, 
  initialRecipes 
}) => {
  const [recipes] = useState<Recipe[]>(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [scalingFactor, setScalingFactor] = useState<number>(1);
  const [scaledRecipe, setScaledRecipe] = useState<ScaledRecipe | null>(null);
  const [recentCalculations, setRecentCalculations] = useState<ScaledRecipe[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    fontSize: 'normal',
    highContrast: false,
  });

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...preferences }));
    
    // Save preferences to localStorage
    localStorage.setItem('userPreferences', JSON.stringify({
      ...userPreferences,
      ...preferences
    }));
  };

  // Load user preferences from localStorage on initial load
  React.useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setUserPreferences(parsedPreferences);
      } catch (error) {
        console.error('Failed to parse user preferences:', error);
      }
    }
  }, []);

  const scaleRecipe = (recipe: Recipe, factor: number) => {
    if (!recipe) return;

    const scaled: ScaledRecipe = {
      ...recipe,
      originalServings: recipe.servings,
      servings: Math.round(recipe.servings * factor),
      scalingFactor: factor,
      ingredients: recipe.ingredients.map(ingredient => ({
        ...ingredient,
        quantity: calculateScaledQuantity(ingredient, factor),
      })),
      // Estimate adjusted cooking times (with a note that these are estimations)
      prepTime: recipe.prepTime,
      cookTime: Math.round(estimateCookingTime(recipe.cookTime, factor)),
      totalTime: recipe.prepTime + Math.round(estimateCookingTime(recipe.cookTime, factor)),
    };

    setScaledRecipe(scaled);
    
    // Add to recent calculations (keep only the last 5)
    setRecentCalculations(prev => {
      const updated = [scaled, ...prev.filter(r => r.id !== recipe.id)].slice(0, 5);
      
      // Save to localStorage
      localStorage.setItem('recentCalculations', JSON.stringify(updated));
      
      return updated;
    });
  };

  // Load recent calculations from localStorage on initial load
  React.useEffect(() => {
    const savedCalculations = localStorage.getItem('recentCalculations');
    if (savedCalculations) {
      try {
        const parsedCalculations = JSON.parse(savedCalculations);
        setRecentCalculations(parsedCalculations);
      } catch (error) {
        console.error('Failed to parse recent calculations:', error);
      }
    }
  }, []);

  // Helper function to calculate scaled quantities
  const calculateScaledQuantity = (ingredient: Ingredient, factor: number): number => {
    // Handle ingredients that don't scale linearly
    if (ingredient.scalingFactor) {
      factor = Math.pow(factor, ingredient.scalingFactor);
    }
    
    let scaledQuantity = ingredient.quantity * factor;
    
    // Handle minimum viable quantities
    if (ingredient.minimumQuantity && scaledQuantity < ingredient.minimumQuantity) {
      scaledQuantity = ingredient.minimumQuantity;
    }
    
    // Round to 2 decimal places for readability
    return Math.round(scaledQuantity * 100) / 100;
  };

  // Helper function to estimate cooking time
  const estimateCookingTime = (originalTime: number, factor: number): number => {
    // Cooking time usually doesn't scale linearly with quantity
    // Using a square root relationship as a reasonable approximation
    return originalTime * Math.sqrt(factor);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        selectedRecipe,
        scalingFactor,
        scaledRecipe,
        recentCalculations,
        userPreferences,
        setSelectedRecipe,
        setScalingFactor,
        scaleRecipe,
        updateUserPreferences,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};