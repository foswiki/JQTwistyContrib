/**
 * @preserve
 * jquery.twisty 4.01
 * http://foswiki.org/Extensions/JQTwistyContrib
 *
 * Copyright (c) 2012-2025 Michael Daum http://michaeldaumconsulting.com
 * Licensed under the GPL licenses
 */
"use strict";
(function($) {

  var globalTwistyCounter = 0,
      defaults = {
        openText: null,
        closeText: null,
        openImg : null,
        closeImg : null,
        openIcon : null,
        closeIcon : null,
        remember: false,
        initialState: null,
        easing: 'swing',
        target: null
      };

  function Twisty(element, opts) {
    var self = this;

    self.element = $(element);
    self.state = 'close';
    self.opts = $.extend( {}, defaults, self.element.data(), opts) ; 

    if (element.childNodes[0].nodeType == 3) { // a flat text node
      self.opts.openText = self.opts.openText || self.element.text();
    }
    self.opts.closeText = self.opts.closeText || self.opts.openText;
    self.opts.closeImg = self.opts.closeImg || self.opts.openImg;
    self.opts.closeIcon = self.opts.closeIcon || self.opts.openIcon;

    self.init();
  }

  Twisty.prototype.init = function() {
    var self = this, 
        state = self.opts.initialState,
        key = self.getStorageKey();

    self.target = self.opts.target?$(self.opts.target):self.element.next();
    self.target.addClass("jqTwistyContainer");
    self.getId();

    if (self.opts.remember) {
      state = self.fetchState();
    }

    state = state || 'close';
    self.setState(state, true);

    self.element.on("click", function() {
      if (self.state === 'open') {
        self.setState('close');
      } else {
        self.setState('open');
      }
      return false;
    });

    self.element.on("mouseenter", function() {
      self.element.addClass("jqTwistyHover");
    }).on("mouseleave", function() {
      self.element.removeClass("jqTwistyHover");
    });

    self.element.on("close.twisty", function() {
      self.close();
    });

    self.element.on("open.twisty", function() {
      self.open();
    });

    self.element.trigger("inited.twisty");
  };

  Twisty.prototype.fetchState = function() {
    var self = this;

    return sessionStorage.getItem(self.getStorageKey());
  };

  Twisty.prototype.storeState = function() {
    var self = this;

    sessionStorage.setItem(self.getStorageKey(), self.state);
  };

  Twisty.prototype.getStorageKey = function() {
    var self = this;

    if (!self.storageKey) {
      self.storageKey = foswiki.getPreference("WEB") + "/" + foswiki.getPreference("TOPIC") + "_" + self.getId();
    }
 
    return self.storageKey;
  };

  Twisty.prototype.getId = function() {
    var self = this, 
      id = self.id || self.element.attr("id");

    if (!id) {
      id = self.id = 'jqTwisty'+globalTwistyCounter++;
      self.element.attr("id", id);
    }

    return id;
  };

  Twisty.prototype.setState = function(state, immediate) {
    var self = this;

    self.state = state;

    if (self.opts.remember) {
      self.storeState();
    }

    if (self.state === 'open') {
      self.open(immediate);
    } else {
      self.close(immediate);
    }
  };

  Twisty.prototype.open = function(immediate) {
    var self = this, html = '';

    self.state = 'open';

    if (self.opts.openImg) {
      html = '<img src="'+self.opts.openImg+'" /> ';
    }

    if (self.opts.openIcon) {
      html = '<i class="fa fa-fw '+ self.opts.openIcon +'" ></i> ';
    }

    if (self.opts.closeText) {
      html += self.opts.closeText;
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

  Twisty.prototype.close = function(immediate) {
    var self = this, html = '';

    self.state = 'close';

    if (self.opts.closeImg) {
      html = '<img src="'+self.opts.closeImg+'" /> ';
    }
    
    if (self.opts.closeIcon) {
      html = '<i class="fa fa-fw '+ self.opts.closeIcon +'" ></i> ';
    }

    if (self.opts.openText) {
      html += self.opts.openText;
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

  Twisty.prototype.openAnimation = function() {
    var self = this;

    self.element.trigger("beforeOpen.twisty");

    return self.target.animate({
      height:'show',
      opacity:'show'
    }, 
    'fast', 
    self.opts.easing,
    function() {
      self.element.removeClass("jqTwistyClosed");
      self.element.trigger("afterOpen.twisty");
    });
  };

  Twisty.prototype.closeAnimation = function() {
    var self = this;

    self.element.trigger("beforeClose.twisty");

    return self.target.animate({
      height:'hide',
      opacity:'hide'
    }, 
    'fast', 
    self.opts.easing,
    function() {
      self.element.addClass("jqTwistyClosed");
      self.element.trigger("afterClose.twisty");
    });
  };

  $.fn.jqTwisty = function(opts) { 
    return this.each(function () { 
      if (!$.data(this, 'jqTwisty')) { 
        $.data(this, 'jqTwisty', new Twisty(this, opts)); 
      } 
    });
  }; 

  $(".jqTwisty").livequery(function() {
    $(this).addClass("jqTwistyInited").jqTwisty();
  });

})(jQuery);
