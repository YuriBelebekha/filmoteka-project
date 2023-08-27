// const radios = document.getElementsByName('theme');
import { refs } from './refs';

Array.from(refs.radiosThemeSwitcher).forEach( (elem, _i) => {		
	elem.addEventListener('change', e => {
		if(e.target.checked) {
			let value = e.target.getAttribute('value');
			document.querySelector('main').setAttribute('data-theme', value);
			document.documentElement.classList.add('in-transition');
			document.documentElement.classList.remove('color-theme-in-transition');					
		};
	});
});