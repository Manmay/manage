!function(a,b,c){function f(d,f){this.elem=d,this.$elem=a(d),this.options=a.extend({},e,f),this._defaults=e,this.$win=a(b),this.$body=a("body"),this.$sectionContainer=a(this.options.sectionContainer),this.$parent=this.$elem.parent(),this.labels=this.$elem.find("dt").map(function(){return a(this).text()}).get(),this.dataset=this.$elem.find("dd").map(function(){return parseInt(a(this).text(),10)}).get(),this.itemMinWidth=this.options.labelWidth+(this.options.symbolFontSize+this.options.symbolPaddingLeft+this.options.symbolPaddingRight)*Math.max.apply(null,this.dataset);var g=this;this.colorRange=this.$elem.find("dt").map(function(){var b=a(this),d=b.data("color");return(d===c||""===d)&&(d=g.options.defaultColor),d}).get(),this.scrollTopTrigger=this.$elem.parents("section").position().top-this.options.scrollTopOffset,this.hasDrawn=!1,this.checkPropOverride(),this.init()}var e=(b.document,{progressChartItemClass:"progress-chart-item",progressChartItemLabelClass:"progress-chart-label",labelFontSize:12,labelFontWeight:700,labelFontColor:"#666",labelPaddingLeft:0,labelPaddingRight:10,labelWidth:60,symbolFontAwesomeClass:"fa-stop",symbolFontSize:14,symbolPaddingLeft:2,symbolPaddingRight:2,itemHeight:20,defaultColor:"black",animationDuration:1200,scrollTopOffset:200,onScrollAnimation:!0,sectionContainer:".section-container"});f.prototype.init=function(){var a=this;this.$elem.hide(),this.$parent.css({"min-height":this.$parent.height()+this.options.itemHeight*this.dataset.length}),this.$win.on("resize",function(){a.hasDrawn&&a.draw(0)}),this.options.onScrollAnimation===!0&&this.$sectionContainer.on("scroll",function(){a.$sectionContainer.scrollTop()>a.scrollTopTrigger&&a.hasDrawn===!1&&(a.draw(a.options.animationDuration),a.hasDrawn=!0)}),this.options.onScrollAnimation===!0?this.$win.on("load",function(){a.$sectionContainer.scrollTop()>a.scrollTopTrigger&&a.hasDrawn===!1&&(a.draw(a.options.animationDuration),a.hasDrawn=!0)}):this.draw(0)},f.prototype.checkPropOverride=function(){this.$elem.data("symbol-font-awesome-class")!==c&&(this.options.symbolFontAwesomeClass=this.$elem.data("symbol-font-awesome-class"))},f.prototype.draw=function(b){var c=this;this.$parent.find("."+this.options.progressChartItemClass).remove(),a.each(this.labels,function(b,d){var e,f=a("<i/>").addClass("fa").addClass(c.options.symbolFontAwesomeClass);for($progressItemHtml=a("<div/>").addClass(c.options.progressChartItemClass),a("<span/>").addClass(c.options.progressChartItemLabelClass).html(d).appendTo($progressItemHtml),e=0;e<c.dataset[b];e++)f.clone().appendTo($progressItemHtml);$progressItemHtml.css({height:c.options.itemHeight+"px",lineHeight:c.options.itemHeight+"px",minWidth:c.itemMinWidth}).find("i.fa").css({color:c.colorRange[b],paddingLeft:c.options.symbolPaddingLeft,paddingRight:c.options.symbolPaddingRight,opacity:0}).end().find("."+c.options.progressChartItemLabelClass).css({display:"inline-block",fontSize:c.options.labelFontSize,fontWeight:c.options.labelFontWeight,color:c.options.labelFontColor,paddingLeft:c.options.labelPaddingLeft,paddingRight:c.options.labelPaddingRight,width:c.options.labelWidth+"px"}),$progressItemHtml.appendTo(c.$parent)});var d=a("."+this.options.progressChartItemClass),e=0,f=Math.max.apply(null,this.dataset),g=b/f,h=setInterval(function(){e>f?clearInterval(h):(d.find("i.fa:nth-child("+(e+1)+")").css({opacity:1}),e++)},g)},a.fn.progressChart=function(b){return this.each(function(){a.data(this,"plugin_progress_chart")||a.data(this,"plugin_progress_chart",new f(this,b))})}}(jQuery,window);