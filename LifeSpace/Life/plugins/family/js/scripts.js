include("js/jquery.color.js");
include("js/jquery.backgroundpos.js");
include("js/jquery.easing.js");
include("js/jquery.mousewheel.js");
include("js/jquery.fancybox-1.3.4.pack.js");
include("js/googleMap.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/bgStretch.js");
include("js/sImg.js");
include("js/jcarousellite_1.0.1.min.js");
include("js/MathUtils.js");
include("js/uScroll.js");

;


function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = false,
    content, defColor, mh = 0, h = 0, defMh = 0;

function addAllListeners() {
    $('.pagin>ul>li>a').hover(
        function(){
            if (!$(this).parent().hasClass('active'))
                $(this).stop().animate({'backgroundPosition':'left center'},300,'easeOutExpo');
        },
        function(){
            if (!$(this).parent().hasClass('active'))
                $(this).stop().animate({'backgroundPosition':'right center'},300,'easeOutExpo');
        }
    );
}

$(document).ready(ON_READY);
$(window).load(ON_LOAD);

function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
    
    //start anomation---------------------------------------------------------
        $('header').css({top:-150})
        $('footer').css({bottom:-180})   	
    	$('header').stop().delay(250).animate({top:0}, 650, 'easeOutExpo')
    	$('footer').stop().delay(400).animate({bottom:0}, 650, 'easeOutExpo')        
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();
            
    mh = parseInt($('body').css('minHeight'));
    defMh = mh;
           
	$('.list1>li a').attr('rel','appendix')
    .prepend('<span class="sitem_over"><strong></strong></span>')
    $('.list1>li a').fancybox({
        'transitionIn': 'elastic',
    	'transitionOut': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true,
        'overlayColor': '#000'
    });
           
   	$('.readMore').hover(function(){
  		$(this).stop().animate({color:"#d01f1f"})						 
   	    }, function(){
  		$(this).stop().animate({color:"#FFF"}) 						 
   	})        
           
    $(".pagin").jCarouselLite({
            btnNext: ".next",
            btnPrev: ".prev",
            scroll:1,
            visible: 6,
            easing: 'easeOutExpo',
            speed: 700
    })      
    $('.pagin a').after('<span></span>');
    
    var curr_item = $(".pagin li").length/3;
    $(".pagin li").find('span').stop().animate({opacity:0},0, function(){
        
        $(".pagin li").eq(curr_item).find('span').stop().animate({opacity:1},0); 
    }); 
    
    $('.pagin a').hover(
        function(){
            if (!$(this).parent().hasClass('active'))
        	   $(this).siblings('span').stop().animate({'width':'100%','height':'100%',opacity:1},500,'easeOutExpo');            
        },
        function(){
            if (!$(this).parent().hasClass('active'))
        	   $(this).siblings('span').stop().animate({'width':'100%','height':'100%',opacity:0},700,'easeOutExpo');  
        }
    );;
    
    $('.next,.prev').hover(
        function(){
            if (!MSIE){
                $(this).children('span').css({opacity:'0',display:'block'}).stop().animate({opacity:'1'});  
            } else {
                $(this).children('span').stop().show();
            }  
        },
        function(){
            if (!MSIE){
                $(this).children('span').stop().animate({opacity:'0'},function(){$(this).css({display:'none'});});  
            }else {
                 $(this).children('span').stop().hide();
            }
        }
    );
    
    //uscroll-----------------------
	$('.scroll.ex-1')
		.uScroll({			
			mousewheel:true			
		})
    
    //follow icons---------------------------------------------------------
        $('#follow-icon .img_act').css({opacity:0})
    	
    	$('#follow-icon a').hover(function(){
    		$(this).find('.img_act').stop().animate({opacity:1})
    		$(this).find('p').stop().animate({color:"#71b0fd"},250)							 
    	}, function(){
    		$(this).find('.img_act').stop().animate({opacity:0}) 	
    		$(this).find('p').stop().animate({color:"#8c8c8c"},250)					 
    	})
      
     //closeimg----------------------------------------
    	$('.closebutton').hover(function(){
    		$(this).find("img").stop().animate({marginLeft:"-16px"}, 250, "easeOutCubic")						 
    	}, function(){
    		$(this).find("img").stop().animate({marginLeft:"0px"}, 250, "easeOutCubic")				 
    	})
     //Contactlink----------------------------------------
    	$('.contactText_1').hover(function(){
    		$(this).stop().animate({color:"#d0291f"}, 250, "easeOutCubic")						 
    	}, function(){
    		$(this).stop().animate({color:"#FFF"}, 250, "easeOutCubic")				 
    	})
        
	$('.list1>li a')
    .find('strong').css('top','200px').end()
    .hover(
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').css({display:'block',opacity:'0'}).stop().animate({'opacity':1}).end() 
                .find('strong').css({'opacity':0}).stop().animate({'opacity':1,'top':'0'},350,'easeInOutExpo');
            } else { 
                $(this).children('.sitem_over').stop().show().end()
                .find('strong').stop().show().css({'top':'0'});
            }
        },
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').stop().animate({'opacity':0},1000,'easeOutQuad',function(){$(this).children('.sitem_over').css({display:'none'})}).end()  
                .find('strong').stop().animate({'opacity':0,'top':'200px'},1000,'easeOutQuad');  
            } else {
                $(this).children('.sitem_over').stop().hide().end()
                .find('strong').stop().hide();
            }            
        }
    );
        
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'display':'none'});		
        },
        actFu:function(_){          
            if(_.curr){
                h = parseInt( _.curr.outerHeight());
                content.children('ul').css({'height':h});
                
                if (_.n == 0){
                    setTimeout(function (){
                        $(window).trigger('resize');
                    },900);
                } else {
                    $(window).trigger('resize');
                }
                                
                _.curr
                    .css({'left':'-2000px','display':'block'}).stop(true).delay(100).show().animate({'left':'0px'},{duration:700,easing:'easeOutExpo'});
            }   
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'left':'2000px'},{duration:600,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                _.prev.css({'display':'none'});
                            }
                        }
		              });
            }      
                  
  		}
    });
    defColor = $('#menu>li>a').eq(0).css('color'); 
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>a', li).stop().animate({color: '#fffefe'},300,'easeOutCubic');
            if (!MSIE) {
                $('>strong',li).stop().animate({'height':'115px'},300,'easeInOutExpo');
            } else {
                $('>strong',li).css({'display':'block','height':'115px'});
            }
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('> a', li).stop().animate({color: defColor},700,'easeOutCubic');
                if (!MSIE) {
                    $('>strong',li).stop().animate({'height':'0'},700,'easeOutExpo');
                } else {
                    $('>strong',li).css({'display':'none'});
                }
            }
        }
    })
    .navs(function(n){	
   	    $('#content').tabs(n);
   	});
    
    setTimeout(function(){
        $('#bgStretch').bgStretch({
    	   align:'leftTop',
           autoplay: false,
           navs:$('.pagin').navs({})
        })
        .sImg({
            sleep: 1000,
            spinner:$('<div class="spinner spinner_bg"></div>').css({opacity:.5}).stop().hide(3000)
        });
    },0);
    
    setTimeout(function(){  $('body').css({'overflow':'visible'}); },300);    
    addAllListeners();
    
    $(window).trigger('resize');
}

$(window).resize(function (){
    if (content) {
        var newMinH = h + 508;
        if (defMh > newMinH) {
            newMinH = defMh;
        }
        //console.log(newMinH)
        $('body').stop().animate({'minHeight':newMinH},800)
    }
}); 