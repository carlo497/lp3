jQuery(document).ready(function(){

	var left = jQuery("#divRight");
	var block = '<div class="yourChoice boxTop"><a class="title">Twój dotychczasowy wybór</a><table cellpadding="0" cellspacing="0"></table></div>';
	left.append(block);
	jQuery(".chk").each(function() {
		if(jQuery(this).is(':checked')) {
			check(jQuery(this).attr("id").split('_').pop());
		}
	})
	jQuery(".chk").click(function(){
		var id = jQuery(this).attr("id").split('_').pop();
		if(jQuery(this).is(':checked')) {
			check(id);
		} else {
			uncheck(id,true);
		}
	});
	jQuery(".yourChoice").on('click','span.remove',function(){
		uncheck(jQuery(this).parent().parent().attr("id").split('_').pop());
	});
	var blockStartPosition = jQuery(".yourChoice").offset().top;
	jQuery(window).scroll(function(){
		if(jQuery(window).scrollTop() > blockStartPosition) { /* po prawej pustki */
			jQuery(".yourChoice").addClass("sticky");
			var blockOffset = jQuery("#wrap-content").offset();
			if((jQuery(window).scrollTop() + jQuery(window).height()) > (jQuery("#wrap-content").height() + blockOffset.top)) { /* widoczna stopka */
				var bottom = jQuery(window).height()+jQuery(window).scrollTop()-blockOffset.top-jQuery("#wrap-content").height();
				jQuery(".yourChoice").css("bottom","auto");
				if((jQuery(window).height() - jQuery(".yourChoice").height()) < bottom) { /* blok za wysoki */
					var bottom = (bottom * 100)/jQuery(window).height();
					jQuery(".yourChoice").css("bottom",bottom+"%");
				}
			} else jQuery(".yourChoice").css("bottom","auto");
		} else {
			jQuery(".yourChoice").removeClass("sticky");
		}
	});
});
function check(id) {
	var nr = '';
	var artist = jQuery("#utwor_"+id).parent().parent().children("td:eq(1)").children("span:eq(0)").html();
	var title = jQuery("#utwor_"+id).parent().parent().children("td:eq(1)").children("span:eq(1)").html();
	var listen = jQuery("#utwor_"+id).parent().parent().children("td:eq(2)").html();
	jQuery(".yourChoice table").append('<tr id="lp3_extension_'+id+'"><td class="nr">'+nr+'</td><td class="aT"><span class="artist">'+artist+'</span><span class="title">'+title+'</span> <span class="remove">(usuń)</span></td><td class="listen ratings"><span class="listen">'+listen+'</span></td></tr>');
	renumber();
}
function uncheck(id,box) {
	jQuery("#lp3_extension_"+id).remove();
	if(!box) jQuery('#utwor_'+id).trigger('click');
	renumber();
}
function renumber() {
	var i = 1;
	jQuery(".yourChoice tr").each(function() {
		jQuery(this).find("td.nr").html(i);
		i++;
	});
}