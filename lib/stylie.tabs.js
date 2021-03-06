/*
 * stylie.tabs
 * http://github.com/typesettin
 *
 * Copyright (c) 2015 Typesettin. All rights reserved.
 */
'use strict';

var extend = require('util-extend'),
	classie = require('classie'),
	events = require('events'),
	util = require('util');

/**
 * A module that represents a StylieTabs object, a componentTab is a page composition tool.
 * @{@link https://github.com/typesettin/stylie.tabs}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2015 Typesettin. All rights reserved.
 * @license MIT
 * @constructor StylieTabs
 * @requires module:util-extent
 * @requires module:util
 * @requires module:events
 * @param {object} el element of tab container
 * @param {object} options configuration options
 */
var StylieTabs = function (el, options) {
	events.EventEmitter.call(this);

	this.el = el;
	this.options = extend({}, this.options);
	extend(this.options, options);
	this.showTab = this._show;
	this._init();
};

util.inherits(StylieTabs, events.EventEmitter);

/** module default configuration */
StylieTabs.prototype.options = {
	start: 0,
	tabselector: 'nav > ul > li',
	itemselector: '.ts-tabs-content > section',
	currenttabclass: 'ts-tab-current',
	currentitemclass: 'ts-tabs-content-current'
};
/**
 * initializes tabs and shows current tab.
 * @emits tabsInitialized
 */
StylieTabs.prototype._init = function () {
	// tabs elemes
	this.tabs = [].slice.call(this.el.querySelectorAll(this.options.tabselector));
	// content items
	this.items = [].slice.call(this.el.querySelectorAll(this.options.itemselector));
	// current index
	this.current = -1;
	// show current content item
	this._show();
	// init events
	this._initEvents();
	if (this.options.callback) {
		this.options.callback();
	}
	this.emit('tabsInitialized');

};
/**
 * handle tab click events.
 */
StylieTabs.prototype._initEvents = function () {
	var self = this;

	this.tabs.forEach(function (tab, idx) {
		tab.addEventListener('click', function (ev) {
			ev.preventDefault();
			self._show(idx);
		});
	});
	this.emit('tabsEventsInitialized');
};
/**
 * Sets up a new lintotype component.
 * @param {number} idx tab to show
 * @emits tabsShowIndex
 */
StylieTabs.prototype._show = function (idx) {
	if (this.current >= 0) {
		classie.remove(this.tabs[this.current], this.options.currenttabclass);
		classie.remove(this.items[this.current], this.options.currentitemclass);
	}
	// change current
	this.current = idx !== undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
	classie.add(this.tabs[this.current], this.options.currenttabclass);
	classie.add(this.items[this.current], this.options.currentitemclass);
	this.emit('tabsShowIndex', this.current);
};
module.exports = StylieTabs;
