import { preprocessData } from "./utils/preprocess";
import {
  aggregateProductionByYear,
  aggregateAverageByCrop,
} from "./utils/preprocess";
import { CustomTable } from "./Components/DataTable";
import dataset from "./data/dataset.json";

const App = () => {
  const data = preprocessData(dataset);

  const productionStats = aggregateProductionByYear(data);
  const averageStats = aggregateAverageByCrop(data);

  //  column configurations for each table
  const productionColumns = [
    { key: "Year", label: "Year" },
    {
      key: "MaxProductionCrop",
      label: "Crop with Maximum Production in that Year",
    },
    {
      key: "MinProductionCrop",
      label: "Crop with Minimum Production in that Year",
    },
  ];

  const averageColumns = [
    { key: "Crop", label: "Crop" },
    {
      key: "AverageYield",
      label: "Average Yield of the Crop between 1950-2020",
    },
    {
      key: "AverageArea",
      label: "Average Cultivation Area of the Crop between 1950-2020",
    },
  ];

  return (
    <div style={{ padding: "60px" }}>
      <h1>Indian Agriculture Analytics</h1>
      <h2>Crop Production by Year</h2>
      {/*Table for Crop with Maximum & Minimum Production Year */}
      <CustomTable data={productionStats} columns={productionColumns} />
      {/*Table for Average Yield of the Crop & Cultivation Area between 1950-2020 */}
      <h2>Average Yield and Cultivation Area by Crop</h2>
      <CustomTable data={averageStats} columns={averageColumns} />
    </div>
  );
};

export default App;
