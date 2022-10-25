import { OptimizelyService } from "../OptimizelyService";
import ExperimentRequestModel from "../../../usecase/domain/ExperimentRequestModel";
import OptimizelyDto from "../../../dto/OptimizelyDto";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { OptimizelyDtoBuilder } from "../../../dto/builders/OptimizelyDtoBuilder";
import OptimizelyDtoBuilderImpl from "../../../dto/builders/implementations/OptimizelyDtoBuilderImpl";
import { IOMsg } from "../../../common/IOMsg";

@Injectable()
export default class OptimizelyServiceImpl implements OptimizelyService {

  constructor(private readonly httpService: HttpService) {
  }

  async getResultByNetworkCall(experimentRequestModel: ExperimentRequestModel): Promise<OptimizelyDto[]> {

    let optimizelyDTOs: OptimizelyDto[] = [];
    let url = this.addQueryToUrl(experimentRequestModel);

    console.log("url: ",url);

    try {

      const networkRes = await this.httpService.axiosRef.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${experimentRequestModel.apiKey}`
        }
      });

      optimizelyDTOs = this.responseToDtoList(networkRes.data);

    } catch (e) {
      console.log(`${OptimizelyServiceImpl.name}, error=`, JSON.stringify(e));
    }

    return optimizelyDTOs;
  }

  responseToDtoList(data: any): OptimizelyDto[] {

    let optimizelyDTOs: OptimizelyDto[];

    try {
      optimizelyDTOs = [];
      data.metrics.forEach(metric => {
        const resultKeys = Object.keys(metric.results);
        resultKeys.forEach((key) => {

          const variation = metric.results[key];
          let optimizelyDtoBuilder: OptimizelyDtoBuilder = new OptimizelyDtoBuilderImpl();

          optimizelyDtoBuilder.withStartTimeUTC(data.start_time)
          .withEndTimeUTC(data.end_time)
          .withVariationName(variation.name)
          .withVariationId(variation.variation_id)
          .isBaselineVariation(variation.is_baseline)
          .withMetricEventName(metric.name)
          .withMetricEventId(metric.event_id)
          .withMetricNumeratorType(metric.aggregator)
          .withMetricDenominatorType(metric.scope)
          .withMetricWinningDirection(metric.winning_direction)
          .withNumeratorValue(variation.value)
          .withDenominatorValue(variation.samples)
          .withMetricValue(variation.rate);

          if (variation.lift) {
            optimizelyDtoBuilder
            .withImprovementStatusFromBaseline(variation.lift.lift_status)
            .withImprovementValueFromBaseline(variation.lift.value)
            .withStatisticalSignificance(variation.lift.significance)
            .isImprovementSignificant(variation.lift.is_significant);

            if (variation.lift.confidence_interval){
              optimizelyDtoBuilder
              .withConfidenceIntervalLow(variation.lift.confidence_interval[0])
              .withConfidenceIntervalHigh(variation.lift.confidence_interval[1])
            }else {
              optimizelyDtoBuilder
              .withConfidenceIntervalLow(IOMsg.NA)
              .withConfidenceIntervalHigh(IOMsg.NA)
            }

            optimizelyDtoBuilder
            .withSamplesRemainingToSignificance(variation.lift.visitors_remaining);
          } else {
            optimizelyDtoBuilder
            .withImprovementStatusFromBaseline(IOMsg.NA)
            .withImprovementValueFromBaseline(IOMsg.NA)
            .withStatisticalSignificance(IOMsg.NA)
            .isImprovementSignificant(IOMsg.NA)
            .withConfidenceIntervalLow(IOMsg.NA)
            .withConfidenceIntervalHigh(IOMsg.NA)
            .withSamplesRemainingToSignificance(IOMsg.NA);
          }

          optimizelyDTOs.push(optimizelyDtoBuilder.build());
        });
      });
    } catch (e) {
      console.log("error=",e);
      optimizelyDTOs = [];
    }
    return optimizelyDTOs;
  }

  addQueryToUrl(experimentRequestModel: ExperimentRequestModel): string {

    let url = `https://api.optimizely.com/v2/experiments/${experimentRequestModel.id}/results?`;

    if (experimentRequestModel.startDate) {
      url = url + `start_time=${experimentRequestModel.startDate}&`;
    }

    if (experimentRequestModel.endDate) {
      url = url + `end_time=${experimentRequestModel.endDate}&`;
    }

    if (experimentRequestModel.deviceType) {
      url = url + `device=${experimentRequestModel.deviceType}&`;
    }

    if (experimentRequestModel.sourceType) {
      url = url + `source=${experimentRequestModel.sourceType}`;
    }

    return url;
  }
}