//jQuery(function ($) {
  
//});

$(window).on('load',function(){
    var agent = navigator.userAgent;;
    var aryAcList = new Array();
    var aryPrList = new Array();

    /* set accordion menu area */
    /* status means   display is not none:true, display is none:false  */
    function AcList(list, burger,btn,display) {
        this.list = list;
        this.burger = burger;
        this.btn = btn;
        this.display = display;
        this.status = false;
        return;
    }

console.log("xxx");
    
    aryAcList[0] = new AcList($("main #about #what .description"), $('main #about #what h3'), $('main #about #what .toggle-btn img'), "block");
    aryAcList[1] = new AcList($("main #about #topics .description"), $('main #about #topics h3'), $('main #about #topics .toggle-btn img'), "block");
    aryAcList[2] = new AcList($("main #usrNav #playerNav #playNav ul"), $('main #usrNav #playerNav #playNav h3'), $('main #usrNav #playerNav #playNav .toggle-btn img'), "flex");
    aryAcList[3] = new AcList($("main #usrNav #playerNav #methodNav ul"), $('main #usrNav #playerNav #methodNav h3'), $('main #usrNav #playerNav #methodNav .toggle-btn img'), "flex");
    aryAcList[4] = new AcList($("main #usrNav #playerNav #selectSkin ul"), $('main #usrNav #playerNav #selectSkin h3'), $('main #usrNav #playerNav #selectSkin .toggle-btn img'), "flex");

/*
    aryPrList[0] = new AcList($("main #about .h3-box"), $('main #about h2'), $('main #about .toggle-btn img'), "flex");
    aryPrList[1] = new AcList($("main #usrNav #playerNav .h3-box"), $('main #usrNav #playerNav h2'), $('main #usrNav #playerNav .toggle-btn img'), "flex");
*/


    // set humburger menu
    function burgerInit(){
        for(var i = 0; i < 5; i++) {
            if($(window).innerWidth() >= 664){
                aryAcList[i].list.slideDown({
                    start: function () {
                        $(this).css("display", "flex");
                    }
                });
                aryAcList[i].status = true;
            }else{
                aryAcList[i].list.slideUp("fast");
                aryAcList[i].status = false;
            }
        }
    }


    /* slick */
    function slickInit(){
        if($(window).innerWidth() < 664){
            $(".regular").slick({
                autoplay:true,
                autoplaySpeed:900,
                arrows: true,
                dots:true,
                fade:false,
                infinite:true,
                slidesToShow:2,
                slidesToScroll:1,
                centerMode:true,
                centerPadding:'32px',
                /*appendArrows:$("#gNav"),*/
                swipe: true,
                pauseOnHover:true,
                pauseOnDotsHover: false,
                responsive: [
                    {
                      breakpoint: 480,     // 〜479px
                      settings: {
                        slidesToShow: 1,
                      }
                    }
                ],
            });
						// スライド切り替えの度にスライド番号を取得
						$(".regular").on('afterChange', function(slick, currentSlide){
							var current_slide = $(".regular").slick('slickCurrentSlide');
							switch(current_slide){
								case 0:
									$(".slick-current a").css({
											background:" linear-gradient(rgba(96,64,64,.2),rgba(192,96,96,.8)),url(./common/images/play-button-default-slither.gif) no-repeat 0 0",
											backgroundSize:"contain",
											width: "100%"

									});
									break;
								case 1:
									$(".slick-current a").css({
											background:" linear-gradient(rgba(64,96,64,.2),rgba(96,192,96,.8)),url(./common/images/play-button-default-uninum.gif) no-repeat 0 0",
											backgroundSize:"contain",
											width: "100%"

									});
									break;
								case 2:
									$(".slick-current a").css({
											background:" linear-gradient(rgba(64,64,96,.2),rgba(96,96,192,.8)),url(./common/images/play-button-default-slither.gif) no-repeat 0 0",
											backgroundSize:"contain",
											width: "100%"

									});
									break;
								case 3:
									$(".slick-current a").css({
											background:" linear-gradient(rgba(96,96,64,.2),rgba(192,192,96,.8)),url(./common/images/play-button-default-egologi.gif) no-repeat 0 0",
											backgroundSize:"contain",
											width: "100%"

									});
									break;
							}
							$(".slick-current img").css({
									visibility:"hidden",
							});
							//console.log(current_slide);
						});
        }else{
            $(".regular").slick("unslick");
        }
    }

    // toggle menu
    function menuslide(objList){
        if($(window).innerWidth() >= 664){
        }else{
            if(objList.status == false){
                objList.status = true;
/*
                objList.list.slideDown("fast",{
                    start: function () {
                        $(this).css({
                            display: "flex"
                        })
                    }
                });
*/
                objList.list.slideDown("fast");
                objList.btn.attr("src","common/images/nav-toggle-btn_close.png"); 
            }else{
                objList.list.slideUp("fast");
                objList.status = false;
                objList.btn.attr("src","common/images/nav-toggle-btn_open.png"); 
            }
        }
    }

/*		// to page top animation
        $(function(){
            var topBtn = $("#pageTop");
            topBtn.hide();
            $(window).scroll(function(){
                if($(this).scrollTop() > 50){
                    topBtn.fadeIn();
                }else{
                    topBtn.fadeOut();
                }
            });
            topBtn.click(function(){
                $("body,html").animate({scrollTop:0},500);
                return false;
            });
        });
*/		

    // burger menu onclick
    aryAcList[0].burger.click(function(){
        menuslide(aryAcList[0]);
    });
    aryAcList[1].burger.click(function(){
        menuslide(aryAcList[1]);
    });
    aryAcList[2].burger.click(function(){
        menuslide(aryAcList[2]);
    });
    aryAcList[3].burger.click(function(){
        menuslide(aryAcList[3]);
    });
    aryAcList[4].burger.click(function(){
        menuslide(aryAcList[4]);
    });

    if(agent.search(/iPhone/) != -1){
        burgerInit();
        slickInit();
    }else if(agent.search(/Android/) != -1){
        burgerInit();
        slickInit();
    }else{
        burgerInit();
        slickInit();
    }

    

});    
$(window).on("resize",function(){
        slickInit();
        burgerInit();
});
	
