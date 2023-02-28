export default {
	
	onOpen: () => {
		if(!appsmith.store?.formData?.channels) {showModal('Modal1')}
	},
	
	storeFormData: async () => {
		await storeValue('formData', JSONForm1.formData);
		storeValue('fieldState',JSONForm1.fieldState);
		closeModal('Modal1')
	},


	setupChannels: () => {
		return appsmith.store?.formData?.channels?.map(ch => {return {'label':ch['slack_channels']['customField2'],'value':ch['slack_channels']['customField1']}}) || [{'label':'enter channel info in setup form','value':''}]
	},

	setupMentionUsers: () => {
		return appsmith.store?.formData?.mention_users?.map(mu => {return {'label':mu.firstField,'value':`<@${mu.customField1}>`}})|| [{'label':'enter user info in setup form','value':''}]
	},
	
	clearSetup: () => {
		storeValue('formData','');
	},
	

	filterByValue: (data, key, selOption) => {
		// filters data where key == selOption or selOption == 'ALL' 
		return data.filter(
			row => {
				let keys = key.split("."), len = keys.length;
				let value = len == 1 ? row[key] : 
				len == 2 ? row[keys[0]][keys[1]] : 
				"";
				return value == selOption || selOption == "ALL"
			}
		)
	},
	openSetup: async () => {
		if(appsmith.mode == "EDIT") {showModal('Modal1')}
	}
}