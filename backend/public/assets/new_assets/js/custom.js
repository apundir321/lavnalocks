

$(document).ready(function () {



    $('.owl-item.active.center').prev().addClass('wp').siblings().removeClass('wp');
    $('.owl-item.active.center').next().addClass('wpp').siblings().removeClass('wpp');
    $('.wp').prev().addClass('wppp').siblings().removeClass('wppp');
    $('.wpp').next().addClass('wpppp').siblings().removeClass('wpppp');

    $('.Fopen').click(function () {
        $('body').toggleClass('OpenF');
    });
});

$(document).ready(function () {

    var sync1 = $("#slider");
    var sync2 = $("#navigation");
    var slidesPerPage = 6;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 200000,
        nav: true,
        autoplay: false,
        dots: true,
        loop: true,
        autoHeight: true,
        responsiveRefreshRate: 200,
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: true,
            margin: 0,
            nav: true,
            // smartSpeed: 1000,
            //slideSpeed : 500,
            slideBy: slidesPerPage,
            responsiveRefreshRate: 100,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 2
                },
                600: {
                    items: 3
                },
                768: {
                    items: 4
                },
                1000: {
                    items: 5
                }
                ,
                1200: {
                    items: 5
                }
            }
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
});

var $owl = $('#slider3D');
$owl.children().each(function (index) {
    $(this).attr('data-position', index);
});
$owl.owlCarousel({
    autoplay: false,
    center: true,
    loop: true,
    nav: true,
    responsive: {
        0: {
            items: 1,
            margin: 20
        },
        600: {
            items: 3,
            margin: 0
        },
        768: {
            items: 3,
            margin: 0,
            touchDrag: true,
            mouseDrag: true
        },
        1200: {
            items: 5,
            margin: 30,
            touchDrag: false,
            mouseDrag: false
        }
    },
});
$(document).on('click', '.owl-item>div', function () {
    $owl.trigger('to.owl.carousel', $(this).data('position'));
    $('.owl-item.active.center').prev().addClass('wp').siblings().removeClass('wp');
    $('.owl-item.active.center').next().addClass('wpp').siblings().removeClass('wpp');
    $('.wp').prev().addClass('wppp').siblings().removeClass('wppp');
    $('.wpp').next().addClass('wpppp').siblings().removeClass('wpppp');
});
$('.owl-nav div').on('click', function () {
    $('.owl-item.active.center').prev().addClass('wp').siblings().removeClass('wp');
    $('.owl-item.active.center').next().addClass('wpp').siblings().removeClass('wpp');
    $('.wp').prev().addClass('wppp').siblings().removeClass('wppp');
    $('.wpp').next().addClass('wpppp').siblings().removeClass('wpppp');
});
$("#VideoModal").on('hidden.bs.modal', function (e) {
    $("#VideoModal iframe").attr("src", $("#VideoModal iframe").attr("src"));
});
//

$('#preloader').delay(1000).fadeOut('slow', function () {
    //$('.profile-page, .portfolio-page, .service-page, .contact-page').hide();
});/*preloader end*/



