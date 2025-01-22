import { useState, useEffect } from "react";
import "./App.css";
import { CellObject, read, utils } from "xlsx";
import { AnalysisResult, AnalysisResultColumn } from "./types";

function App() {
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>(
    JSON.parse(
      localStorage.getItem("analysisResults") ?? "[]"
    ) as AnalysisResult[]
  );
  const [filename, setFilename] = useState("");

  useEffect(() => {
    localStorage.setItem("analysisResults", JSON.stringify(analysisResults));
  }, [analysisResults]);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log("file: ", file);
    if (!file) return;

    setLoading(true);
    setFilename(file.name);

    const reader = new FileReader();
    reader.onload = function (e) {
      const u8 = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = read(u8);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: unknown[][] = utils.sheet_to_json(worksheet, { header: 1 });
      console.log("json: ", json);
      const [headers, ...rows] = json;
      console.log("headers: ", headers);
      console.log("rows: ", rows);

      const columns: AnalysisResultColumn[] = headers.map((header, index) => {
        const values = rows.map((row) => row[index]);
        const nonEmptyValues = values.filter((v) => !!v);
        const firstValueIndex = values.indexOf(nonEmptyValues[0]);
        const firstValueAddress = utils.encode_cell({
          r: firstValueIndex + 1,
          c: index,
        });
        const firstValueType: string = (
          worksheet[firstValueAddress] as CellObject
        ).t;
        let type: string;
        switch (firstValueType) {
          case "s":
            type = "Text";
            break;
          case "b":
            type = "Boolean";
            break;
          case "n":
            type = "Number";
            break;
          default:
            type = "Others";
        }

        const emptyCount = rows.length - nonEmptyValues.length;

        let mean: number | undefined;
        let stdDev: number | undefined;
        let topValues: [string, number][] | undefined;

        if (type === "Text") {
          console.log("text");
          const counts: Record<string, number> = {};
          nonEmptyValues.forEach((v): void => {
            counts[v as string] = (counts[v as string] || 0) + 1;
          });
          topValues = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        } else if (type === "Number") {
          console.log("number");
          const nums = nonEmptyValues.map(Number);
          console.log("nums :", nums);
          mean = nums.reduce((sum, number) => sum + number, 0) / nums.length;
          stdDev = Math.sqrt(
            nums.reduce(
              (sum, number) => sum + (number - (mean as number)) ** 2,
              0
            ) / nums.length
          );
        }
        return {
          name: header as string,
          type,
          emptyCount,
          mean,
          stdDev,
          topValues,
        };
      });
      console.log("columns: ", columns);
      setAnalysisResults([
        {
          filename: file.name,
          columns,
        },
        ...analysisResults,
      ]);
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  }

  function deleteAnalysis(index: number) {
    setAnalysisResults((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="App">
      <h1>CSV Analyser</h1>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      {loading && <p>Processing {filename}...</p>}

      <div className="results">
        {analysisResults.map((result, index) => (
          <div className="result" key={index}>
            <div className="filename">
              <h2>{result.filename}</h2>
              <button
                className="deleteButton"
                onClick={() => deleteAnalysis(index)}
              >
                Delete
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Type</th>
                  <th>Empty Count</th>
                  <th>Mean</th>
                  <th>Std Dev</th>
                  <th>Top Values(Count)</th>
                </tr>
              </thead>
              <tbody>
                {result.columns.map((col, i) => (
                  <tr key={i}>
                    <td>{col.name}</td>
                    <td>{col.type}</td>
                    <td>{col.emptyCount}</td>
                    <td>{col.mean?.toFixed(2) ?? "N/A"}</td>
                    <td>{col.stdDev?.toFixed(2) ?? "N/A"}</td>
                    <td>
                      <ol>
                        {col.topValues
                          ? col.topValues.map(([val, count]) => (
                              <li className="topValue">
                                {val} ({count})
                              </li>
                            ))
                          : "N/A"}
                      </ol>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
