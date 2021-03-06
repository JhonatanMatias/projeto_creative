$(document).ready(function(){
	

	//Efeito de rolagem suave com jquery Easing.
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(){

		if(location.pathname.replace(/\//,'') == this.pathname.replace(/\//,'') && location.hostname == this.hostname){
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if(target.length) {

				$('html, body').animate({

					scrollTop: (target.offset().top - 56)
				},1000,"easeInOutExpo");

				return false;
			}

		}
	});

	//Fechamento do menu responsivo quando um item dele é clicado e a rolagem ocorrer.

	$('.js-scroll-trigger').click(function() {

		$('.navbar-collapse').collapse('hide');
	});

	//Ativa  o scrollspy para adicionar a classe active aos itens da barra de navegação.
	$("body").scrollspy({

		target: "#navPrincipal",
		offset: 57
	});

	//Aplica novo estilo a barra de navegação quando a mesma é rolada.

	var collapseNavbar = function(){

		if($("#navPrincipal").offset().top > 100) {

			$("#navPrincipal").addClass("navbar-shrink");

		} else {

			$("#navPrincipal").removeClass("navbar-shrink");
		}
	}

	//se a barra já estiver após o topo

	collapseNavbar();

	//se a janela for rolada.

	$(window).scroll(collapseNavbar);

	//Efeito scrollreveal

	window.sr = ScrollReveal();

	sr.reveal('.sr-icon-1',{

		delay: 200,
		scale: 0
	});

	sr.reveal('.sr-icon-2',{

		delay: 400,
		scale: 0

	});

	sr.reveal(('.sr-icon-3'),{

		delay: 600,
		scale: 0
	});

	sr.reveal('.sr-icon-4',{

		delay: 800,
		scale: 0

	});

	sr.reveal('.sr-button',{

		delay: 200,
		distance: "15px",
		origin: "bottom",
		scale: 0.8
	})

	sr.reveal('.sr-contact-1',{

		delay: 200,
		scale: 0
	});

	sr.reveal('.sr-contact-2',{

		delay: 400,
		scale: 0
	});


	//Magnific PopUp chamadas
	$('.popUp-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Carregando imagem #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {

			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {

			tError: '<a href="%url%">A imagem #%curr%</a> não carregou'
		}
	});

			

})