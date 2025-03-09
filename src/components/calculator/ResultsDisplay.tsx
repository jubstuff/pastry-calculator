// app/components/calculator/ResultsDisplay.tsx

import React from 'react';
import { useRecipes } from '@/lib/context/RecipeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Facebook, MessageCircleHeart, Share2Icon, PrinterIcon, MailIcon } from 'lucide-react';

export const ResultsDisplay: React.FC = () => {
  const { scaledRecipe } = useRecipes();
  const resultsRef = React.useRef<HTMLDivElement>(null);

  if (!scaledRecipe) {
    return null;
  }

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} hr ${mins > 0 ? `${mins} min` : ''}`;
    }
    
    return `${mins} min`;
  };

  const generatePDF = async () => {
    if (!resultsRef.current) return;
    
    const canvas = await html2canvas(resultsRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${scaledRecipe.name}_scaled.pdf`);
  };

  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: `Scaled Recipe: ${scaledRecipe.name}`,
        text: `Check out this scaled recipe for ${scaledRecipe.name}`,
        url: window.location.href,
      });
    }
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(`Scaled Recipe: ${scaledRecipe.name}`);
    const body = encodeURIComponent(
      `I wanted to share this scaled recipe for ${scaledRecipe.name}.\n\n` +
      `Original servings: ${scaledRecipe.originalServings}\n` +
      `Scaled servings: ${scaledRecipe.servings}\n\n` +
      `View the full recipe at: ${window.location.href}`
    );
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Scaled recipe</CardTitle>
          <CardDescription>
            Original: {scaledRecipe.originalServings} servings • 
            Scaled: {scaledRecipe.servings} servings •
            Factor: {scaledRecipe.scalingFactor.toFixed(2)}x
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={generatePDF}
            >
              <PrinterIcon size={16} />
              Print / PDF
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={shareRecipe}
            >
              <Share2Icon size={16} />
              Share
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={shareByEmail}
            >
              <MailIcon size={16} />
              Email
            </Button>
            
            {/* Social sharing buttons */}
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => 
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`,
                  '_blank'
                )
              }
            >
              <Facebook size={16} />
              Facebook
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => 
                window.open(
                  `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    window.location.href
                  )}&media=&description=${encodeURIComponent(
                    `Scaled Recipe: ${scaledRecipe.name}`
                  )}`,
                  '_blank'
                )
              }
            >
              <MessageCircleHeart size={16} />
              Pinterest
            </Button>
          </div>
          
          <div ref={resultsRef} className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
              <div>
                <h2 className="text-2xl font-bold">{scaledRecipe.name}</h2>
                <p className="text-gray-600">{scaledRecipe.description}</p>
              </div>
              
              {scaledRecipe.imageUrl && (
                <img 
                  src={scaledRecipe.imageUrl} 
                  alt={scaledRecipe.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Prep time</p>
                <p className="text-lg font-medium">{formatTime(scaledRecipe.prepTime)}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Cook time</p>
                <p className="text-lg font-medium">{formatTime(scaledRecipe.cookTime)}</p>
                <p className="text-xs text-amber-600">Estimated</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Servings</p>
                <p className="text-lg font-medium">{scaledRecipe.servings}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
              <ul className="space-y-2">
                {scaledRecipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex">
                    <span className="font-medium min-w-20">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <span>{ingredient.name}</span>
                    {ingredient.notes && (
                      <span className="text-gray-500 ml-2 text-sm">
                        ({ingredient.notes})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Instructions</h3>
              <ol className="space-y-2 list-decimal list-inside">
                {scaledRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="pl-2">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
            
            {scaledRecipe.notes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Notes</h3>
                <ul className="list-disc list-inside space-y-1">
                  {scaledRecipe.notes.map((note, index) => (
                    <li key={index} className="pl-2 text-gray-700">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Equipment</h3>
              <ul className="list-disc list-inside space-y-1">
                {scaledRecipe.equipment.map((item, index) => (
                  <li key={index} className="pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Alert className="mb-4 bg-yellow-50 border-yellow-200">
            <AlertDescription>
              This recipe has been scaled automatically. Cooking times may need adjustment.
              Always check for doneness using visual cues from the original recipe.
            </AlertDescription>
          </Alert>
          
          <div className="text-sm text-gray-500">
            <p>Original recipe: {scaledRecipe.originalServings} servings</p>
            <p>Scaled recipe: {scaledRecipe.servings} servings (scaling factor: {scaledRecipe.scalingFactor.toFixed(2)}x)</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};