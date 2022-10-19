export enum SourceType{
	CAMPAIGN = "campaign",
	DIRECT = "direct",
	REFERRAL = "referral",
	SEARCH = "search",
}

export function SourceTypeToArray() {
	let sourceType: { key: string; value: string; }[] = [];
	const deviceTypeKeys = Object.keys(SourceType);
	const deviceTypeValues = Object.values(SourceType);
	deviceTypeKeys.forEach((key,index) => {
		if (sourceType.findIndex(x => x.key === key)) {
			sourceType.push({
				key: key,
				value: deviceTypeValues[index]
			})
		}
	})
	return sourceType;
}
