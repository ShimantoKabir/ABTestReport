export enum DeviceType{
  DESKTOP = "desktop",
  TABLET = "tablet",
  MOBILE = "mobile",
  IPHONE = "iphone",
  IPAD = "ipad"
}

export function DeviceTypeToArray() {
  let deiceTypes: { key: string; value: string; }[] = [];
  const deviceTypeKeys = Object.keys(DeviceType);
  const deviceTypeValues = Object.values(DeviceType);
  deviceTypeKeys.forEach((key,index) => {
    if (deiceTypes.findIndex(x => x.key === key)) {
      deiceTypes.push({
        key: key,
        value: deviceTypeValues[index]
      })
    }
  })
  return deiceTypes;
}
