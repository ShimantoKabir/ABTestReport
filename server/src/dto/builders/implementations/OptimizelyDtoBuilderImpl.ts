import { OptimizelyDtoBuilder } from "../OptimizelyDtoBuilder";
import { OptimizelyDto } from "../../OptimizelyDto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OptimizelyDtoBuilderImpl implements OptimizelyDtoBuilder {

  optimizelyDto: OptimizelyDto;

  constructor() {
    this.optimizelyDto = new OptimizelyDto();
  }

  isBaselineVariation(isBaselineVariation: boolean): this {
    this.optimizelyDto.isBaselineVariation = isBaselineVariation;
    return this;
  }

  isImprovementSignificant(isImprovementSignificant: boolean | string): this {
    this.optimizelyDto.isImprovementSignificant = isImprovementSignificant;
    return this;
  }

  withConfidenceIntervalHigh(confidenceIntervalHigh: number | string): this {
    this.optimizelyDto.confidenceIntervalHigh = confidenceIntervalHigh;
    return this;
  }

  withConfidenceIntervalLow(confidenceIntervalLow: number | string): this {
    this.optimizelyDto.confidenceIntervalLow = confidenceIntervalLow;
    return this;
  }

  withDenominatorValue(denominatorValue: number): this {
    this.optimizelyDto.denominatorValue = denominatorValue;
    return this;
  }

  withEndTimeUTC(endTimeUTC: string): this {
    this.optimizelyDto.endTimeUTC = endTimeUTC;
    return this;
  }

  withImprovementStatusFromBaseline(improvementStatusFromBaseline: string): this {
    this.optimizelyDto.improvementStatusFromBaseline = improvementStatusFromBaseline;
    return this;
  }

  withImprovementValueFromBaseline(improvementValueFromBaseline: number | string): this {
    this.optimizelyDto.improvementValueFromBaseline = improvementValueFromBaseline;
    return this;
  }

  withMetricDenominatorType(metricDenominatorType: string): this {
    this.optimizelyDto.metricDenominatorType = metricDenominatorType;
    return this;
  }

  withMetricEventId(metricEventId: number): this {
    this.optimizelyDto.metricEventId = metricEventId;
    return this;
  }

  withMetricEventName(metricEventName: string): this {
    this.optimizelyDto.metricEventName = metricEventName;
    return this;
  }

  withMetricNumeratorType(metricNumeratorType: string): this {
    this.optimizelyDto.metricNumeratorType = metricNumeratorType;
    return this;
  }

  withMetricValue(metricValue: number): this {
    this.optimizelyDto.metricValue = metricValue;
    return this;
  }

  withMetricWinningDirection(metricWinningDirection: string): this {
    this.optimizelyDto.metricWinningDirection = metricWinningDirection;
    return this;
  }

  withNumeratorValue(numeratorValue: number): this {
    this.optimizelyDto.numeratorValue = numeratorValue;
    return this;
  }

  withSamplesRemainingToSignificance(samplesRemainingToSignificance: number | string): this {
    this.optimizelyDto.samplesRemainingToSignificance = samplesRemainingToSignificance;
    return this;
  }

  withStartTimeUTC(startTimeUTC: string): this {
    this.optimizelyDto.startTimeUTC = startTimeUTC;
    return this;
  }

  withStatisticalSignificance(statisticalSignificance: number | string): this {
    this.optimizelyDto.statisticalSignificance = statisticalSignificance;
    return this;
  }

  withVariationId(variationId: number): this {
    this.optimizelyDto.variationId = variationId;
    return this;
  }

  withVariationName(variationName: string): this {
    this.optimizelyDto.variationName = variationName;
    return this;
  }

  withExperimentId(experimentId: number): this {
    this.optimizelyDto.experimentId = experimentId;
    return this;
  }

  withStartDate(startDate: string): this {
    this.optimizelyDto.startDate = startDate;
    return this;
  }

  withStartDateOffset(offset: string): this {
    this.optimizelyDto.startDateOffset = offset;
    return this;
  }

  withEndDate(endDate: string): this {
    this.optimizelyDto.endDate = endDate;
    return this;
  }

  withEndDateOffset(offset: string): this {
    this.optimizelyDto.endDateOffset = offset;
    return this;
  }

  withSiteName(siteName: string): this {
    this.optimizelyDto.siteName = siteName;
    return this;
  }

  build(): OptimizelyDto {
    return this.optimizelyDto;
  }
}