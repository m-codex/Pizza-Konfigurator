// Unit conversion functions for the pizza configurator

// Weight conversions
export const gramsToOunces = (grams: number): number => {
  return parseFloat((grams * 0.035274).toFixed(2));
};

export const ouncesToGrams = (ounces: number): number => {
  return Math.round(ounces * 28.3495);
};

// Volume conversions
export const mlToFlOz = (ml: number): number => {
  return parseFloat((ml * 0.033814).toFixed(2));
};

export const flOzToMl = (flOz: number): number => {
  return Math.round(flOz * 29.5735);
};

// Temperature conversions
export const celsiusToFahrenheit = (celsius: string): string => {
  // Handle ranges like "250-275°C"
  if (celsius.includes("-")) {
    const [min, max] = celsius.split("-").map((part) => {
      const numPart = parseInt(part.replace(/[^0-9]/g, ""));
      return Math.round((numPart * 9) / 5 + 32);
    });
    return `${min}-${max}°F`;
  }

  // Handle "über 350°C"
  if (celsius.includes(">")) {
    const num = parseInt(celsius.replace(/[^0-9]/g, ""));
    const fahrenheit = Math.round((num * 9) / 5 + 32);
    return `> ${fahrenheit}°F`;
  }

  // Handle simple temperature
  const num = parseInt(celsius.replace(/[^0-9]/g, ""));
  const fahrenheit = Math.round((num * 9) / 5 + 32);
  return `${fahrenheit}°F`;
};

// Size conversions
export const cmToInches = (cm: string): string => {
  // Handle formats like "Ø25-28cm"
  if (cm.includes("Ø") && cm.includes("-")) {
    const [min, max] = cm
      .replace("Ø", "")
      .split("-")
      .map((part) => {
        const numPart = parseInt(part.replace(/[^0-9]/g, ""));
        return (numPart * 0.393701).toFixed(1);
      });
    return `Ø${min}-${max}in`;
  }

  // Handle simple cm measurements
  if (cm.includes("cm")) {
    const num = parseInt(cm.replace(/[^0-9]/g, ""));
    const inches = (num * 0.393701).toFixed(1);
    return `${inches}in`;
  }

  return cm; // Return original if format not recognized
};

// Oven size conversions (e.g., "60x60cm" to "24x24in")
export const ovenSizeToInches = (size: string): string => {
  if (size.includes("x") && size.includes("cm")) {
    const [width, height] = size
      .replace("cm", "")
      .split("x")
      .map((part) => {
        const numPart = parseInt(part);
        return Math.round(numPart * 0.393701);
      });
    return `${width}x${height}in`;
  }
  return size; // Return original if format not recognized
};

// Format weight based on unit system
export const formatWeight = (grams: number, isMetric: boolean): string => {
  if (isMetric) {
    // Format as metric
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(1).replace(/\.0$/, "")}kg`;
    }
    return `${grams}g`;
  } else {
    // Format as US customary
    const ounces = gramsToOunces(grams);
    if (ounces >= 16) {
      const pounds = Math.floor(ounces / 16);
      const remainingOz = (ounces % 16).toFixed(1).replace(/\.0$/, "");
      if (parseFloat(remainingOz) > 0) {
        return `${pounds}lb ${remainingOz}oz`;
      }
      return `${pounds}lb`;
    }
    return `${ounces}oz`;
  }
};

// Format volume based on unit system
export const formatVolume = (ml: number, isMetric: boolean): string => {
  if (isMetric) {
    // Format as metric
    if (ml >= 1000) {
      return `${(ml / 1000).toFixed(1).replace(/\.0$/, "")}L`;
    }
    return `${ml}ml`;
  } else {
    // Format as US customary
    const flOz = mlToFlOz(ml);
    if (flOz >= 32) {
      const quarts = Math.floor(flOz / 32);
      const remainingOz = (flOz % 32).toFixed(1).replace(/\.0$/, "");
      if (parseFloat(remainingOz) > 0) {
        return `${quarts}qt ${remainingOz}fl oz`;
      }
      return `${quarts}qt`;
    } else if (flOz >= 8) {
      const cups = Math.floor(flOz / 8);
      const remainingOz = (flOz % 8).toFixed(1).replace(/\.0$/, "");
      if (parseFloat(remainingOz) > 0) {
        return `${cups}cup ${remainingOz}fl oz`;
      }
      return `${cups}cup`;
    }
    return `${flOz}fl oz`;
  }
};

// Parse amount string and convert to appropriate unit
export const convertAmount = (amount: string, isMetric: boolean): string => {
  // Handle weight measurements
  if (amount.endsWith("g") && !amount.endsWith("kg")) {
    const grams = parseInt(amount.replace("g", ""));
    return formatWeight(grams, isMetric);
  }

  if (amount.endsWith("kg")) {
    const kg = parseFloat(amount.replace("kg", ""));
    return formatWeight(kg * 1000, isMetric);
  }

  // Handle volume measurements
  if (amount.endsWith("ml")) {
    const ml = parseInt(amount.replace("ml", ""));
    return formatVolume(ml, isMetric);
  }

  if (amount.endsWith("L") || amount.endsWith("l")) {
    const liters = parseFloat(amount.replace(/[Ll]/, ""));
    return formatVolume(liters * 1000, isMetric);
  }

  // Handle temperature
  if (amount.includes("°C")) {
    return isMetric ? amount : amount.replace("°C", "°F");
  }

  // Return original for other formats
  return amount;
};

// Convert a measurement in a text string
export const convertMeasurementsInText = (
  text: string,
  isMetric: boolean,
): string => {
  if (isMetric) return text; // No conversion needed for metric

  // Replace common patterns with their US equivalents
  return text
    .replace(/\b(\d+)g\b/g, (match, grams) => {
      return formatWeight(parseInt(grams), false);
    })
    .replace(/\b(\d+)ml\b/g, (match, ml) => {
      return formatVolume(parseInt(ml), false);
    })
    .replace(/\b(\d+)kg\b/g, (match, kg) => {
      return formatWeight(parseFloat(kg) * 1000, false);
    })
    .replace(/\b(\d+)L\b/g, (match, l) => {
      return formatVolume(parseFloat(l) * 1000, false);
    })
    .replace(/\b(\d+)-(\d+)°C\b/g, (match, min, max) => {
      const minF = Math.round((parseInt(min) * 9) / 5 + 32);
      const maxF = Math.round((parseInt(max) * 9) / 5 + 32);
      return `${minF}-${maxF}°F`;
    })
    .replace(/\b(\d+)°C\b/g, (match, temp) => {
      const tempF = Math.round((parseInt(temp) * 9) / 5 + 32);
      return `${tempF}°F`;
    })
    .replace(/über (\d+)°C/g, (match, temp) => {
      const tempF = Math.round((parseInt(temp) * 9) / 5 + 32);
      return `über ${tempF}°F`;
    });
};
