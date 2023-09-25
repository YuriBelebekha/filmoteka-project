import { refs } from './refs';	

Array.from(refs.radiosThemeSwitcher).forEach((elem, _i) => {		
	const getThemeValue = localStorage.getItem('theme');

	if (getThemeValue === elem.attributes.value.textContent) {
		elem.setAttribute('checked', '');
		document.querySelector('main').setAttribute('data-theme', getThemeValue);
		document.querySelector('footer').setAttribute('data-theme', getThemeValue);
	};

	elem.addEventListener('change', e => {
		if(e.target.checked) {
			let value = e.target.getAttribute('value');
			
			localStorage.setItem('theme', value);
			const getThemeValue = localStorage.getItem('theme');

			document.querySelector('main').setAttribute('data-theme', getThemeValue);
			document.querySelector('footer').setAttribute('data-theme', getThemeValue);
			document.documentElement.classList.add('in-transition');
			document.documentElement.classList.remove('color-theme-in-transition');			
		};
	});
});