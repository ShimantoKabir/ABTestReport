export enum ToolType {
	VWO = 1,
	OPTIMIZELY = 2,
	ADOBE_TARGET = 3
}

export function ToolTypeToArray() {
	let toolTypes: { key: number; value: string; }[] = [];
	const toolTypeKeys = Object.keys(ToolType);
	toolTypeKeys.forEach(key => {
		let keyNumber = Number(key);
		if (!isNaN(keyNumber) && toolTypes.findIndex(x => x.key === keyNumber)) {
			toolTypes.push({
				key: Number(key),
				value: ToolType[keyNumber]
			})
		}
	})
	return toolTypes;
}
