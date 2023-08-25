var radios = document.getElementsByName('theme');

Array.from(radios).forEach( (el, i) => {
		
	el.addEventListener('change', e => {
			if(e.target.checked) {
				let value = e.target.getAttribute('value');
					document.querySelector('main').setAttribute('data-theme', value);
					document.documentElement.classList.add('in-transition')
					window.setTimeout(function() {
					  document.documentElement.classList.remove('color-theme-in-transition')
					}, 100)
					
			}
	});
});