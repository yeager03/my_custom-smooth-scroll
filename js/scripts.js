window.addEventListener('load', function () {
	let menu = document.querySelector('.menu'),
		btnScrollToTop = document.querySelector('.scrollToTop'),
		menuLinks = document.querySelectorAll('.menu .menu__link');

	const height = (getComputedStyle(menu).height).slice(0, -2); // высота хедера

	if (window.location.hash != '') {
		scrollToId(window.location.hash);
	}

	menu.addEventListener('click', function (e) {
		if (e.target.classList.contains('menu__link')) {
			e.preventDefault();

			let link = e.target;
			scrollToId(link.hash); // #about , #price
		}
	});

	btnScrollToTop.addEventListener("click", function (e) {
		scrollToPos(0);
	});

	window.addEventListener("scroll", function (e) {
		let pos = Math.floor(window.pageYOffset);

		if (pos > window.innerHeight) {
			btnScrollToTop.classList.add("activeScrollToTop");
		} else {
			btnScrollToTop.classList.remove("activeScrollToTop");
		}

		for (let i = menuLinks.length - 1; i >= 0; i--) {
			let link = menuLinks[i]; // Нз , Запись , Стоимость , О курсе
			let header = document.querySelector(link.hash); // id="nz" , id="app" , id="price" , id="about" 

			// console.log("Pos -> ", pos, "OffsetTop -> ", (elemOffsetTop(header) - 100));

			if (pos >= (elemOffsetTop(header) - 100)) {
				// console.log("Current link -> ", link); // Current Link

				menu.querySelector(".menu__link-active").classList.remove("menu__link-active");
				link.classList.add("menu__link-active");
				break;
			}
		}
	});

	function scrollToId(id) { // функция для скролла до заголовка
		const target = document.querySelector(id);

		if (target !== null) {
			// console.log(target.offsetTop);
			let pos = elemOffsetTop(target) - height;

			scrollToPos(pos);
		}
	}

	function elemOffsetTop(node) { // функция для получение координат начиная с вверха
		let coords = node.getBoundingClientRect();
		return coords.top + window.pageYOffset;
	}

	function scrollToPos(pos) { // функция для плавного скролла
		window.scrollTo({
			top: pos,
			behavior: "smooth"
		});
	}
});



