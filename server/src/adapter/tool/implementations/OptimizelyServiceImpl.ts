import { OptimizelyService } from "../OptimizelyService";
import ExperimentRequestModel from "../../../usecase/domain/ExperimentRequestModel";
import OptimizelyDto from "../../../dto/OptimizelyDto";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { IOCode } from "../../../common/IOCode";

@Injectable()
export default class OptimizelyServiceImpl implements OptimizelyService {

  constructor(private readonly httpService: HttpService) {
  }

  async getResultByNetworkCall(experimentRequestModel: ExperimentRequestModel): Promise<OptimizelyDto[]> {

    const url = `https://api.optimizely.com/v2/experiments/${experimentRequestModel.id}/results?start_time=${experimentRequestModel.startDate}&end_time=${experimentRequestModel.endDate}&device=${experimentRequestModel.deviceType}`;

    const networkRes = await this.httpService.axiosRef.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${experimentRequestModel.apiKey}`
      }
    });

    let optimizelyDTOs: OptimizelyDto[] = [];

    if (networkRes.status === IOCode.NETWORK_SUCCESS) {
      optimizelyDTOs = this.formatData(networkRes.data);
    }

    return optimizelyDTOs;
  }

  formatData(data: any): OptimizelyDto[] {

    const optimizelyDTOs: OptimizelyDto[] = [];

    data.metrics.forEach(metric => {
      const resultKeys = Object.keys(metric.results);
      resultKeys.forEach((key) => {

        const variation = metric.results[key];
        let optimizelyDto: OptimizelyDto = new OptimizelyDto();

        optimizelyDto.startTimeUTC = data.start_time;
        optimizelyDto.endTimeUTC = data.end_time;
        optimizelyDto.variationName = variation.name;
        optimizelyDto.variationId = variation.variation_id;
        optimizelyDto.isBaselineVariation = variation.is_baseline;
        optimizelyDto.metricEventName = metric.name;
        optimizelyDto.metricEventId = metric.event_id;
        optimizelyDto.metricNumeratorType = metric.aggregator;
        optimizelyDto.metricDenominatorType = metric.scope;
        optimizelyDto.metricWinningDirection = metric.winning_direction;
        optimizelyDto.numeratorValue = variation.value;
        optimizelyDto.denominatorValue = variation.samples;
        optimizelyDto.metricValue = variation.rate;

        if (variation.lift) {
          optimizelyDto.improvementStatusFromBaseline = variation.lift.lift_status;
          optimizelyDto.improvementValueFromBaseline = variation.lift.value;
          optimizelyDto.statisticalSignificance = variation.lift.significance;
          optimizelyDto.isImprovementSignificant = variation.lift.is_significant;
          optimizelyDto.confidenceIntervalLow = variation.lift.confidence_interval[0];
          optimizelyDto.confidenceIntervalHigh = variation.lift.confidence_interval[1];
          optimizelyDto.samplesRemainingToSignificance = variation.lift.visitors_remaining;
        } else {
          optimizelyDto.improvementStatusFromBaseline = "N/A";
          optimizelyDto.improvementValueFromBaseline = "N/A";
          optimizelyDto.statisticalSignificance = "N/A";
          optimizelyDto.isImprovementSignificant = "N/A";
          optimizelyDto.confidenceIntervalLow = "N/A";
          optimizelyDto.confidenceIntervalHigh = "N/A";
          optimizelyDto.samplesRemainingToSignificance = "N/A";
        }

        optimizelyDTOs.push(optimizelyDto);

      });
    });
    return optimizelyDTOs;
  }
}