$(document).ready(function () {
    $('#lblError').hide();
    $(".Mobile").keypress(function (evt) {
        var keyCode = (evt.which) ? evt.which : evt.keyCode;
        if ((keyCode < 48 || keyCode > 57) && keyCode != 8 && keyCode != 46 && keyCode != 37 && keyCode != 39) // 32-Space & 8-Backspace & 46-Delete & 37 Left & 39 Right Arrow //
            return false;
        return true;
    });

    // validation for name field
    $(".Name").keypress(function (event) {
        var inputValue = event.which;
        // allow letters and whitespaces only.
        if ((inputValue > 32 && inputValue < 65) && (inputValue != 32) || (inputValue > 90 && inputValue < 97) || (inputValue > 122 && inputValue < 127)) {
            event.preventDefault();
        }
    });

    detectmob();

    $('#btnSubmit').click(function () {

        //alert("errorName");

        var valid = 0;

        if ($('#txtName').val() == '') {
            // alert();
            $('#lblError').show();
            //alert();
            //$('#errorName').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorName').hide();

        var nameReg = /^[a-zA-Z ]*$/;
        if (!nameReg.test($("#txtName").val()) && $('#txtName').val() != '') {
            $('#lblError').show();
            // $('#errorValidName').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        // $('#errorValidName').hide();


        if ($('#txtLName').val() == '') {
            //alert($('#errorLName').val());
            $('lblError').show();
            //$('#errorLName').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorLName').hide();

        var nameReg = /^[a-zA-Z ]*$/;
        if (!nameReg.test($("#txtLName").val()) && $('#txtLName').val() != '') {
            $('#lblError').show();
            //$('#errorValidLName').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorValidLName').hide();



        var mobileReg = /[7-9]{1}[0-9]{9}/;
        if (!mobileReg.test($('#txtMobile').val()) && $('#txtMobile').val() != "") {
            $('#lblError').show();
            //$('#errorValidMobile').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorValidMobile').hide();

        if ($('#txtMobile').val() == "") {
            $('#lblError').show();
            //$('#errorMobile').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorMobile').hide();

        var mobileReg = /[7-9]{1}[0-9]{9}/;
        if (!mobileReg.test($('#txtMobile').val()) && $('#txtMobile').val() != "") {
            $('#lblError').show();
            //$('#errorValidMobile').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorValidMobile').hide();

        if ($('#txtEmail').val() == "") {
            $('#lblError').show();
            //$('#errorEmail').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorEmail').hide();

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        if (!emailReg.test($("#txtEmail").val()) && $('#txtEmail').val() != "") {
            $('#lblError').show();
            //$('#errorValidEmail').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorValidEmail').hide();


        if ($('#ddlSelectProdutc').val() == "0") {
            $('#lblError').show();
            //$('#errorAddress').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorAddress').hide();

        if ($('#ddlCity').val() == "0") {
            $('#lblError').show();
            //$('#errorCity').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorCity').hide();

        if ($('#txtMessage').val() == "") {
            $('#lblError').show();
            //$('#errorRecipe').show();
            valid = 1;
            return false;
        }
        else
            $('#lblError').hide();
        //$('#errorRecipe').hide();


        //checkbox

        //if ($('#cbAcbAuthorize').prop('checked') == false) {
        //    alert('Please authorise Hafele');
        //    $('#cbAcbAuthorize').focus();
        //    return false;
        //}

        if (valid == 0) {
            //    //$('#myModal').modal('show');
            return true;
        }

        return false;
    });

    $('#btnSubmitD').click(function () {

        // alert("errorName");
        var valid = 0;

        if ($('#txtEmailD').val() == "") {
            $('#errorEmail1').show();
            valid = 1;
        }
        else
            $('#errorEmail1').hide();

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        if (!emailReg.test($("#txtEmailD").val()) && $('#txtEmailD').val() != "") {
            $('#errorValidEmail1').show();
            valid = 1;
        }
        else
            $('#errorValidEmail1').hide();

        if (valid == 0) {
            //    //$('#myModal').modal('show');
            return true;
        }

        return false;
    });

});

function detectmob() {
    if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        document.getElementById("hdnDevice").value = "Mobile";
    } else {
        document.getElementById("hdnDevice").value = "Desktop";
    }
}


var players = [];

function onYouTubeIframeAPIReady() {
    var predefined_players = document.getElementsByClassName("yt_videos")[0].getElementsByTagName('iframe');
    console.log("number of players: " + predefined_players.length);
    for (var i = 0; i < predefined_players.length; i++) {
        predefined_players[i].id = "player" + i;
        players[i] = new YT.Player("player" + i, {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady() {
    //console.log("on load: ");
    // players[1].playVideo();
}

function onPlayerStateChange(event) {
    var link = event.target.a.id;
    var newstate = event.data;
    //        console.log(link + " has a state:" + newstate);
    if (newstate == YT.PlayerState.PLAYING) {
        players.forEach(function (item, i) {
            if (item.a.id != link) item.pauseVideo();
        });
    }
}




$('.sdkjk').click(function(){

    $('.nb-form').addClass('active');
    $('#rms87').removeClass('hide');

});

$('#rms87').click(function(){
    $('#rms87').addClass('hide');
    $('.nb-form').removeClass('active');

});


var swiper = new Swiper("#reviewSlides", {
    slidesPerView: 3,
    spaceBetween: 30,

    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        2000: {
            slidesPerView: 3,
            spaceBetween: 30
          }
      },
    pagination: {
      el: "#reviewSlides .swiper-pagination",
    },
  });