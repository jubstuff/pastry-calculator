// app/components/calculator/CalculatorForm.tsx
"use client"; 

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecipes } from '@/lib/context/RecipeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const scalingSchema = z.object({
  scalingMethod: z.enum(['servings', 'panSize', 'custom']),
  servings: z.number().positive().optional(),
  originalPanWidth: z.number().positive().optional(),
  originalPanLength: z.number().positive().optional(),
  originalPanDiameter: z.number().positive().optional(),
  newPanWidth: z.number().positive().optional(),
  newPanLength: z.number().positive().optional(),
  newPanDiameter: z.number().positive().optional(),
  customFactor: z.number().positive().optional(),
  panShape: z.enum(['rectangle', 'round']).optional(),
});

type ScalingFormData = z.infer<typeof scalingSchema>;

export const CalculatorForm: React.FC = () => {
  const { selectedRecipe, scaleRecipe } = useRecipes();
  const [panShape, setPanShape] = useState<'rectangle' | 'round'>('rectangle');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ScalingFormData>({
    resolver: zodResolver(scalingSchema),
    defaultValues: {
      scalingMethod: 'servings',
      servings: selectedRecipe?.servings ? selectedRecipe.servings * 2 : undefined,
      customFactor: 1,
      panShape: 'rectangle',
    },
  });

  const scalingMethod = watch('scalingMethod');

  if (!selectedRecipe) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recipe calculator</CardTitle>
          <CardDescription>Please select a recipe first</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const onSubmit = (data: ScalingFormData) => {
    let scalingFactor = 1;

    switch (data.scalingMethod) {
      case 'servings':
        if (data.servings) {
          scalingFactor = data.servings / selectedRecipe.servings;
        }
        break;
      case 'panSize':
        if (data.panShape === 'rectangle' && 
            data.originalPanWidth && 
            data.originalPanLength && 
            data.newPanWidth && 
            data.newPanLength) {
          // Calculate area ratio for rectangular pans
          const originalArea = data.originalPanWidth * data.originalPanLength;
          const newArea = data.newPanWidth * data.newPanLength;
          scalingFactor = newArea / originalArea;
        } else if (data.panShape === 'round' && 
                  data.originalPanDiameter && 
                  data.newPanDiameter) {
          // Calculate area ratio for round pans
          const originalArea = Math.PI * Math.pow(data.originalPanDiameter / 2, 2);
          const newArea = Math.PI * Math.pow(data.newPanDiameter / 2, 2);
          scalingFactor = newArea / originalArea;
        }
        break;
      case 'custom':
        if (data.customFactor) {
          scalingFactor = data.customFactor;
        }
        break;
    }

    scaleRecipe(selectedRecipe, scalingFactor);
  };

  const handlePanShapeChange = (value: 'rectangle' | 'round') => {
    setPanShape(value);
    setValue('panShape', value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Scale recipe: {selectedRecipe.name}</CardTitle>
        <CardDescription>
          Original recipe makes {selectedRecipe.servings} servings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="scaling-method" className="text-lg font-medium">
                How would you like to scale this recipe?
              </Label>
              <RadioGroup 
                defaultValue="servings" 
                className="mt-3"
                {...register('scalingMethod')}
                onValueChange={(value: 'servings' | 'panSize' | 'custom') => 
                  setValue('scalingMethod', value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="servings" id="servings" />
                  <Label htmlFor="servings" className="text-base">By number of servings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="panSize" id="panSize" />
                  <Label htmlFor="panSize" className="text-base">By pan size</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="text-base">By custom factor</Label>
                </div>
              </RadioGroup>
            </div>

            {scalingMethod === 'servings' && (
              <div className="space-y-2">
                <Label htmlFor="servings" className="text-base">
                  How many servings do you want to make?
                </Label>
                <Input
                  id="servings"
                  type="number"
                  defaultValue={selectedRecipe.servings * 2}
                  min={1}
                  className="max-w-xs text-lg"
                  {...register('servings', { valueAsNumber: true })}
                />
                {errors.servings && (
                  <p className="text-red-500">Please enter a valid number of servings</p>
                )}
              </div>
            )}

            {scalingMethod === 'panSize' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base mb-2 block">Pan shape</Label>
                  <RadioGroup 
                    defaultValue="rectangle" 
                    value={panShape}
                    onValueChange={(value: 'rectangle' | 'round') => 
                      handlePanShapeChange(value)
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rectangle" id="rectangle" />
                      <Label htmlFor="rectangle">Rectangular</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="round" id="round" />
                      <Label htmlFor="round">Round</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {panShape === 'rectangle' ? (
                  <>
                    <div className="space-y-2">
                      <Label className="text-base">Original pan dimensions (cm)</Label>
                      <div className="flex space-x-2 max-w-xs">
                        <div>
                          <Label htmlFor="originalPanWidth" className="sr-only">Width</Label>
                          <Input
                            id="originalPanWidth"
                            type="number"
                            placeholder="Width"
                            min={1}
                            className="text-lg"
                            {...register('originalPanWidth', { valueAsNumber: true })}
                          />
                        </div>
                        <span className="flex items-center">×</span>
                        <div>
                          <Label htmlFor="originalPanLength" className="sr-only">Length</Label>
                          <Input
                            id="originalPanLength"
                            type="number"
                            placeholder="Length"
                            min={1}
                            className="text-lg"
                            {...register('originalPanLength', { valueAsNumber: true })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base">New pan dimensions (cm)</Label>
                      <div className="flex space-x-2 max-w-xs">
                        <div>
                          <Label htmlFor="newPanWidth" className="sr-only">Width</Label>
                          <Input
                            id="newPanWidth"
                            type="number"
                            placeholder="Width"
                            min={1}
                            className="text-lg"
                            {...register('newPanWidth', { valueAsNumber: true })}
                          />
                        </div>
                        <span className="flex items-center">×</span>
                        <div>
                          <Label htmlFor="newPanLength" className="sr-only">Length</Label>
                          <Input
                            id="newPanLength"
                            type="number"
                            placeholder="Length"
                            min={1}
                            className="text-lg"
                            {...register('newPanLength', { valueAsNumber: true })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="originalPanDiameter" className="text-base">
                        Original pan diameter (cm)
                      </Label>
                      <Input
                        id="originalPanDiameter"
                        type="number"
                        min={1}
                        className="max-w-xs text-lg"
                        {...register('originalPanDiameter', { valueAsNumber: true })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPanDiameter" className="text-base">
                        New pan diameter (cm)
                      </Label>
                      <Input
                        id="newPanDiameter"
                        type="number"
                        min={1}
                        className="max-w-xs text-lg"
                        {...register('newPanDiameter', { valueAsNumber: true })}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {scalingMethod === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="customFactor" className="text-base">
                  Scaling factor (1 = no change, 2 = double, 0.5 = half)
                </Label>
                <Input
                  id="customFactor"
                  type="number"
                  defaultValue={1}
                  step={0.1}
                  min={0.1}
                  max={10}
                  className="max-w-xs text-lg"
                  {...register('customFactor', { valueAsNumber: true })}
                />
                {errors.customFactor && (
                  <p className="text-red-500">Please enter a valid scaling factor</p>
                )}
              </div>
            )}
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription>
              Cooking times will be estimated based on the scaling factor and may need adjustment.
              Always check for doneness using visual cues from the original recipe.
            </AlertDescription>
          </Alert>

          <Button type="submit" size="lg" className="w-full md:w-auto">
            Calculate recipe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};