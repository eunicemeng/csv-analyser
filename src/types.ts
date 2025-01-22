export type AnalysisResult = {
  filename: string;
  columns: AnalysisResultColumn[];
};

export type AnalysisResultColumn = {
  name: string;
  type: string;
  emptyCount: number;
  mean?: number;
  stdDev?: number;
  topValues?: [string, number][];
};
