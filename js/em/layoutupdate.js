/**
 * EM LayoutUpdate
 *
 * @license commercial software
 * @copyright (c) 2012 Codespot Software JSC - EMThemes.com. (http://www.emthemes.com)
 */

(function() {
var $ = jQuery;
	
EM_LayoutUpdate = {
	BASE_URL: '/',
	FORM_KEY: ''
};

EM_LayoutUpdate.LayoutEditor = {
	options: {
		handle: '',
		area: '',
		package: '',
		theme: ''
	},
	
	/** @protected */
	waitingDiv: null,
	
	init: function() {
		var self = this;
		
		$('.em_layoutupdate_droparea').sortable({
			connectWith: '.em_layoutupdate_droparea',
			items: ".em_layoutupdate_portlet"
		});

		$('.em_layoutupdate_droparea > *').not('.em_layoutupdate_portlet, .em_layoutupdate_toolbar_wrapper, script').addClass('em_layoutupdate_not_portlet');
		
		$('.em_layoutupdate_toolbar_wrapper').draggable();
		
		$('.em_layoutupdate_portlet').append('<a class="toggle_visibility" href="javascript:void(0)" onclick="EM_LayoutUpdate.LayoutEditor.toggleVisibility(this.parentNode)" title="Show/Hide this block">Show/Hide this block</a>');
		
		// create waiting layer {{{
		$('body').append('<div id="em_layoutupdate_waiting" style="display:none">&nbsp;</div>');
		this.waitingDiv = $('#em_layoutupdate_waiting').get(0);
		$(this.waitingDiv).height($(window).height());
		
		$(window).resize(this, function(e) {
			$(self.waitingDiv).height($(window).height());
		});
		// }}}
		
		
		$.post(EM_LayoutUpdate.BASE_URL + 'layoutupdate/adminhtml_block/getformkey', {}, function(html) {
			EM_LayoutUpdate.FORM_KEY = html;
		}).error(this.errorHandler);
		
		
		
		return this;
	},
	
	showWaiting: function() {
		$(this.waitingDiv).show();
		return this;
	},
	
	hideWaiting: function() {
		$(this.waitingDiv).hide();
		return this;
	},
	
	toggleVisibility: function(element) {
		$(element).toggleClass('em_layoutupdate_hidden');
		return this;
	},
	
	/**
	 * @protected 
	 */
	savePage: function(containerBlock, handle) {
		var self = this;
		
		var postVars = { 
			handle: handle,
			area: this.options.area,
			package: this.options.package,
			theme: this.options.theme,
			blocks: {},
			form_key: EM_LayoutUpdate.FORM_KEY
		};
		
		$('.em_layoutupdate_droparea').each(function() {
			var block = $(this).data('blockName');
			if (block == containerBlock) {
				postVars.blocks[block] = {};
			
				$('.em_layoutupdate_portlet', this).each(function(idx) {
					var portlet = $(this).data('blockName');
					if (portlet) {
						postVars.blocks[block][portlet] = {
							ordering: idx,
							hidden: $(this).hasClass('em_layoutupdate_hidden') ? 1 : 0
						};
					}
				});
			}
		});
		
		this.showWaiting();
		$.post(EM_LayoutUpdate.BASE_URL + 'layoutupdate/adminhtml_block/save', postVars, this.successHandler)
			.error(this.errorHandler)
			.complete(function() { self.hideWaiting(); });
		
		return this;
	},
	
	/**
	 * @public
	 */
	saveCurrentPage: function(containerBlock) {
		this.savePage(containerBlock, this.options.handle);
		return this;
	},
	
	/**
	 * @public
	 */
	saveAllPages: function(containerBlock) {
		this.savePage(containerBlock, 'default');
		return this;
	},
	
	removePage: function(containerBlock, handle) {
		var self = this;
		
		this.showWaiting();
		$.post(EM_LayoutUpdate.BASE_URL + 'layoutupdate/adminhtml_block/remove', {
				handle: handle,
				area: this.options.area,
				package: this.options.package,
				theme: this.options.theme,
				parentBlocks: [containerBlock],
				form_key: EM_LayoutUpdate.FORM_KEY
			}, this.successHandler)
			.error(this.errorHandler)
			.complete(function() { self.hideWaiting(); });
		return this;
	},
	
	removeCurrentPage: function(containerBlock) {
		this.removePage(containerBlock, this.options.handle);
		return this;
	},
	
	removeAllPages: function(containerBlock) {
		this.removePage(containerBlock, 'default');
		return this;
	},
	
	/** @protected */
	successHandler: function(html) {
		if (html == 'DONE') 
			alert("Saved");
		else if (html.indexOf('loginForm'))
			alert("ERROR: Your admin session was timeout. Please login to the admin backend and try again.");
	},
	
	/** @protected */
	errorHandler: function() {
		alert("ERROR: Connection Failed");
	}
};


$(function() {
	EM_LayoutUpdate.LayoutEditor.init();
});

})();