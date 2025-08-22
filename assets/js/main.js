(function(){
	'use strict';

	// Mobil menü toggle
	var toggle = document.querySelector('.nav-toggle');
	var nav = document.querySelector('.primary-nav');
	
	if (toggle && nav) {
		toggle.addEventListener('click', function(){
			var expanded = this.getAttribute('aria-expanded') === 'true' || false;
			this.setAttribute('aria-expanded', (!expanded).toString());
			nav.classList.toggle('is-open');
			
			// Animasyon için hamburger çizgileri
			var bars = this.querySelectorAll('.nav-toggle__bar');
			if (nav.classList.contains('is-open')) {
				bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
				bars[1].style.opacity = '0';
				bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
			} else {
				bars[0].style.transform = 'none';
				bars[1].style.opacity = '1';
				bars[2].style.transform = 'none';
			}
		});
	}

	// Smooth scroll için linklere tıklama
	var scrollLinks = document.querySelectorAll('a[href^="#"]');
	scrollLinks.forEach(function(link) {
		link.addEventListener('click', function(e) {
			var target = document.querySelector(this.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
				
				// Mobil menüyü kapat
				if (nav && nav.classList.contains('is-open')) {
					nav.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
					var bars = toggle.querySelectorAll('.nav-toggle__bar');
					bars[0].style.transform = 'none';
					bars[1].style.opacity = '1';
					bars[2].style.transform = 'none';
				}
			}
		});
	});

	// Placeholder görseller için basit renk gradyanı
	var placeholderImages = document.querySelectorAll('img[src*="project-"]');
	placeholderImages.forEach(function(img, index) {
		img.addEventListener('error', function() {
			var colors = [
				'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
				'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
				'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
				'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
				'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
			];
			
			var wrapper = document.createElement('div');
			wrapper.style.cssText = `
				width: 100%;
				aspect-ratio: 4/3;
				background: ${colors[index % colors.length]};
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				font-weight: 600;
				font-size: 14px;
				text-align: center;
				border-radius: 8px 8px 0 0;
			`;
			wrapper.textContent = 'Demo Proje #' + (index + 1);
			
			this.style.display = 'none';
			this.parentNode.insertBefore(wrapper, this);
		});
	});

})();
