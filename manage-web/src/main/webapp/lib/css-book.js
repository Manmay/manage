!function(a,b,c){function f(c,d){this.elem=c,this.$elem=a(c),this.$img=this.$elem.find("img"),this.$caption=this.$elem.find("figcaption"),this.options=a.extend({},e,d),this.$win=a(b),this.opened=!1,this._defaults=e,this.checkPropOverride(),this.checkBookTransformPreset(),this.init()}var e=(b.document,{disable3dStyle:!1,bookTransformPreset:1,pageOffset:6,thickness:30,topFaceBgColor:"#f6f6f6",bottomFaceBgColor:"#f6f6f6",rightFaceBgColor:"#fdfdfd",leftFaceBgColor:"#ccc",frontFaceBgColor:"coral",backFaceBgColor:"#ddd",frontInnerFaceBgColor:"#fdfdfd",bookInitialTransform:"translateZ(-100px) rotateY(-30deg)",bookHoverTransform:"translateZ(0) rotateY(0deg) rotateX(0deg)",frontFaceInitialTransform:"rotateY(0deg)",frontFaceHoverTransform:"rotateY(-180deg)"});f.prototype.init=function(){var b=this,c=a("<div />").css("transform-style","preserve-3d");this.options.disable3dStyle!==!0&&"preserve-3d"===c.css("transform-style")?(this.$img.hide(),this.$caption.hide(),this.drawBook(),this.$win.on("resize",function(){b.drawBook()})):this.$elem.addClass("flat")},f.prototype.drawBook=function(){var c=this;this.$elem.find(".bookWrapper").remove();var d=['<div class="bookWrapper">','<div class="book">','<div class="face front"><div class="backface"></div></div>','<div class="face front-inner"></div>','<div class="face right"></div>','<div class="face back"></div>','<div class="face left"></div>','<div class="face top"></div>','<div class="face bottom"></div>',"</div>","</div>"],e=a(d.join("")),f=e.find(".book"),g=this.$img.width(),h=this.$img.height(),i=this.options.pageOffset;bookThickness=this.options.thickness,e.css({width:g,height:h}),e.find(".front, .back").css({width:g,height:h,"margin-top":-h/2,"margin-left":-g/2}),e.find(".front-inner").css({width:g-i,height:h-2*i,"margin-top":-h/2+i,"margin-left":-g/2}),e.find(".top, .bottom").css({width:g-i,height:bookThickness,"margin-top":-bookThickness/2,"margin-left":-g/2}),e.find(".left, .right").css({width:bookThickness,height:h,"margin-top":-h/2,"margin-left":-bookThickness/2}),e.find(".right").css({height:h-2*i,"margin-top":-h/2+i}),this.$img.clone().show().appendTo(e.find(".front")),this.$caption.clone().show().appendTo(e.find(".front-inner")),e.find(".top").css("background-color",this.options.topFaceBgColor),e.find(".bottom").css("background-color",this.options.bottomFaceBgColor),e.find(".right").css("background-color",this.options.rightFaceBgColor),e.find(".left").css("background-color",this.options.leftFaceBgColor),e.find(".front").css("background-color","transparent"),e.find(".front>.backface").css({"background-color":this.options.frontFaceBgColor,border:this.options.pageOffset+"px solid rgba(0,0,0,.05)","border-right":"none"}),e.find(".front-inner").css("background-color",this.options.frontInnerFaceBgColor),e.find(".back").css("background-color",this.options.backFaceBgColor),this.transform(e.find(".front"),"translateZ("+bookThickness/2+"px)"+this.options.frontFaceInitialTransform),this.transform(e.find(".front-inner"),"translateZ("+(bookThickness/2-1)+"px)"),this.transform(e.find(".back"),"rotateY(180deg) translateZ("+bookThickness/2+"px)"),this.transform(e.find(".left"),"rotateY(-90deg) translateZ("+g/2+"px)"),this.transform(e.find(".right"),"rotateY(90deg) translateZ("+(g/2-i)+"px)"),this.transform(e.find(".top"),"rotateX(90deg) translateZ("+(h/2-i)+"px)"),this.transform(e.find(".bottom"),"rotateX(-90deg) translateZ("+(h/2-i)+"px)"),this.transform(f,"translateZ("+-bookThickness/2+"px) "+this.options.bookInitialTransform),e.hover(function(){c.openBook(f)},function(){c.closeBook(f)}),b.Hammer(e.get(0)).on("tap",function(a){"A"!==a.target.tagName&&(c.opened===!1?c.openBook(f):c.closeBook(f))}),this.$elem.append(e)},f.prototype.openBook=function(a){this.transform(a,"translateZ("+-bookThickness/2+"px) "+this.options.bookHoverTransform),this.transform(a.find(".front"),"translateZ("+bookThickness/2+"px) "+this.options.frontFaceHoverTransform),this.opened=!0},f.prototype.closeBook=function(a){this.transform(a," translateZ("+-bookThickness/2+"px) "+this.options.bookInitialTransform),this.transform(a.find(".front"),"translateZ("+bookThickness/2+"px) "+this.options.frontFaceInitialTransform),this.opened=!1},f.prototype.checkPropOverride=function(){var a=this.$elem.data("page-offset"),b=this.$elem.data("thickness"),d=this.$elem.data("top-face-bgColor"),e=this.$elem.data("bottom-face-bgColor"),f=this.$elem.data("right-face-bg-color"),g=this.$elem.data("left-face-bg-color"),h=this.$elem.data("front-face-bg-color"),i=this.$elem.data("back-face-bg-color"),j=this.$elem.data("front-inner-face-bg-color"),k=this.$elem.data("book-initial-transform"),l=this.$elem.data("book-hover-transform"),m=this.$elem.data("front-face-initial-transform"),n=this.$elem.data("front-face-hover-transform");a!==c&&(this.options.pageOffset=a),b!==c&&(this.options.thickness=b),d!==c&&(this.options.topFaceBgColor=d),e!==c&&(this.options.bottomFaceBgColor=e),f!==c&&(this.options.rightFaceBgColor=f),g!==c&&(this.options.leftFaceBgColor=g),h!==c&&(this.options.frontFaceBgColor=h),i!==c&&(this.options.backFaceBgColor=i),j!==c&&(this.options.frontInnerFaceBgColor=j),k!==c&&(this.options.bookInitialTransform=k),l!==c&&(this.options.bookHoverTransform=l),m!==c&&(this.options.frontFaceInitialTransform=m),n!==c&&(this.options.frontFaceHoverTransform=n)},f.prototype.checkBookTransformPreset=function(){switch(this.options.bookTransformPreset){case 1:this.options.bookInitialTransform="translateZ(-100px) rotateY(-30deg)",this.options.bookHoverTransform="translateZ(0) rotateY(0deg) rotateX(0deg)",this.options.frontFaceInitialTransform="rotateY(0deg)",this.options.frontFaceHoverTransform="rotateY(-180deg)";break;case 2:this.options.bookInitialTransform="translateZ(-100px) rotateY(0deg)",this.options.bookHoverTransform="translateZ(0) rotateY(0deg) rotateX(40deg)",this.options.frontFaceInitialTransform="rotateY(0deg)",this.options.frontFaceHoverTransform="rotateY(-180deg)"}},f.prototype.transform=function(a,b){a.css({"-webkit-transform":b,"-moz-transform":b,"-ms-transform":b,"-o-transform":b,transform:b})},a.fn.cssBook=function(b){return this.each(function(){a.data(this,"plugin_css_book")||a.data(this,"plugin_css_book",new f(this,b))})}}(jQuery,window);