// JavaScript Document
(function spoke() {
	
	// preload all the things
	
	function type(op) {
		if (typeof op.name === 'String') {
			this.name = op.name;
			this.description = op.description || '';
			this.caption = op.caption || this.description;
			this.keywordFilter = op.keywordFilter || '';
			this.keywordTemplates = op.keywordTemplates || '';
			this.revisioned = op.revisioned || true;
			this.labelRequired = op.labelRequired || false;
			this.labelRoles = op.labelRoles || '';
			this.keywordsRequired = op.keywordsRequired || false;
			this.keywordsRoles = op.keywordsRoles || '';
			this.extends = op.extends || '';
			this.final = op.final || false;
			
			for (i in op.properties) {
				// set up properties, database, etc.
			}
			
			this.handlers = op.handlers || {};
			if (typeof this.handlers.display !== 'Function') {
				this.handlers.display = function() {
					return '<p>Name: ' + content.name + '<br />ID: ' + content.id + '</p><hr />';
				}
			}
			
			this.retrieve = function(op) {
				// returns rendered data via a handler function
				// Note: if you send "raw" as the method, it returns an array containing database rows
				this.content = {};	// The "tweezer" by which content is spoon-fed to the handler
			};
			
		} else {
			throw new Error('spType: name attribute is required');
		}
	}
	
})();

var FCInstaller = new spoke.type({
	name: 'FCInstaller',
	caption: 'Certified Installer',
	description: 'FELLERS Certified Installer',
	revisioned: false,
	properties: {
		'company': {
			type: 'Text',
			maxlength: 250,
			caption: 'Company Name',
			required: true,
			displaysize: 70
		},
		'address': {
			type: 'Text',
			maxlength: 100,
			caption: 'Company Address',
			displaysize: 70
		},
		'address2': {
			type: 'Text',
			maxlength: 100,
			caption: 'Address 2',
			displaysize: 70
		},
		'city': {
			type: 'Text',
			maxlength: 100,
			caption: 'City',
			displaysize: 70
		},
		'state': {
			type: 'ValuePicker',
			caption: 'State',
			values: ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY']
		},
		'zip': {
			type: 'Text',
			maxlength: 10,
			caption: 'ZIP Code',
			displaysize: 10
		}
	},
	handlers: {
		'precis': function() {
			var blaa = FCUser.retrieve({ method: 'raw', where: 'installer = ' + content.spId });
			var out = '<p>' + content.company + '<br />' + content.address + '<br />';
			if (content.address2.length > 0) out += content.address2 + '<br />';
			out += content.city + ', ' + content.state + ' ' + content.zip + '<br />';
			if (blaa.username !== '') out += 'FELLERS Customer ID: ' + blaa.username + '<br />';
			out += 'Contact: ' + content.contact + '<br />Tel: ' + content.phone + '<br />Fax: ' + content.fax + '</p>';
			return out;
		}
	}
});