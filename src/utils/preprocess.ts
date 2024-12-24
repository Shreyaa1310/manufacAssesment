export const preprocessData = (data: any[]) => {
  return data.map((row) => ({
    Year: row["Year"]?.replace("Financial Year (Apr - Mar), ", "") || "Unknown",
    Crop: row["Crop Name"] || "Unknown",
    Production: parseFloat(row["Crop Production (UOM:t(Tonnes))"]) || 0,
    Yield:
      parseFloat(row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
    Area: parseFloat(row["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
  }));
};
export const aggregateProductionByYear = (data: any[]) => {
  // Group data by year
  const groupedByYear = data.reduce((acc: Record<string, any[]>, row) => {
    acc[row.Year] = acc[row.Year] || [];
    acc[row.Year].push(row);
    return acc;
  }, {});

  return Object.keys(groupedByYear).map((year) => {
    //  max or min of groupedByYear
    const crops = groupedByYear[year];
    const maxCrop = crops.reduce((max, crop) =>
      crop.Production > max.Production ? crop : max
    );
    const minCrop = crops.reduce((min, crop) =>
      crop.Production < min.Production ? crop : min
    );

    return {
      Year: year,
      MaxProductionCrop: maxCrop.Crop,
      MinProductionCrop: minCrop.Crop,
    };
  });
};
export const aggregateAverageByCrop = (data: any[]) => {
  // Group data by crop
  const groupedByCrop = data.reduce((acc: Record<string, any[]>, row) => {
    acc[row.Crop] = acc[row.Crop] || [];
    acc[row.Crop].push(row);
    return acc;
  }, {});

  return Object.keys(groupedByCrop).map((crop) => {
    // average of yield and cultivation area of groupedByCrop
    const crops = groupedByCrop[crop];
    const avgYield =
      crops.reduce((sum, crop) => sum + crop.Yield, 0) / crops.length;
    const avgArea =
      crops.reduce((sum, crop) => sum + crop.Area, 0) / crops.length;

    return {
      Crop: crop,
      AverageYield: parseFloat(avgYield.toFixed(3)),
      AverageArea: parseFloat(avgArea.toFixed(3)),
    };
  });
};
