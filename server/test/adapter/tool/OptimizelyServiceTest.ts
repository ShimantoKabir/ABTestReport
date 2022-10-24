import { OptimizelyService } from "../../../src/adapter/tool/OptimizelyService";
import { Test } from "@nestjs/testing";
import { HttpModule, HttpService } from "@nestjs/axios";
import OptimizelyServiceImpl from "../../../src/adapter/tool/implementations/OptimizelyServiceImpl";
import { MockData } from "../../MockData";
import OptimizelyDto from "../../../src/dto/OptimizelyDto";
import ExperimentRequestModel from "../../../src/usecase/domain/ExperimentRequestModel";
import { DeviceType } from "../../../src/type/DeviceType";
import { AxiosResponse } from "axios";

// describe("OptimizelyServiceTest",()=>{
//
//   let optimizelyService : OptimizelyService;
//   let httpService : HttpService;
//   let model : ExperimentRequestModel;
//
//   beforeEach(async ()=>{
//     const module = await Test.createTestingModule({
//       imports: [HttpModule],
//       providers: [OptimizelyServiceImpl]
//     }).compile()
//
//     httpService = await module.get<HttpService>(HttpService);
//     optimizelyService = await module
//       .get<OptimizelyServiceImpl>(OptimizelyServiceImpl);
//     model = new ExperimentRequestModel();
//   });
//
//   it("It should return a array", () => {
//     const dtoList : OptimizelyDto[] = optimizelyService.responseToDtoList("");
//     expect(Array.isArray(dtoList)).toEqual(true);
//   });
//
//   it("It should return a array of [OptimizelyDto]", () => {
//
//     const dtoList = optimizelyService.responseToDtoList(MockData.optimizelyMockResponse);
//
//     if (Array.isArray(dtoList)){
//       const isOptimizelyDtoArray = dtoList.length > 0 && dtoList.every((obj) => {
//           return obj instanceof OptimizelyDto;
//       });
//       expect(isOptimizelyDtoArray).toEqual(true);
//     }else {
//       fail("Is not even a array!")
//     }
//   });
//
//   it("It should return empty optimizely dto list", () => {
//     const dtoList = optimizelyService.responseToDtoList("");
//     expect(dtoList).toHaveLength(0);
//   });
//
//   it("It should contain experiment id and start date on the URL", () => {
//     model.id = 22025281356;
//     model.startDate = "2022-10-10T00:00:00.000Z"
//     model.deviceType = DeviceType.ALL;
//
//     const URL = optimizelyService.addQueryToUrl(model);
//
//     expect(URL).toContain(model.id.toString());
//     expect(URL).toContain(model.startDate);
//     expect(URL).not.toContain("end_date");
//     expect(URL).not.toContain("device");
//   });
//
//   it("It should experiment id and start date on the URL", () => {
//     model.id = 22025281356;
//     model.endDate = "2022-10-10T00:00:00.000Z"
//     model.deviceType = DeviceType.DESKTOP;
//
//     const URL = optimizelyService.addQueryToUrl(model);
//
//     expect(URL).toContain(model.id.toString());
//     expect(URL).toContain(model.endDate);
//     expect(URL).toContain(model.deviceType);
//     expect(URL).not.toContain("start_date");
//   });
//
//   it("It should return optimizely dto list for the final response", async () => {
//
//     model.id = 22025281356;
//     model.startDate = "2022-10-10T00:00:00.000Z"
//     model.endDate = "2022-10-10T00:00:00.000Z"
//     model.deviceType = DeviceType.DESKTOP;
//     model.apiKey = "api_key";
//
//     const response: AxiosResponse = {
//       data: MockData.optimizelyMockResponse,
//       headers: {},
//       config: { url: "URL" },
//       status: 200,
//       statusText: 'OK'
//     };
//
//     jest.spyOn(httpService.axiosRef, 'get')
//     .mockImplementationOnce(async () => {
//       return Promise.resolve(response);
//     });
//
//     const dtoList = await optimizelyService.getResultByNetworkCall(model);
//
//     expect(dtoList).not.toEqual(0);
//
//     dtoList.forEach(obj=>{
//       expect(obj.startTimeUTC).toEqual(MockData.optimizelyMockResponse.start_time);
//       expect(obj.endTimeUTC).toEqual(MockData.optimizelyMockResponse.end_time);
//     });
//   });
// });