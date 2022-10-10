import OptimizelyDto from "../OptimizelyDto";

export const ODB = "ODB";
export interface OptimizelyDtoBuilder{
  optimizelyDto : OptimizelyDto;
  withStartTimeUTC(startTimeUTC: string): this
  withEndTimeUTC(endTimeUTC: string): this
  withVariationName(variationName: string): this
  withVariationId(variationId: number): this
  isBaselineVariation(isBaselineVariation: boolean): this
  withMetricEventName(metricEventName: string): this
  withMetricEventId(metricEventId: number): this
  withMetricNumeratorType(metricNumeratorType: string): this
  withMetricDenominatorType(metricDenominatorType: string): this
  withMetricWinningDirection(metricWinningDirection: string): this
  withNumeratorValue(numeratorValue : number): this
  withDenominatorValue(denominatorValue : number): this
  withMetricValue(metricValue: number): this
  withImprovementStatusFromBaseline(improvementStatusFromBaseline: string): this
  withImprovementValueFromBaseline(improvementValueFromBaseline: number | string): this
  withStatisticalSignificance(statisticalSignificance : number | string): this
  isImprovementSignificant(isImprovementSignificant: boolean | string): this
  withConfidenceIntervalLow(confidenceIntervalLow : number | string): this
  withConfidenceIntervalHigh(confidenceIntervalHigh : number | string): this
  withSamplesRemainingToSignificance(samplesRemainingToSignificance: number | string): this
  build() : OptimizelyDto
}