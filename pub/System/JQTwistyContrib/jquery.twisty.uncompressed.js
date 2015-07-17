/**
 * @preserve
 * jquery.twisty 1.20
 * http://foswiki.org/Extensions/JQTwistyContrib
 *
 * Copyright (c) 2012-2015 Michael Daum http://michaeldaumconsulting.com
 * Dual licensed under the MIT and GPL licenses, located in
 * MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
 *
 */
(function($) {

  var pluginName = 'jqTwisty',
      defaults = {
        openText: null,
        closeText: null,
        openImg : null,
        closeImg : null,
        initialState: 'close',
        target: null
      };

  function Plugin(element, options) {
    var self = this;

    self.element = $(element);
    self._name = pluginName;
    self._defaults = defaults;
    self.options = $.extend( {}, defaults, self.element.data(), options) ; 

    if (element.childNodes[0].nodeType == 3) { // a flat text node
      self.options.openText = self.options.openText || self.element.text();
    }
    self.options.closeText = self.options.closeText || self.options.openText;
    self.options.closeImg = self.options.closeImg || self.options.openImg;

    self.init();
  }

  Plugin.prototype.init = function() {
    var self = this;

    self.target = self.options.target?$(self.options.target):self.element.next();
    self.target.addClass("jqTwistyContainer");
    
    self.setState(self.options.initialState, true);

    self.element.click(function() {
      if (self.state === 'open') {
        self.setState('close');
      } else {
        self.setState('open');
      }
      return false;
    });

    self.element.hover(function() {
        self.element.addClass("jqTwistyHover");
      }, function() {
        self.element.removeClass("jqTwistyHover");
    });

    self.element.bind("close.twisty", function() {
      self.close();
    });

    self.element.bind("open.twisty", function() {
      self.open();
    });

    self.element.trigger("inited.twisty");
  };

  Plugin.prototype.setState = function(state, immediate) {
    var self = this;

    if (state === 'open') self.state = state;
    if (state === 'close') self.state = state;

    if (self.state === 'open') {
      self.open(immediate);
    } else {
      self.close(immediate);
    }
  };

  Plugin.prototype.open = function(immediate) {
    var self = this, html = '';

    self.state = 'open';

    if (self.options.openImg) {
      html = '<img src="'+self.options.openImg+'" /> ';
    }
    if (self.options.closeText) {
      html += self.options.closeText;
    }
    if (html) {
      self.element.html(html);
    }

    if (immediate) {
      self.target.show();
      self.element.removeClass("jqTwistyClosed");
    } else {
      self.openAnimation();
    }
  };

  Plugin.prototype.close = function(immediate) {
    var self = this, html = '';

    self.state = 'close';
    if (self.options.closeImg) {
      html = '<img src="'+self.options.closeImg+'" /> ';
    }
    if (self.options.openText) {
      html += self.options.openText;
    }
    if (html) {
      self.element.html(html);
    }

    if (immediate) {
      self.target.hide();
      self.element.addClass("jqTwistyClosed");
    } else {
      self.closeAnimation();
    }
  };

  Plugin.prototype.openAnimation = function() {
    var self = this;

    self.element.trigger("beforeOpen.twisty");

    return self.target.animate({
      height:'show',
      opacity:'show'
    }, 
    'fast', 
    self.options.easing,
    function() {
      self.element.removeClass("jqTwistyClosed");
      self.element.trigger("afterOpen.twisty");
    });
  };

  Plugin.prototype.closeAnimation = function() {
    var self = this;

    self.element.trigger("beforeClose.twisty");

    return self.target.animate({
      height:'hide',
      opacity:'hide'
    }, 
    'fast', 
    self.options.easing,
    function() {
      self.element.addClass("jqTwistyClosed");
      self.element.trigger("afterClose.twisty");
    });
  };

  Plugin.prototype.state = 'close';

  $.fn[pluginName] = function(options) { 
    return this.each(function () { 
      if (!$.data(this, 'plugin_' + pluginName)) { 
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options)); 
      } 
    });
  }; 

  $(".jqTwisty").livequery(function() {
    $(this).addClass("jqTwistyInited").jqTwisty();
  });

})(jQuery);
