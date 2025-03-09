// app/lib/utils/conversions.ts

// Unit conversion factors (to base units)
const UNIT_CONVERSIONS = {
    // Weight
    g: 1, // base unit for weight
    kg: 1000,
    
    // Volume
    ml: 1, // base unit for volume
    l: 1000,
    tsp: 5,
    tbsp: 15,
    cup: 240,
    
    // Other
    pinch: 0.25, // approximate tsp equivalent
    piece: 1, // no conversion
  };
  
  // Common ingredient densities (g/ml) for weight-volume conversions
  const INGREDIENT_DENSITIES: Record<string, number> = {
    'flour': 0.55,
    'sugar': 0.85,
    'brown sugar': 0.8,
    'powdered sugar': 0.56,
    'butter': 0.96,
    'oil': 0.92,
    'milk': 1.03,
    'water': 1,
    'honey': 1.42,
    'maple syrup': 1.32,
    'salt': 1.25,
    'cocoa powder': 0.51,
    'baking powder': 0.9,
    'baking soda': 0.9,
    'rice': 0.85,
  };
  
  // Convert a quantity from one unit to another
  export function convertUnit(
    quantity: number,
    fromUnit: string,
    toUnit: string,
    ingredientName?: string
  ): number {
    // If the units are the same, return the original quantity
    if (fromUnit === toUnit) {
      return quantity;
    }
    
    // Check if the units are valid
    if (!(fromUnit in UNIT_CONVERSIONS) || !(toUnit in UNIT_CONVERSIONS)) {
      throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
    }
    
    // Handle direct unit conversions within the same type
    const isFromWeight = ['g', 'kg'].includes(fromUnit);
    const isToWeight = ['g', 'kg'].includes(toUnit);
    const isFromVolume = ['ml', 'l', 'tsp', 'tbsp', 'cup'].includes(fromUnit);
    const isToVolume = ['ml', 'l', 'tsp', 'tbsp', 'cup'].includes(toUnit);
    
    // Direct conversion within the same measurement system
    if ((isFromWeight && isToWeight) || (isFromVolume && isToVolume)) {
      const baseValue = quantity * UNIT_CONVERSIONS[fromUnit as keyof typeof UNIT_CONVERSIONS];
      return baseValue / UNIT_CONVERSIONS[toUnit as keyof typeof UNIT_CONVERSIONS];
    }
    
    // Weight to volume or volume to weight conversions need ingredient density
    if (!ingredientName) {
      throw new Error('Ingredient name required for weight-volume conversions');
    }
    
    // Find the matching ingredient density
    let density: number | undefined;
    
    // Look for exact match first
    if (ingredientName in INGREDIENT_DENSITIES) {
      density = INGREDIENT_DENSITIES[ingredientName];
    } else {
      // Look for partial matches
      const match = Object.keys(INGREDIENT_DENSITIES).find(
        (key) => ingredientName.toLowerCase().includes(key.toLowerCase())
      );
      
      if (match) {
        density = INGREDIENT_DENSITIES[match];
      } else {
        throw new Error(`No density information for ${ingredientName}`);
      }
    }
    
    // Convert based on the measurement systems
    if (isFromWeight && isToVolume) {
      // Weight to volume: divide by density
      const volumeInMl = (quantity * UNIT_CONVERSIONS[fromUnit as keyof typeof UNIT_CONVERSIONS]) / density;
      return volumeInMl / UNIT_CONVERSIONS[toUnit as keyof typeof UNIT_CONVERSIONS];
    } else if (isFromVolume && isToWeight) {
      // Volume to weight: multiply by density
      const weightInG = (quantity * UNIT_CONVERSIONS[fromUnit as keyof typeof UNIT_CONVERSIONS]) * density;
      return weightInG / UNIT_CONVERSIONS[toUnit as keyof typeof UNIT_CONVERSIONS];
    }
    
    // If we got here, it's an unsupported conversion
    throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
  }
  
  // Get the most appropriate unit for a given quantity
  export function optimizeUnit(quantity: number, unit: string): { quantity: number; unit: string } {
    if (!['g', 'kg', 'ml', 'l'].includes(unit)) {
      // Only optimize metric weight and volume units
      return { quantity, unit };
    }
    
    if (unit === 'g' && quantity >= 1000) {
      return { quantity: quantity / 1000, unit: 'kg' };
    }
    
    if (unit === 'kg' && quantity < 1) {
      return { quantity: quantity * 1000, unit: 'g' };
    }
    
    if (unit === 'ml' && quantity >= 1000) {
      return { quantity: quantity / 1000, unit: 'l' };
    }
    
    if (unit === 'l' && quantity < 1) {
      return { quantity: quantity * 1000, unit: 'ml' };
    }
    
    // If no optimization needed, return the original values
    return { quantity, unit };
  }
  
  // Format a quantity for display
  export function formatQuantity(quantity: number): string {
    // Handle integer values
    if (Number.isInteger(quantity)) {
      return quantity.toString();
    }
    
    // Handle fractions (for common cooking measurements)
    if (quantity === 0.25) return '¼';
    if (quantity === 0.5) return '½';
    if (quantity === 0.75) return '¾';
    if (quantity === 0.33 || Math.abs(quantity - 1/3) < 0.01) return '⅓';
    if (quantity === 0.67 || Math.abs(quantity - 2/3) < 0.01) return '⅔';
    if (quantity === 0.2 || Math.abs(quantity - 1/5) < 0.01) return '⅕';
    if (quantity === 0.4 || Math.abs(quantity - 2/5) < 0.01) return '⅖';
    if (quantity === 0.6 || Math.abs(quantity - 3/5) < 0.01) return '⅗';
    if (quantity === 0.8 || Math.abs(quantity - 4/5) < 0.01) return '⅘';
    
    // For other decimal values, round to 1 decimal place if needed
    return quantity.toFixed(1).replace(/\.0$/, '');
  }
  
  // Formatting functions for the display of units
  export function formatUnit(unit: string, quantity: number = 1): string {
    // Add pluralization where appropriate
    if (quantity !== 1) {
      switch (unit) {
        case 'piece':
          return 'pieces';
        case 'pinch':
          return 'pinches';
        case 'cup':
          return 'cups';
        case 'tsp':
          return 'tsp';
        case 'tbsp':
          return 'tbsp';
        default:
          return unit;
      }
    }
    
    return unit;
  }
  
  // Estimate cooking time based on scaling factor
  export function estimateCookingTime(originalTime: number, scalingFactor: number): number {
    // Cooking times don't scale linearly
    // Small items: scale by 1/4 power of the scaling factor
    // Medium items: scale by 1/3 power
    // Large items: scale by 1/2 power (square root)
    
    if (originalTime <= 20) {
      // Small items (cookies, cupcakes)
      return originalTime * Math.pow(scalingFactor, 0.25);
    } else if (originalTime <= 45) {
      // Medium items (cakes, pies)
      return originalTime * Math.pow(scalingFactor, 0.33);
    } else {
      // Large items (bread, roasts)
      return originalTime * Math.pow(scalingFactor, 0.5);
    }
  }
  
  // Helper for temperature adjustments
  export function adjustTemperature(
    originalTemp: number, 
    unit: 'C' | 'F', 
    panSizeRatio: number
  ): number {
    // Only make adjustments for significant size changes
    if (panSizeRatio > 1.5 || panSizeRatio < 0.67) {
      // For larger pans, increase temp slightly
      if (panSizeRatio > 1) {
        if (unit === 'C') {
          return originalTemp + Math.round(5 * Math.log2(panSizeRatio));
        } else {
          return originalTemp + Math.round(10 * Math.log2(panSizeRatio));
        }
      } 
      // For smaller pans, decrease temp slightly
      else {
        if (unit === 'C') {
          return originalTemp - Math.round(5 * Math.log2(1/panSizeRatio));
        } else {
          return originalTemp - Math.round(10 * Math.log2(1/panSizeRatio));
        }
      }
    }
    
    // For minor adjustments, keep temperature the same
    return originalTemp;
  }