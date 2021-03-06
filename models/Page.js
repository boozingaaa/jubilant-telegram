var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Page.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	headone: {
		content:{type: String, required:false},
		content_br:{type: String, required:false},
		image:{type: Types.CloudinaryImage},
		content_full:{type: String}
	},
	headtwo: {
		content:{type: String, required:false},
		content_br:{type: String, required:false},
		image:{type: Types.CloudinaryImage},
		content_full:{type: String}
	},
	headthree: {
		content:{type: String, required:false},
		content_br:{type: String, required:false},
		image:{type: Types.CloudinaryImage},
		content_full:{type: String}
	},
	pageCategory: { type: Types.Relationship, ref: 'pageCategory', many: true }
});

Page.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Page.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Page.register();
