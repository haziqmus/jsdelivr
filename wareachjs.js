    <script type="text/javascript">
      const warningTitleCSS = 'color:red; font-size:80px; font-weight: bold; -webkit-text-stroke: 1px black;';
      const warningDescCSS = 'font-size: 18px;';

      console.log('%cStop !!!', warningTitleCSS);
      console.log("%cThis is a browser feature intended for developers. Nothing Awesome Here.", warningDescCSS);
      console.log('%cIf you need install this app on your own server, please reach me on this website: https://haziqmus.com/wareach . FAHAM?', warningDescCSS);
    </script>

    <script>

    /*
    * Template Name: Wareach Template
    * Author: Haziqmus
    * Author URL: https://haziqmus.com
    * Version: 1.1.1
    */

    var PageTransitions = (function ($, options) {
    "use strict";
        var sectionsContainer = $(".animated-sections"),
            isAnimating = false,
            endCurrentPage = true,
            endNextPage = false,
            windowArea = $(window),
            animEndEventNames = {
                'WebkitAnimation'   : 'webkitAnimationEnd',
                'OAnimation'        : 'oAnimationEnd',
                'msAnimation'       : 'MSAnimationEnd',
                'animation'         : 'animationend'
            },

            // animation end event name
            animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],

            // support css animations
            support = Modernizr.cssanimations;

        function init(options) {

            // Get all the .animated-section sections.
            $('.animated-section').each( function() {
                var $page = $(this);
                $page.data('originalClassList', $page.attr('class'));
            });

            // Get all the .pt-wrapper div which is the parent for all pt-div
            sectionsContainer.each( function() {
                if (location.hash === "") {
                    $('section[data-id='+ pageStart +']').addClass('section-active');
                }
            });

            // Adding click event to main menu link
            $('.nav-anim').on("click", function (e) {
                e.preventDefault();
                if (isAnimating) {
                    return false;
                }
                var pageTrigger = $(this);

                activeMenuItem( pageTrigger );

                Animate( pageTrigger );

                location.hash = $(this).attr('href');

            });

            window.onhashchange = function(event) {
                if(location.hash) {
                    if (isAnimating) {
                        return false;
                    }
                    var menuLink = $(menu+' a[href*="'+location.hash.split('/')[0]+'"]');
                    activeMenuItem( menuLink );
                    Animate(menuLink);

                    ajaxLoader();
                }
            };

            var menu = options.menu,
            pageStart = getActiveSection();

            location.hash = pageStart;
            var menuLink = $(menu+' a[href*="'+location.hash.split('/')[0]+'"]');

            activeMenuItem(menuLink);

            Animate(menuLink);

            $('body').append('<div id="page-ajax-loaded" class="page-ajax-loaded animated animated-section-moveFromLeft"></div>');
            ajaxLoader();

            $(".lmpixels-arrow-right").click(function() {
                var activeItem = $('.main-menu a.active').parent("li");
                activeItem.next("li").children("a").click();
                if ( activeItem.is(':last-child') ) {
                    $('.main-menu li:first-child').children("a").click();
                }
            });

            $(".lmpixels-arrow-left").click(function() {
                var activeItem = $('.main-menu a.active').parent("li");
                activeItem.prev("li").children("a").click();
                if ( activeItem.is(':first-child') ) {
                    $('.main-menu li:last-child').children("a").click();
                }
            });
        }

        function getActiveSection() {
            if(location.hash === "") {
                return location.hash = $('section.animated-section').first().attr('data-id');
            }
            else {
                return location.hash;
            }
        }

        function activeMenuItem(item) {
            if ( !item ) {
                return false;
            }

            var navLink = $(item);
            navLink = navLink['0'];
            navLink = $(navLink);

            if(navLink) {
                $('ul.main-menu a').removeClass('active');
                navLink.addClass('active');
            }
        }

        function ajaxLoader() {
            // Check for hash value in URL
            var ajaxLoadedContent = $('#page-ajax-loaded');

            function showContent() {
                ajaxLoadedContent.removeClass('animated-section-moveToRight closed');
                ajaxLoadedContent.show();
                $('body').addClass('ajax-page-visible');
            }

            function hideContent() {
                $('#page-ajax-loaded').addClass('animated-section-moveToRight closed');
                $('body').removeClass('ajax-page-visible');
                setTimeout(function(){
                    $('#page-ajax-loaded.closed').html('');
                    ajaxLoadedContent.hide();
                }, 500);
            }

            var href = $('.ajax-page-load').each(function(){
                href = $(this).attr('href');
                if(location.hash == location.hash.split('/')[0] + '/' + href.substr(0,href.length-5)){
                    var toLoad =  $(this).attr('href');
                    showContent();
                    ajaxLoadedContent.load(toLoad);
                    return false;
                }
            });

            $(document)
                .on("click",".main-menu, #ajax-page-close-button", function (e) { // Hide Ajax Loaded Page on Navigation cleck and Close button
                    e.preventDefault();
                    hideContent();
                    location.hash = location.hash.split('/')[0];
                })
                .on("click",".ajax-page-load", function () { // Show Ajax Loaded Page
                    var hash = location.hash.split('/')[0] + '/' + $(this).attr('href').substr(0,$(this).attr('href').length-5);
                    location.hash = hash;
                    showContent();

                    return false;
                });
        }

        function Animate($pageTrigger, gotoPage) {

            // Checking for 'data-animation' attribute.
            if (!($pageTrigger.attr('data-animation'))) {
                var animNumber = parseInt(Math.floor(Math.random() * 67) + 1);
                $pageTrigger.data('animation',animNumber);
            }

            var animation = $pageTrigger.data('animation').toString(),
                gotoPage, inClass, outClass, selectedAnimNumber;

             // Check if the delimiter '-' is present then create an animation array list.
            if(animation.indexOf('-') != -1) {
                var randomAnimList = animation.split('-');
                selectedAnimNumber = parseInt(randomAnimList[(Math.floor(Math.random() * randomAnimList.length))]);
            }
            else {
                selectedAnimNumber = parseInt(animation);
            }

            // Checking if the animation number is out of bound, max allowed value is 1 to 67.
            if (selectedAnimNumber > 67) {
                alert("Transition.js : Invalid 'data-animation' attribute configuration. Animation number should not be greater than 67");
                return false;
            }

            switch(selectedAnimNumber) {
                case 1:
                    inClass = 'animated-section-moveFromRight';
                    outClass = 'animated-section-moveToLeft';
                    break;
                case 2:
                    inClass = 'animated-section-moveFromLeft';
                    outClass = 'animated-section-moveToRight';
                    break;
                case 3:
                    inClass = 'animated-section-moveFromBottom';
                    outClass = 'animated-section-moveToTop';
                    break;
                case 4:
                    inClass = 'animated-section-moveFromTop';
                    outClass = 'animated-section-moveToBottom';
                    break;
                case 5:
                    inClass = 'animated-section-moveFromRight animated-section-ontop';
                    outClass = 'animated-section-fade';
                    break;
                case 6:
                    inClass = 'animated-section-moveFromLeft animated-section-ontop';
                    outClass = 'animated-section-fade';
                    break;
                case 7:
                    inClass = 'animated-section-moveFromBottom animated-section-ontop';
                    outClass = 'animated-section-fade';
                    break;
                case 8:
                    inClass = 'animated-section-moveFromTop animated-section-ontop';
                    outClass = 'animated-section-fade';
                    break;
                case 9:
                    inClass = 'animated-section-moveFromRightFade';
                    outClass = 'animated-section-moveToLeftFade';
                    break;
                case 10:
                    inClass = 'animated-section-moveFromLeftFade';
                    outClass = 'animated-section-moveToRightFade';
                    break;
                case 11:
                    inClass = 'animated-section-moveFromBottomFade';
                    outClass = 'animated-section-moveToTopFade';
                    break;
                case 12:
                    inClass = 'animated-section-moveFromTopFade';
                    outClass = 'animated-section-moveToBottomFade';
                    break;
                case 13:
                    inClass = 'animated-section-moveFromRight';
                    outClass = 'animated-section-moveToLeftEasing animated-section-ontop';
                    break;
                case 14:
                    inClass = 'animated-section-moveFromLeft';
                    outClass = 'animated-section-moveToRightEasing animated-section-ontop';
                    break;
                case 15:
                    inClass = 'animated-section-moveFromBottom';
                    outClass = 'animated-section-moveToTopEasing animated-section-ontop';
                    break;
                case 16:
                    inClass = 'animated-section-moveFromTop';
                    outClass = 'animated-section-moveToBottomEasing animated-section-ontop';
                    break;
                case 17:
                    inClass = 'animated-section-moveFromRight animated-section-ontop';
                    outClass = 'animated-section-scaleDown';
                    break;
                case 18:
                    inClass = 'animated-section-moveFromLeft animated-section-ontop';
                    outClass = 'animated-section-scaleDown';
                    break;
                case 19:
                    inClass = 'animated-section-moveFromBottom animated-section-ontop';
                    outClass = 'animated-section-scaleDown';
                    break;
                case 20:
                    inClass = 'animated-section-moveFromTop animated-section-ontop';
                    outClass = 'animated-section-scaleDown';
                    break;
                case 21:
                    inClass = 'animated-section-scaleUpDown animated-section-delay300';
                    outClass = 'animated-section-scaleDown';
                    break;
                case 22:
                    inClass = 'animated-section-scaleUp animated-section-delay300';
                    outClass = 'animated-section-scaleDownUp';
                    break;
                case 23:
                    inClass = 'animated-section-scaleUp';
                    outClass = 'animated-section-moveToLeft animated-section-ontop';
                    break;
                case 24:
                    inClass = 'animated-section-scaleUp';
                    outClass = 'animated-section-moveToRight animated-section-ontop';
                    break;
                case 25:
                    inClass = 'animated-section-scaleUp';
                    outClass = 'animated-section-moveToTop animated-section-ontop';
                    break;
                case 26:
                    inClass = 'animated-section-scaleUp';
                    outClass = 'animated-section-moveToBottom animated-section-ontop';
                    break;
                case 27:
                    inClass = 'animated-section-scaleUpCenter animated-section-delay400';
                    outClass = 'animated-section-scaleDownCenter';
                    break;
                case 28:
                    inClass = 'animated-section-moveFromRight animated-section-delay200 animated-section-ontop';
                    outClass = 'animated-section-rotateRightSideFirst';
                    break;
                case 29:
                    inClass = 'animated-section-moveFromLeft animated-section-delay200 animated-section-ontop';
                    outClass = 'animated-section-rotateLeftSideFirst';
                    break;
                case 30:
                    inClass = 'animated-section-moveFromTop animated-section-delay200 animated-section-ontop';
                    outClass = 'animated-section-rotateTopSideFirst';
                    break;
                case 31:
                    inClass = 'animated-section-moveFromBottom animated-section-delay200 animated-section-ontop';
                    outClass = 'animated-section-rotateBottomSideFirst';
                    break;
                case 32:
                    inClass = 'animated-section-flipInLeft animated-section-delay500';
                    outClass = 'animated-section-flipOutRight';
                    break;
                case 33:
                    inClass = 'animated-section-flipInRight animated-section-delay500';
                    outClass = 'animated-section-flipOutLeft';
                    break;
                case 34:
                    inClass = 'animated-section-flipInBottom animated-section-delay500';
                    outClass = 'animated-section-flipOutTop';
                    break;
                case 35:
                    inClass = 'animated-section-flipInTop animated-section-delay500';
                    outClass = 'animated-section-flipOutBottom';
                    break;
                case 36:
                    inClass = 'animated-section-scaleUp';
                    outClass = 'animated-section-rotateFall animated-section-ontop';
                    break;
                case 37:
                    inClass = 'animated-section-rotateInNewspaper animated-section-delay500';
                    outClass = 'animated-section-rotateOutNewspaper';
                    break;
                case 38:
                    inClass = 'animated-section-moveFromRight';
                    outClass = 'animated-section-rotatePushLeft';
                    break;
                case 39:
                    inClass = 'animated-section-moveFromLeft';
                    outClass = 'animated-section-rotatePushRight';
                    break;
                case 40:
                    inClass = 'animated-section-moveFromBottom';
                    outClass = 'animated-section-rotatePushTop';
                    break;
                case 41:
                    inClass = 'animated-section-moveFromTop';
                    outClass = 'animated-section-rotatePushBottom';
                    break;
                case 42:
                    inClass = 'animated-section-rotatePullRight animated-section-delay180';
                    outClass = 'animated-section-rotatePushLeft';
                    break;
                case 43:
                    inClass = 'animated-section-rotatePullLeft animated-section-delay180';
                    outClass = 'animated-section-rotatePushRight';
                    break;
                case 44:
                    inClass = 'animated-section-rotatePullBottom animated-section-delay180';
                    outClass = 'animated-section-rotatePushTop';
                    break;
                case 45:
                    inClass = 'animated-section-rotatePullTop animated-section-delay180';
                    outClass = 'animated-section-rotatePushBottom';
                    break;
                case 46:
                    inClass = 'animated-section-moveFromRightFade';
                    outClass = 'animated-section-rotateFoldLeft';
                    break;
                case 47:
                    inClass = 'animated-section-moveFromLeftFade';
                    outClass = 'animated-section-rotateFoldRight';
                    break;
                case 48:
                    inClass = 'animated-section-moveFromBottomFade';
                    outClass = 'animated-section-rotateFoldTop';
                    break;
                case 49:
                    inClass = 'animated-section-moveFromTopFade';
                    outClass = 'animated-section-rotateFoldBottom';
                    break;
                case 50:
                    inClass = 'animated-section-rotateUnfoldLeft';
                    outClass = 'animated-section-moveToRightFade';
                    break;
                case 51:
                    inClass = 'animated-section-rotateUnfoldRight';
                    outClass = 'animated-section-moveToLeftFade';
                    break;
                case 52:
                    inClass = 'animated-section-rotateUnfoldTop';
                    outClass = 'animated-section-moveToBottomFade';
                    break;
                case 53:
                    inClass = 'animated-section-rotateUnfoldBottom';
                    outClass = 'animated-section-moveToTopFade';
                    break;
                case 54:
                    inClass = 'animated-section-rotateRoomLeftIn';
                    outClass = 'animated-section-rotateRoomLeftOut animated-section-ontop';
                    break;
                case 55:
                    inClass = 'animated-section-rotateRoomRightIn';
                    outClass = 'animated-section-rotateRoomRightOut animated-section-ontop';
                    break;
                case 56:
                    inClass = 'animated-section-rotateRoomTopIn';
                    outClass = 'animated-section-rotateRoomTopOut animated-section-ontop';
                    break;
                case 57:
                    inClass = 'animated-section-rotateRoomBottomIn';
                    outClass = 'animated-section-rotateRoomBottomOut animated-section-ontop';
                    break;
                case 58:
                    inClass = 'animated-section-rotateCubeLeftIn';
                    outClass = 'animated-section-rotateCubeLeftOut animated-section-ontop';
                    break;
                case 59:
                    inClass = 'animated-section-rotateCubeRightIn';
                    outClass = 'animated-section-rotateCubeRightOut animated-section-ontop';
                    break;
                case 60:
                    inClass = 'animated-section-rotateCubeTopIn';
                    outClass = 'animated-section-rotateCubeTopOut animated-section-ontop';
                    break;
                case 61:
                    inClass = 'animated-section-rotateCubeBottomIn';
                    outClass = 'animated-section-rotateCubeBottomOut animated-section-ontop';
                    break;
                case 62:
                    inClass = 'animated-section-rotateCarouselLeftIn';
                    outClass = 'animated-section-rotateCarouselLeftOut animated-section-ontop';
                    break;
                case 63:
                    inClass = 'animated-section-rotateCarouselRightIn';
                    outClass = 'animated-section-rotateCarouselRightOut animated-section-ontop';
                    break;
                case 64:
                    inClass = 'animated-section-rotateCarouselTopIn';
                    outClass = 'animated-section-rotateCarouselTopOut animated-section-ontop';
                    break;
                case 65:
                    inClass = 'animated-section-rotateCarouselBottomIn';
                    outClass = 'animated-section-rotateCarouselBottomOut animated-section-ontop';
                    break;
                case 66:
                    inClass = 'animated-section-rotateSidesIn animated-section-delay200';
                    outClass = 'animated-section-rotateSidesOut';
                    break;
                case 67:
                    inClass = 'animated-section-rotateSlideIn';
                    outClass = 'animated-section-rotateSlideOut';
                    break;
            }

            // This will get the nav-anim elements parent wrapper div
            var $pageWrapper = sectionsContainer,
                currentPageId = $pageWrapper.data('current'), tempPageIndex,
                linkhref = $pageTrigger.attr('href').split("#"),
                gotoPage = linkhref[1];

                tempPageIndex = currentPageId;

                // Current page to be removed.
                var $currentPage = $('section[data-id="' + currentPageId + '"]');

                // NEXT PAGE
                currentPageId = gotoPage;

                // Check if the current page is same as the next page then do not do the animation
                // else reset the 'isAnimatiing' flag
                if (tempPageIndex != currentPageId) {
                    isAnimating = true;

                    $pageWrapper.data('current', currentPageId);

                    // Next page to be animated.

                    var $nextPage = $('section[data-id='+currentPageId+']').addClass('section-active');

                    $nextPage.scrollTop(0);

                    $currentPage.addClass(outClass).on(animEndEventName, function() {
                        $currentPage.off(animEndEventName);
                        endCurrentPage = true;
                        if(endNextPage) {
                            onEndAnimation($pageWrapper, $nextPage, $currentPage);
                            endCurrentPage = false;
                        }
                    });

                    $nextPage.addClass(inClass).on(animEndEventName, function() {
                        $nextPage.off(animEndEventName);
                        endNextPage = true;
                        if(endCurrentPage) {
                            onEndAnimation($pageWrapper, $nextPage, $currentPage);
                            endNextPage = false;
                            isAnimating = false;
                        }
                    });

                }
                else {
                    isAnimating = false;
                }


            // Check if the animation is supported by browser and reset the pages.
            if(!support) {
                onEndAnimation($currentPage, $nextPage);
            }

        }

        function onEndAnimation($pageWrapper, $nextPage, $currentPage) {
            resetPage($nextPage, $currentPage);
        }

        function resetPage($nextPage, $currentPage) {
            $currentPage.attr('class', $currentPage.data('originalClassList'));
            $nextPage.attr('class', $nextPage.data('originalClassList') + ' section-active');
        }

        return {
            init : init,
        };

    })(jQuery);

    /*!
     * imagesLoaded PACKAGED v4.1.4
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    
    !function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});


      /*!
       * Validator v0.11.5 for Bootstrap 3, by @1000hz
       * Copyright 2021 HaziqMus
       * Licensed under http://opensource.org/licenses/MIT
       *
       * https://github.com/1000hz/bootstrap-validator
       */

      +function ($) {
        'use strict';

        // VALIDATOR CLASS DEFINITION
        // ==========================

        function getValue($el) {
          return $el.is('[type="checkbox"]') ? $el.prop('checked')                                     :
                 $el.is('[type="radio"]')    ? !!$('[name="' + $el.attr('name') + '"]:checked').length :
                                               $el.val()
        }

        var Validator = function (element, options) {
          this.options    = options
          this.validators = $.extend({}, Validator.VALIDATORS, options.custom)
          this.$element   = $(element)
          this.$btn       = $('button[type="submit"], input[type="submit"]')
                              .filter('[form="' + this.$element.attr('id') + '"]')
                              .add(this.$element.find('input[type="submit"], button[type="submit"]'))

          this.update()

          this.$element.on('input.bs.validator change.bs.validator focusout.bs.validator', $.proxy(this.onInput, this))
          this.$element.on('submit.bs.validator', $.proxy(this.onSubmit, this))
          this.$element.on('reset.bs.validator', $.proxy(this.reset, this))

          this.$element.find('[data-match]').each(function () {
            var $this  = $(this)
            var target = $this.data('match')

            $(target).on('input.bs.validator', function (e) {
              getValue($this) && $this.trigger('input.bs.validator')
            })
          })

          this.$inputs.filter(function () { return getValue($(this)) }).trigger('focusout')

          this.$element.attr('novalidate', true) // disable automatic native validation
          this.toggleSubmit()
        }

        Validator.VERSION = '0.11.5'

        Validator.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)'

        Validator.FOCUS_OFFSET = 20

        Validator.DEFAULTS = {
          delay: 500,
          html: false,
          disable: true,
          focus: true,
          custom: {},
          errors: {
            match: 'Does not match',
            minlength: 'Not long enough'
          },
          feedback: {
            success: 'glyphicon-ok',
            error: 'glyphicon-remove'
          }
        }

        Validator.VALIDATORS = {
          'native': function ($el) {
            var el = $el[0]
            if (el.checkValidity) {
              return !el.checkValidity() && !el.validity.valid && (el.validationMessage || "error!")
            }
          },
          'match': function ($el) {
            var target = $el.data('match')
            return $el.val() !== $(target).val() && Validator.DEFAULTS.errors.match
          },
          'minlength': function ($el) {
            var minlength = $el.data('minlength')
            return $el.val().length < minlength && Validator.DEFAULTS.errors.minlength
          }
        }

        Validator.prototype.update = function () {
          this.$inputs = this.$element.find(Validator.INPUT_SELECTOR)
            .add(this.$element.find('[data-validate="true"]'))
            .not(this.$element.find('[data-validate="false"]'))

          return this
        }

        Validator.prototype.onInput = function (e) {
          var self        = this
          var $el         = $(e.target)
          var deferErrors = e.type !== 'focusout'

          if (!this.$inputs.is($el)) return

          this.validateInput($el, deferErrors).done(function () {
            self.toggleSubmit()
          })
        }

        Validator.prototype.validateInput = function ($el, deferErrors) {
          var value      = getValue($el)
          var prevErrors = $el.data('bs.validator.errors')
          var errors

          if ($el.is('[type="radio"]')) $el = this.$element.find('input[name="' + $el.attr('name') + '"]')

          var e = $.Event('validate.bs.validator', {relatedTarget: $el[0]})
          this.$element.trigger(e)
          if (e.isDefaultPrevented()) return

          var self = this

          return this.runValidators($el).done(function (errors) {
            $el.data('bs.validator.errors', errors)

            errors.length
              ? deferErrors ? self.defer($el, self.showErrors) : self.showErrors($el)
              : self.clearErrors($el)

            if (!prevErrors || errors.toString() !== prevErrors.toString()) {
              e = errors.length
                ? $.Event('invalid.bs.validator', {relatedTarget: $el[0], detail: errors})
                : $.Event('valid.bs.validator', {relatedTarget: $el[0], detail: prevErrors})

              self.$element.trigger(e)
            }

            self.toggleSubmit()

            self.$element.trigger($.Event('validated.bs.validator', {relatedTarget: $el[0]}))
          })
        }


        Validator.prototype.runValidators = function ($el) {
          var errors   = []
          var deferred = $.Deferred()

          $el.data('bs.validator.deferred') && $el.data('bs.validator.deferred').reject()
          $el.data('bs.validator.deferred', deferred)

          function getValidatorSpecificError(key) {
            return $el.data(key + '-error')
          }

          function getValidityStateError() {
            var validity = $el[0].validity
            return validity.typeMismatch    ? $el.data('type-error')
                 : validity.patternMismatch ? $el.data('pattern-error')
                 : validity.stepMismatch    ? $el.data('step-error')
                 : validity.rangeOverflow   ? $el.data('max-error')
                 : validity.rangeUnderflow  ? $el.data('min-error')
                 : validity.valueMissing    ? $el.data('required-error')
                 :                            null
          }

          function getGenericError() {
            return $el.data('error')
          }

          function getErrorMessage(key) {
            return getValidatorSpecificError(key)
                || getValidityStateError()
                || getGenericError()
          }

          $.each(this.validators, $.proxy(function (key, validator) {
            var error = null
            if ((getValue($el) || $el.attr('required')) &&
                ($el.data(key) || key == 'native') &&
                (error = validator.call(this, $el))) {
               error = getErrorMessage(key) || error
              !~errors.indexOf(error) && errors.push(error)
            }
          }, this))

          if (!errors.length && getValue($el) && $el.data('remote')) {
            this.defer($el, function () {
              var data = {}
              data[$el.attr('name')] = getValue($el)
              $.get($el.data('remote'), data)
                .fail(function (jqXHR, textStatus, error) { errors.push(getErrorMessage('remote') || error) })
                .always(function () { deferred.resolve(errors)})
            })
          } else deferred.resolve(errors)

          return deferred.promise()
        }

        Validator.prototype.validate = function () {
          var self = this

          $.when(this.$inputs.map(function (el) {
            return self.validateInput($(this), false)
          })).then(function () {
            self.toggleSubmit()
            self.focusError()
          })

          return this
        }

        Validator.prototype.focusError = function () {
          if (!this.options.focus) return

          var $input = this.$element.find(".has-error:first :input")
          if ($input.length === 0) return

          $('html, body').animate({scrollTop: $input.offset().top - Validator.FOCUS_OFFSET}, 250)
          $input.focus()
        }

        Validator.prototype.showErrors = function ($el) {
          var method = this.options.html ? 'html' : 'text'
          var errors = $el.data('bs.validator.errors')
          var $group = $el.closest('.form-group')
          var $block = $group.find('.help-block.with-errors')
          var $feedback = $group.find('.form-control-feedback')

          if (!errors.length) return

          $block.data('bs.validator.originalContent') === undefined && $block.data('bs.validator.originalContent', $block.html())
          $block.empty().append(errors)
          $group.addClass('has-error has-danger')

          $group.hasClass('has-feedback')
            && $feedback.removeClass(this.options.feedback.success)
            && $feedback.addClass(this.options.feedback.error)
            && $group.removeClass('has-success')
        }

        Validator.prototype.clearErrors = function ($el) {
          var $group = $el.closest('.form-group')
          var $block = $group.find('.help-block.with-errors')
          var $feedback = $group.find('.form-control-feedback')

          $block.html($block.data('bs.validator.originalContent'))
          $group.removeClass('has-error has-danger has-success')

          $group.hasClass('has-feedback')
            && $feedback.removeClass(this.options.feedback.error)
            && $feedback.removeClass(this.options.feedback.success)
            && getValue($el)
            && $feedback.addClass(this.options.feedback.success)
            && $group.addClass('has-success')
        }

        Validator.prototype.hasErrors = function () {
          function fieldErrors() {
            return !!($(this).data('bs.validator.errors') || []).length
          }

          return !!this.$inputs.filter(fieldErrors).length
        }

        Validator.prototype.isIncomplete = function () {
          function fieldIncomplete() {
            var value = getValue($(this))
            return !(typeof value == "string" ? $.trim(value) : value)
          }

          return !!this.$inputs.filter('[required]').filter(fieldIncomplete).length
        }

        Validator.prototype.onSubmit = function (e) {
          this.validate()
          if (this.isIncomplete() || this.hasErrors()) e.preventDefault()
        }

        Validator.prototype.toggleSubmit = function () {
          if (!this.options.disable) return
          this.$btn.toggleClass('disabled', this.isIncomplete() || this.hasErrors())
        }

        Validator.prototype.defer = function ($el, callback) {
          callback = $.proxy(callback, this, $el)
          if (!this.options.delay) return callback()
          window.clearTimeout($el.data('bs.validator.timeout'))
          $el.data('bs.validator.timeout', window.setTimeout(callback, this.options.delay))
        }

        Validator.prototype.reset = function () {
          this.$element.find('.form-control-feedback')
            .removeClass(this.options.feedback.error)
            .removeClass(this.options.feedback.success)

          this.$inputs
            .removeData(['bs.validator.errors', 'bs.validator.deferred'])
            .each(function () {
              var $this = $(this)
              var timeout = $this.data('bs.validator.timeout')
              window.clearTimeout(timeout) && $this.removeData('bs.validator.timeout')
            })

          this.$element.find('.help-block.with-errors')
            .each(function () {
              var $this = $(this)
              var originalContent = $this.data('bs.validator.originalContent')

              $this
                .removeData('bs.validator.originalContent')
                .html(originalContent)
            })

          this.$btn.removeClass('disabled')

          this.$element.find('.has-error, .has-danger, .has-success').removeClass('has-error has-danger has-success')

          return this
        }

        Validator.prototype.destroy = function () {
          this.reset()

          this.$element
            .removeAttr('novalidate')
            .removeData('bs.validator')
            .off('.bs.validator')

          this.$inputs
            .off('.bs.validator')

          this.options    = null
          this.validators = null
          this.$element   = null
          this.$btn       = null

          return this
        }

        // VALIDATOR PLUGIN DEFINITION
        // ===========================


        function Plugin(option) {
          return this.each(function () {
            var $this   = $(this)
            var options = $.extend({}, Validator.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var data    = $this.data('bs.validator')

            if (!data && option == 'destroy') return
            if (!data) $this.data('bs.validator', (data = new Validator(this, options)))
            if (typeof option == 'string') data[option]()
          })
        }

        var old = $.fn.validator

        $.fn.validator             = Plugin
        $.fn.validator.Constructor = Validator


        // VALIDATOR NO CONFLICT
        // =====================

        $.fn.validator.noConflict = function () {
          $.fn.validator = old
          return this
        }


        // VALIDATOR DATA-API
        // ==================

        $(window).on('load', function () {
          $('form[data-toggle="validator"]').each(function () {
            var $form = $(this)
            Plugin.call($form, $form.data())
          })
        })

      }(jQuery);

      /*
      * Template Name: HaziqMus Custom Made
      * Author: HaziqMus
      * Author URL: https://haziqmus.com
      * Version: 1.3.6
      */

      (function($) {
      "use strict";
          // Portfolio subpage filters
          function portfolio_init() {
              var portfolio_grid = $('.portfolio-grid'),
                  portfolio_filter = $('.portfolio-filters');

              if (portfolio_grid) {

                  portfolio_grid.shuffle({
                      speed: 450,
                      itemSelector: 'figure'
                  });

                  portfolio_filter.on("click", ".filter", function (e) {
                      portfolio_grid.shuffle('update');
                      e.preventDefault();
                      $('.portfolio-filters .filter').parent().removeClass('active');
                      $(this).parent().addClass('active');
                      portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
                  });

              }
          }
          // /Portfolio subpage filters


          // Hide Mobile menu
          function mobileMenuHide() {
              var windowWidth = $(window).width(),
                  siteHeader = $('#site_header');

              if (windowWidth < 1025) {
                  siteHeader.addClass('mobile-menu-hide');
                  $('.menu-toggle').removeClass('open');
                  setTimeout(function(){
                      siteHeader.addClass('animate');
                  }, 500);
              } else {
                  siteHeader.removeClass('animate');
              }
          }
          // /Hide Mobile menu

          // Custom scroll
          function customScroll() {
              var windowWidth = $(window).width();
              if (windowWidth > 1024) {
                  $('.animated-section, .single-page-content').each(function() {
                      $(this).perfectScrollbar();
                  });
              } else {
                  $('.animated-section, .single-page-content').each(function() {
                      $(this).perfectScrollbar('destroy');
                  });
              }
          }
          // /Custom scroll

          // Contact form validator
          $(function () {

              $('#contact_form').validator();

              $('#contact_form').on('submit', function (e) {
                  if (!e.isDefaultPrevented()) {
                      var url = "contact_form/contact_form.php";

                      $.ajax({
                          type: "POST",
                          url: url,
                          data: $(this).serialize(),
                          success: function (data)
                          {
                              var messageAlert = 'alert-' + data.type;
                              var messageText = data.message;

                              var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                              if (messageAlert && messageText) {
                                  $('#contact_form').find('.messages').html(alertBox);
                                  $('#contact_form')[0].reset();
                              }
                          }
                      });
                      return false;
                  }
              });
          });
          // /Contact form validator

          //On Window load & Resize
          $(window)
              .on('load', function() { //Load
                  // Animation on Page Loading
                  $(".preloader").fadeOut( 800, "linear" );

                  // initializing page transition.
                  var ptPage = $('.animated-sections');
                  if (ptPage[0]) {
                      PageTransitions.init({
                          menu: 'ul.main-menu',
                      });
                  }
              })
              .on('resize', function() { //Resize
                   mobileMenuHide();
                   $('.animated-section').each(function() {
                      $(this).perfectScrollbar('update');
                  });
                  customScroll();
              });


          // On Document Load
          $(document).on('ready', function() {
              var movementStrength = 23;
              var height = movementStrength / $(document).height();
              var width = movementStrength / $(document).width();
              $("body").on('mousemove', function(e){
                  var pageX = e.pageX - ($(document).width() / 2),
                      pageY = e.pageY - ($(document).height() / 2),
                      newvalueX = width * pageX * -1,
                      newvalueY = height * pageY * -1,
                      elements = $('.lm-animated-bg');

                  elements.addClass('transition');
                  elements.css({
                      "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
                  });

                  setTimeout(function() {
                      elements.removeClass('transition');
                  }, 300);
              })

              // Mobile menu
              $('.menu-toggle').on("click", function () {
                  $('#site_header').addClass('animate');
                  $('#site_header').toggleClass('mobile-menu-hide');
                  $('.menu-toggle').toggleClass('open');
              });

              // Mobile menu hide on main menu item click
              $('.main-menu').on("click", "a", function (e) {
                  mobileMenuHide();
              });

              // Sidebar toggle
              $('.sidebar-toggle').on("click", function () {
                  $('#blog-sidebar').toggleClass('open');
              });

              // Initialize Portfolio grid
              var $portfolio_container = $(".portfolio-grid");
              $portfolio_container.imagesLoaded(function () {
                  portfolio_init(this);
              });

              // Blog grid init
              var $container = $(".blog-masonry");
              $container.imagesLoaded(function(){
                  $container.masonry();
              });

              customScroll();

              // Text rotation
              $('.text-rotation').owlCarousel({
                  loop: true,
                  dots: false,
                  nav: false,
                  margin: 0,
                  items: 1,
                  autoplay: true,
                  autoplayHoverPause: false,
                  autoplayTimeout: 3800,
                  animateOut: 'animated-section-scaleDown',
                  animateIn: 'animated-section-scaleUp'
              });

              // Testimonials Slider
              $(".testimonials.owl-carousel").owlCarousel({
                  nav: true, // Show next/prev buttons.
                  items: 3, // The number of items you want to see on the screen.
                  loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
                  navText: false,
                  autoHeight: true,
                  margin: 25,
                  responsive : {
                      // breakpoint from 0 up
                      0 : {
                          items: 1,
                      },
                      // breakpoint from 480 up
                      480 : {
                          items: 1,
                      },
                      // breakpoint from 768 up
                      768 : {
                          items: 2,
                      },
                      1200 : {
                          items: 2,
                      }
                  }
              });

              // Clients Slider
              $(".clients.owl-carousel").imagesLoaded().owlCarousel({
                  nav: true, // Show next/prev buttons.
                  items: 2, // The number of items you want to see on the screen.
                  loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
                  navText: false,
                  margin: 10,
                  autoHeight: true,
                  responsive : {
                      // breakpoint from 0 up
                      0 : {
                          items: 2,
                      },
                      // breakpoint from 768 up
                      768 : {
                          items: 4,
                      },
                      1200 : {
                          items: 5,
                      }
                  }
              });


              //Form Controls
              $('.form-control')
                  .val('')
                  .on("focusin", function(){
                      $(this).parent('.form-group').addClass('form-group-focus');
                  })
                  .on("focusout", function(){
                      if($(this).val().length === 0) {
                          $(this).parent('.form-group').removeClass('form-group-focus');
                      }
                  });

              // Lightbox init
              $('body').magnificPopup({
                  delegate: 'a.lightbox',
                  type: 'image',
                  removalDelay: 300,

                  // Class that is added to popup wrapper and background
                  // make it unique to apply your CSS animations just to this exact popup
                  mainClass: 'mfp-fade',
                  image: {
                      // options for image content type
                      titleSrc: 'title',
                      gallery: {
                          enabled: true
                      },
                  },

                  iframe: {
                      markup: '<div class="mfp-iframe-scaler">'+
                              '<div class="mfp-close"></div>'+
                              '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                              '<div class="mfp-title mfp-bottom-iframe-title"></div>'+
                            '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                      patterns: {
                          youtube: {
                            index: 'https://youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                            id: null, // String that splits URL in a two parts, second part should be %id%
                            // Or null - full URL will be returned
                            // Or a function that should return %id%, for example:
                            // id: function(url) { return 'parsed id'; }

                            src: '%id%?autoplay=1' // URL that will be set as a source for iframe.
                          },
                          vimeo: {
                            index: 'vimeo.com/',
                            id: '/',
                            src: '//player.vimeo.com/video/%id%?autoplay=1'
                          },
                          gmaps: {
                            index: '//maps.google.',
                            src: '%id%&output=embed'
                          }
                      },

                      srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
                  },

                  callbacks: {
                      markupParse: function(template, values, item) {
                       values.title = item.el.attr('title');
                      }
                  },
              });

          });

      })(jQuery);

    </script>