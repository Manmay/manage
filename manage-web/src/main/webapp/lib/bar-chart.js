!function(a,b,c,d){function g(e,g){this.elem=e,this.$elem=a(e),this.$parent=this.$elem.parent(),this.options=a.extend({},f,g),this._defaults=f,this.$win=a(c),this.$body=a("body"),this.$sectionContainer=a(this.options.sectionContainer),this.barVerticalOffsetUnit=this.options.barHeight+this.options.barVerticalSpacing,this.barFullWidth=this.$parent.width()-this.options.paddingLeft-this.options.paddingRight,this.labelVerticalOffset=(this.options.barHeight-this.options.labelHeight)/2,this.scrollTopTrigger=this.$elem.parents("section").position().top-this.options.scrollTopOffset,this.labels=this.$elem.find("dt").map(function(){return a(this).text()}).get(),this.dataset=this.$elem.find("dd").map(function(){return a(this).text()}).get();var h=this;this.colorRange=this.$elem.find("dt").map(function(){var b=a(this),c=b.data("color");return(c===d||""===c)&&(c=h.options.defaultBarFillColor),c}).get(),this.color=b.scale.ordinal().range(this.colorRange),this.svg=null,this.bars=null,this.labelItemGroup=null,this.labelPercentGroup=null,this.hasDrawn=!1,this.checkPropOverride(),this.init()}var f=(c.document,{paddingLeft:0,paddingRight:0,barHeight:26,barClassName:"bar-chart-bar",labelClassName:"bar-chart-label",labelFontSize:12,labelFontWeight:400,labelFontColor:"#666666",labelHeight:12,labelPaddingLeft:10,labelPaddingRight:10,barVerticalSpacing:3,barStrokeWidth:0,barStrokeColor:"#ffffff",defaultBarFillColor:"#ffe0ba",initialPercent:0,animationDuration:1200,scrollTopOffset:200,onScrollAnimation:!0,sectionContainer:".section-container"});g.prototype.checkPropOverride=function(){this.$elem.data("label-font-color")!==d&&(this.options.labelFontColor=this.$elem.data("label-font-color"))},g.prototype.init=function(){var a=this;this.$elem.hide(),this.svg=b.select(this.$parent.get(0)).insert("svg","#"+this.$elem.prop("id")),this.bars=this.svg.selectAll("rect").data(this.dataset).enter().append("rect").attr({stroke:this.options.barStrokeColor,"stroke-width":this.options.barStrokeWidth,fill:function(b){return a.color(b)},"class":this.options.barClassName,width:this.barFullWidth*this.options.initialPercent/100,height:this.options.barHeight,x:this.options.paddingLeft,y:function(b,c){return a.barVerticalOffsetUnit*c}}),this.labelItemGroup=this.svg.append("g").attr("id","label-Items"),this.labelPercentGroup=this.svg.append("g").attr("id","label-percent"),this.labelItemGroup.selectAll("text").data(this.labels).enter().append("text").attr({x:this.options.paddingLeft+this.options.labelPaddingLeft,y:function(b,c){return a.barVerticalOffsetUnit*(c+1)-a.options.barVerticalSpacing-a.labelVerticalOffset},"font-size":this.options.labelFontSize,"font-weight":"bold",fill:a.options.labelFontColor,opacity:0,"class":this.options.labelClassName}).text(function(a){return a}),this.labelPercentGroup.selectAll("text").data(this.dataset).enter().append("text").attr({x:function(b){return a.barFullWidth*b/100-a.options.labelPaddingRight+a.options.paddingLeft},y:function(b,c){return a.barVerticalOffsetUnit*(c+1)-a.options.barVerticalSpacing-a.labelVerticalOffset},"font-size":this.options.labelFontSize,"font-weight":this.options.labelFontWeight,"text-anchor":"end",fill:a.options.labelFontColor,opacity:0,"class":this.options.labelClassName}).text(function(a){return a+"%"}),this.resizeCanvas(),this.$win.on("resize",function(){a.hasDrawn&&a.draw(0)}),this.options.onScrollAnimation===!0&&this.$sectionContainer.on("scroll",function(){a.$sectionContainer.scrollTop()>a.scrollTopTrigger&&a.hasDrawn===!1&&(a.draw(a.options.animationDuration),a.hasDrawn=!0)}),this.options.onScrollAnimation===!0?this.$win.on("load",function(){a.$sectionContainer.scrollTop()>a.scrollTopTrigger&&a.hasDrawn===!1&&(a.draw(a.options.animationDuration),a.hasDrawn=!0)}):this.draw(0)},g.prototype.resizeCanvas=function(){this.barFullWidth=this.$parent.width()-this.options.paddingLeft-this.options.paddingRight,this.svg.attr({width:this.$parent.width(),height:this.barVerticalOffsetUnit*this.dataset.length-this.options.barVerticalSpacing})},g.prototype.draw=function(a){var b=this;this.resizeCanvas(),this.bars.transition().duration(a).attr({width:function(a){return b.barFullWidth*a/100}}),this.labelItemGroup.selectAll("text").transition().attr({opacity:1}),this.labelPercentGroup.selectAll("text").transition().attr({x:function(a){return b.barFullWidth*a/100-b.options.labelPaddingRight+b.options.paddingLeft},opacity:1})},a.fn.barChart=function(b){return this.each(function(){a.data(this,"plugin_bar_chart")||a.data(this,"plugin_bar_chart",new g(this,b))})}}(jQuery,d3,window);