export default class OptimizelyDto{
  startTimeUTC : string;
  endTimeUTC: string;
  variationName: string;
  variationId: number;
  isBaselineVariation: boolean;
  metricEventName: string;
  metricEventId: number;
  metricNumeratorType: string;
  metricDenominatorType: string;
  metricWinningDirection: string;
  numeratorValue : number;
  denominatorValue : number;
  metricValue: number;
  improvementStatusFromBaseline: string;
  improvementValueFromBaseline: number | string;
  statisticalSignificance : number | string;
  isImprovementSignificant: boolean | string;
  confidenceIntervalLow : number | string;
  confidenceIntervalHigh : number | string;
  samplesRemainingToSignificance: number | string;
}