!function(a,b,c){function f(d,f){this.elem=d,this.$elem=a(d),this.options=a.extend({},e,f),this._defaults=e,this.$win=a(b),this.$body=a("body"),this.$nav=a(this.options.nav),this.$navToggle=a(this.options.navToggle),this.$sectionContainer=a(this.options.sectionContainer),this.$sectionContainerWrapper=a(this.options.sectionContainerWrapper),this.$firstSection=this.$sectionContainer.children().eq(0),this.sectionPosTop=[],this.scrollbarWidth=a.getScrollbarWidth(),this.isIE11Win81=navigator.userAgent.indexOf("Windows NT 6.3")>-1&&navigator.userAgent.indexOf("Trident/7.0")>-1&&navigator.userAgent.indexOf("rv:11.0")>-1,this.isIE2x=b.screen.deviceXDPI!==c&&b.screen.logicalXDPI!==c&&1!==b.screen.deviceXDPI/b.screen.logicalXDPI,this.isIE11Win81Retina=this.isIE11Win81&&this.isIE2x,this.isCSS3=Modernizr.csstransforms3d&&Modernizr.csstransitions&&!this.isIE11Win81Retina,this.init()}var d=b.document,e={nav:"nav",navToggle:".nav-toggle",sectionContainer:".section-container",sectionContainerWrapper:".section-container-wrapper",navPosition:"top",offCanvasAnimation:"rotate-reveal",offCanvasAnimationPerspective:"400px",offCanvasAnimationScaleUpInitScale:.85,offCanvasAnimationRotateRevealAngle:3,offCanvasAnimationFallbackDuration:500,verticalNavWidth:"220px",verticalNavShowIcons:!0,navScrollingAnimationDuration:300,fixFirstSection:!0,fixedSectionClass:"fixed",fixedSectionDummyClass:"dummy"};f.prototype.init=function(){this.offCanvasInit(),this.setupNavToggle(),this.setupNavScrolling(),this.fixFirstSection()},f.prototype.fixFirstSection=function(){if(this.options.fixFirstSection!==!1){var b=this;this.$firstSection.addClass(this.options.fixedSectionClass).css({"max-width":this.$sectionContainer.innerWidth()-this.scrollbarWidth+"px","max-height":this.$sectionContainer.innerHeight()+"px"}),this.$navToggle.css({"max-width":this.$sectionContainer.innerWidth()-this.scrollbarWidth+"px"}),this.$firstSection.after(a("<section />").addClass(this.options.fixedSectionDummyClass).css({width:"100%",height:this.$firstSection.height()+"px","z-index":-9999})),this.$win.on("resize",function(){b.$firstSection.css({"max-width":b.$sectionContainer.innerWidth()-b.scrollbarWidth+"px","max-height":b.$sectionContainer.innerHeight()+"px"}).next("."+b.options.fixedSectionDummyClass).css({height:b.$firstSection.height()+"px"}),b.$navToggle.css({"max-width":b.$sectionContainer.innerWidth()-b.scrollbarWidth+"px"})});var e="onwheel"in d.createElement("div")?"wheel":"mousewheel";this.$sectionContainer.get(0).addEventListener(e,function(a){a.preventDefault();var d="wheel"===e?a.deltaY*(0===a.deltaMode?1:18):a.wheelDeltaY===c?-a.wheelDelta:-a.wheelDeltaY;b.$sectionContainer.scrollTop(b.$sectionContainer.scrollTop()+d)},!1)}},f.prototype.setupNavToggle=function(){var c=this;this.$navToggle.on("click",function(a){a.preventDefault(),c.$sectionContainerWrapper.hasClass("opened")?c.toggleNav():c.options.fixFirstSection&&c.$sectionContainer.scrollTop()>0&&c.$sectionContainer.scrollTop()<c.$firstSection.innerHeight()?c.$sectionContainer.animate({scrollTop:0},c.options.navScrollingAnimationDuration,function(){c.unfixFirstSection(),c.toggleNav()}):(c.unfixFirstSection(),c.toggleNav())}),a(d).on("click",function(a){c.documentClickOrTapHandler(a)}),b.Hammer(d).on("tap",function(a){c.documentClickOrTapHandler(a)})},f.prototype.documentClickOrTapHandler=function(a){this.$nav.hasClass("opened")&&this.$sectionContainerWrapper.hasClass("opened")&&(this.$navToggle.filter(a.target).length>0||this.$navToggle.find(a.target).length>0||this.$nav.filter(a.target).length>0||this.$nav.find(a.target).length>0||this.toggleNav(!0))},f.prototype.unfixFirstSection=function(){this.options.fixFirstSection!==!1&&this.$firstSection.css({position:"relative"}).next("."+this.options.fixedSectionDummyClass).hide()},f.prototype.refixFirstSection=function(){this.options.fixFirstSection!==!1&&this.$firstSection.css({position:"fixed"}).next("."+this.options.fixedSectionDummyClass).show()},f.prototype.offCanvasInit=function(){this.prefixCSS(this.$body,"perspective",this.options.offCanvasAnimationPerspective);var b=this.options.navPosition,c=this.options.offCanvasAnimation;if(this.$nav.removeClass("nav-pos-bottom nav-pos-left nav-pos-right").css("width",""),this.$navToggle.removeClass("nav-pos-bottom nav-pos-left nav-pos-right"),"top"===b)switch(this.prefixCSS(this.$body,"perspective-origin","50% 0"),c){case"push":this.prefixCSS(this.$nav,"transform","translateY(-"+this.$nav.innerHeight()+"px)");break;case"reveal":this.prefixCSS(this.$nav,"transform","none");break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateY(-"+(this.$nav.innerHeight()+1)+"px) "+"rotateX(90deg)"),this.prefixCSS(this.$nav,"transform-origin","50% 100%");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateY(-"+(this.$nav.innerHeight()+1)+"px) "+"rotateX(-90deg)"),this.prefixCSS(this.$nav,"transform-origin","50% 100%");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")"),this.prefixCSS(this.$nav,"transform-origin","50% 0");break;case"rotate-reveal":this.prefixCSS(this.$nav,"transform","none"),this.prefixCSS(this.$sectionContainerWrapper,"transform-origin","50% 0")}else if("bottom"===b)switch(this.$nav.addClass("nav-pos-bottom"),this.$navToggle.addClass("nav-pos-bottom"),this.prefixCSS(this.$body,"perspective-origin","50% 100%"),c){case"push":this.prefixCSS(this.$nav,"transform","translateY("+this.$nav.innerHeight()+"px)");break;case"reveal":this.prefixCSS(this.$nav,"transform","none");break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateY("+(this.$nav.innerHeight()+1)+"px) "+"rotateX(-90deg)"),this.prefixCSS(this.$nav,"transform-origin","50% 0");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateY("+(this.$nav.innerHeight()+1)+"px) "+"rotateX(90deg)"),this.prefixCSS(this.$nav,"transform-origin","50% 0");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")"),this.prefixCSS(this.$nav,"transform-origin","50% 100%");break;case"rotate-reveal":this.prefixCSS(this.$nav,"transform","none"),this.prefixCSS(this.$sectionContainerWrapper,"transform-origin","50% 100%")}else if("left"===b)switch(this.$nav.addClass("nav-pos-left"),this.$navToggle.addClass("nav-pos-left"),this.$nav.css({width:this.options.verticalNavWidth}),this.options.verticalNavShowIcons===!1&&this.$nav.find(".menu i.fa").hide(),this.prefixCSS(this.$body,"perspective-origin","0 50%"),c){case"push":this.prefixCSS(this.$nav,"transform","translateX(-"+this.options.verticalNavWidth+")");break;case"reveal":this.prefixCSS(this.$nav,"transform","none");break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateX(-"+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(-90deg)"),this.prefixCSS(this.$nav,"transform-origin","100% 50%");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateX(-"+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(90deg)"),this.prefixCSS(this.$nav,"transform-origin","100% 50%");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")"),this.prefixCSS(this.$nav,"transform-origin","0 50%");break;case"rotate-reveal":this.prefixCSS(this.$nav,"transform","none"),this.prefixCSS(this.$sectionContainerWrapper,"transform-origin","0 50%")}else if("right"===b)switch(this.$nav.addClass("nav-pos-right"),this.$navToggle.addClass("nav-pos-right"),this.$nav.css({width:this.options.verticalNavWidth}),this.options.verticalNavShowIcons===!1&&this.$nav.find(".menu i.fa").hide(),this.prefixCSS(this.$body,"perspective-origin","100% 50%"),c){case"push":this.prefixCSS(this.$nav,"transform","translateX("+this.options.verticalNavWidth+")");break;case"reveal":this.prefixCSS(this.$nav,"transform","none");break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateX("+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(90deg)"),this.prefixCSS(this.$nav,"transform-origin","0 50%");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateX("+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(-90deg)"),this.prefixCSS(this.$nav,"transform-origin","0 50%");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")"),this.prefixCSS(this.$nav,"transform-origin","100% 50%");break;case"rotate-reveal":this.prefixCSS(this.$nav,"transform","none"),this.prefixCSS(this.$sectionContainerWrapper,"transform-origin","100% 50%")}var d=this;this.isCSS3&&this.$sectionContainerWrapper.on("webkitTransitionEnd otransitionend oTransitionEnd transitionend",function(){var c=a(this);d.options.fixFirstSection&&!c.hasClass("opened")&&d.refixFirstSection()}),this.isCSS3||this.$sectionContainerWrapper.addClass("no-transition")},f.prototype.toggleNav=function(a){var b=this,c=this.options.navPosition,d=this.options.offCanvasAnimation;if(this.$nav.hasClass("opened")&&this.$sectionContainerWrapper.hasClass("opened")){if("top"===c)if(this.isCSS3){switch(d){case"push":this.prefixCSS(this.$nav,"transform","translateY(-"+this.$nav.innerHeight()+"px)");break;case"reveal":case"rotate-reveal":break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateY(-"+(this.$nav.innerHeight()+1)+"px) "+"rotateX(90deg)");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateY(-"+(this.$nav.innerHeight()+1)+"px) "+"rotateX(-90deg)");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")")}this.prefixCSS(this.$sectionContainerWrapper,"transform","none")}else this.$navToggle.animate({top:"-="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$sectionContainerWrapper.animate({top:"-="+this.$nav.innerHeight()+"px",bottom:"+="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration,function(){b.options.fixFirstSection&&(b.$navToggle.css("top",""),b.refixFirstSection())});else if("bottom"===c)if(this.isCSS3){switch(d){case"push":this.prefixCSS(this.$nav,"transform","translateY("+this.$nav.innerHeight()+"px)");break;case"reveal":case"rotate-reveal":break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateY("+(this.$nav.innerHeight()+1)+"px) "+"rotateX(-90deg)");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateY("+(this.$nav.innerHeight()+1)+"px) "+"rotateX(90deg)");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")")}this.prefixCSS(this.$sectionContainerWrapper,"transform","none")}else this.$navToggle.animate({bottom:"-="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$sectionContainerWrapper.animate({top:"+="+this.$nav.innerHeight()+"px",bottom:"-="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration,function(){b.options.fixFirstSection&&(b.$navToggle.css("bottom",""),b.refixFirstSection())});else if("left"===c)if(this.isCSS3){switch(d){case"push":this.prefixCSS(this.$nav,"transform","translateX(-"+this.options.verticalNavWidth+")");break;case"reveal":case"rotate-reveal":break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateX(-"+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(-90deg)");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateX(-"+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(90deg)");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")")}this.prefixCSS(this.$sectionContainerWrapper,"transform","none")}else this.$navToggle.animate({left:"-="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$sectionContainerWrapper.animate({left:"-="+this.$nav.innerWidth()+"px",right:"+="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration,function(){b.options.fixFirstSection&&(b.$navToggle.css("left",""),b.refixFirstSection())});else if("right"===c)if(this.isCSS3)switch(d){case"push":this.prefixCSS(this.$nav,"transform","translateX("+this.options.verticalNavWidth+")");break;case"reveal":case"rotate-reveal":break;case"rotate-in":this.prefixCSS(this.$nav,"transform","translateX("+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(90deg)");break;case"rotate-out":this.prefixCSS(this.$nav,"transform","translateX("+(parseInt(this.options.verticalNavWidth,10)+1)+"px) "+"rotateY(-90deg)");break;case"scale-up":this.prefixCSS(this.$nav,"transform","scale("+this.options.offCanvasAnimationScaleUpInitScale+")")}else this.$navToggle.animate({right:"-="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$sectionContainerWrapper.animate({left:"+="+this.$nav.innerWidth()+"px",right:"-="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration,function(){b.options.fixFirstSection&&(b.$navToggle.css("right",""),b.refixFirstSection())});this.prefixCSS(this.$navToggle,"transform","none"),this.prefixCSS(this.$sectionContainerWrapper,"transform","none"),this.$nav.removeClass("opened"),this.$sectionContainerWrapper.removeClass("opened")}else if(a!==!0){if(this.computeSectionPosTop(),this.$nav.addClass("opened"),this.$sectionContainerWrapper.addClass("opened"),"top"===c)if(this.isCSS3)switch(d){case"push":case"reveal":case"rotate-in":case"rotate-out":case"scale-up":case"rotate-reveal":this.prefixCSS(this.$navToggle,"transform","translateY("+this.$nav.innerHeight()+"px)"),"rotate-reveal"!==d?this.prefixCSS(this.$sectionContainerWrapper,"transform","translateY("+this.$nav.innerHeight()+"px) rotateX(0deg)"):this.prefixCSS(this.$sectionContainerWrapper,"transform","translateY("+this.$nav.innerHeight()+"px) rotateX(-"+this.options.offCanvasAnimationRotateRevealAngle+"deg)")}else this.$sectionContainerWrapper.animate({top:"+="+this.$nav.innerHeight()+"px",bottom:"-="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$navToggle.animate({top:"+="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration);else if("bottom"===c)if(this.isCSS3)switch(d){case"push":case"reveal":case"rotate-in":case"rotate-out":case"scale-up":case"rotate-reveal":this.prefixCSS(this.$navToggle,"transform","translateY(-"+this.$nav.innerHeight()+"px)"),"rotate-reveal"!==d?this.prefixCSS(this.$sectionContainerWrapper,"transform","translateY(-"+this.$nav.innerHeight()+"px) rotateX(0deg)"):this.prefixCSS(this.$sectionContainerWrapper,"transform","translateY(-"+this.$nav.innerHeight()+"px) rotateX("+this.options.offCanvasAnimationRotateRevealAngle+"deg)")}else this.$sectionContainerWrapper.animate({top:"-="+this.$nav.innerHeight()+"px",bottom:"+="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$navToggle.animate({bottom:"+="+this.$nav.innerHeight()+"px"},this.options.offCanvasAnimationFallbackDuration);else if("left"===c)if(this.isCSS3)switch(d){case"push":case"reveal":case"rotate-in":case"rotate-out":case"scale-up":case"rotate-reveal":this.prefixCSS(this.$navToggle,"transform","translateX("+this.options.verticalNavWidth+")"),"rotate-reveal"!==d?this.prefixCSS(this.$sectionContainerWrapper,"transform","translateX("+this.options.verticalNavWidth+") rotateY(0deg)"):this.prefixCSS(this.$sectionContainerWrapper,"transform","translateX("+this.options.verticalNavWidth+") rotateY("+this.options.offCanvasAnimationRotateRevealAngle+"deg)")}else this.$sectionContainerWrapper.animate({left:"+="+this.$nav.innerWidth()+"px",right:"-="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$navToggle.animate({left:"+="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration);else if("right"===c)if(this.isCSS3)switch(d){case"push":case"reveal":case"rotate-in":case"rotate-out":case"scale-up":case"rotate-reveal":this.prefixCSS(this.$navToggle,"transform","translateX(-"+this.options.verticalNavWidth+")"),"rotate-reveal"!==d?this.prefixCSS(this.$sectionContainerWrapper,"transform","translateX(-"+this.options.verticalNavWidth+") rotateY(0deg)"):this.prefixCSS(this.$sectionContainerWrapper,"transform","translateX(-"+this.options.verticalNavWidth+") rotateY(-"+this.options.offCanvasAnimationRotateRevealAngle+"deg)")}else this.$sectionContainerWrapper.animate({left:"-="+this.$nav.innerWidth()+"px",right:"+="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration),this.$navToggle.animate({right:"+="+this.$nav.innerWidth()+"px"},this.options.offCanvasAnimationFallbackDuration);this.prefixCSS(this.$nav,"transform","none")}},f.prototype.prefixCSS=function(a,b,c){var d={};d["-webkit-"+b]=c,d["-moz-"+b]=c,d["-ms-"+b]=c,d["-o-"+b]=c,d[b]=c,a.css(d)},f.prototype.setupNavScrolling=function(){var b=this;this.$nav.find(".menu a").on("click",function(c){if(""!==this.hash&&-1!==a(this.hash).index()){c.preventDefault();var d=a(this),e=b.sectionPosTop[b.$sectionContainer.children().not("."+b.options.fixedSectionDummyClass).not(".hidden").index(a(this.hash))];b.$sectionContainer.animate({scrollTop:e},b.options.navScrollingAnimationDuration),d.parent().addClass("active").siblings().removeClass("active")}})},f.prototype.computeSectionPosTop=function(){var b=this.$sectionContainer.children().not("."+this.options.fixedSectionDummyClass).eq(0).position().top,c=a.map(this.$sectionContainer.find("section").not("."+this.options.fixedSectionDummyClass).not(".hidden"),function(b){var d=a(b);return{top:d.position().top,hash:d.attr("id")}}),d=a.map(c,function(a){return Math.abs(a.top)});this.sectionPosTop=a.map(c,function(a){return a.top-b});var e=Math.min.apply(Math,d),f=d.indexOf(e);c[f].top>0&&e/this.$win.height()>.5&&f--,this.$nav.find(".menu li").not(".hidden").removeClass("active").each(function(b,d){var e=a(d),g=e.find("a").get(0).hash;g==="#"+c[f].hash&&e.addClass("active")})},a.fn.setup=function(b){return this.each(function(){a.data(this,"plugin_setup")||a.data(this,"plugin_setup",new f(this,b))})}}(jQuery,window);