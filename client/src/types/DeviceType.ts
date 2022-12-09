import {KeyValue} from "../dtos/KeyValue";

export enum DeviceType {
	DESKTOP = "desktop",
	TABLET = "tablet",
	MOBILE = "mobile"
}

export function DeviceTypeToArray() {
	let deiceTypes: KeyValue<string>[] = [];
	const deviceTypeKeys = Object.keys(DeviceType);
	const deviceTypeValues = Object.values(DeviceType);
	deviceTypeKeys.forEach((key, index) => {
		if (deiceTypes.findIndex(x => x.key === key)) {
			deiceTypes.push({
				key: key,
				value: deviceTypeValues[index],
				isChecked: true,
				type: "device"
			})
		}
	})
	return deiceTypes;
}
