export enum SourceType{
	CAMPAIGN = "campaign",
	DIRECT = "direct",
	REFERRAL = "referral",
	SEARCH = "search",
	ALL = "all"
}

export function SourceTypeToArray() {
	let deiceTypes: { key: string; value: string; }[] = [];
	const deviceTypeKeys = Object.keys(SourceType);
	const deviceTypeValues = Object.values(SourceType);
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

