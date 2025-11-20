const galleryImages = [
	{
		url: 'img/mountain.avif',
		alt: 'Montañas'
	},
	{
		url: 'img/forest.avif',
		alt: 'Bosque'
	},
	{
		url: 'img/waterfall.avif',
		alt: 'Cascada'
	},
	{
		url: 'img/natural-landscape.avif',
		alt: 'Paisaje natural'
	},
	{
		url: 'img/lake.avif',
		alt: 'Lago'
	},
	{
		url: 'img/sunset.jpg',
		alt: 'Atardecer'
	},
	{
		url: 'img/hiking.avif',
		alt: 'Senderismo'
	},
	{
		url: 'img/camping.avif',
		alt: 'Acampada'
	},
	{
		url: 'img/borealis.jpg',
		alt: 'Aurora boreal'
	},
	{
		url: 'img/mountain-house.jpg',
		alt: 'Casa de montaña'
	}
];

const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const galleryGrid = document.querySelector('.gallery-grid');
const ctaButton = document.querySelector('.cta-button');

function initPage() {
	populateGallery();
	setupEventListeners();
	setupContactForm();
}

function populateGallery() {
	galleryImages.forEach(image => {
		const galleryItem = document.createElement('div');
		galleryItem.className = 'gallery-item';

		const img = document.createElement('img');
		img.src = image.url;
		img.alt = image.alt;

		img.onerror = function () {
			console.log('Error cargando imagen:', image.url);
			this.src = 'img/mountain.avif';
		};

		galleryItem.appendChild(img);
		galleryGrid.appendChild(galleryItem);
	});
}

function setupEventListeners() {
	hamburger.addEventListener('click', toggleMenu);

	ctaButton.addEventListener('click', handleCtaClick);

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 70,
					behavior: 'smooth'
				});

				if (navList.classList.contains('active')) {
					toggleMenu();
				}
			}
		});
	});

	window.addEventListener('scroll', handleHeaderScroll);
}

function setupContactForm() {
	const contactForm = document.getElementById('contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', handleFormSubmit);
	}
}

function toggleMenu() {
	hamburger.classList.toggle('active');
	navList.classList.toggle('active');
}

function handleCtaClick() {
	const gallerySection = document.getElementById('gallery');
	window.scrollTo({
		top: gallerySection.offsetTop - 70,
		behavior: 'smooth'
	});
}

function handleHeaderScroll() {
	const header = document.querySelector('.header');
	if (window.scrollY > 100) {
		header.style.backgroundColor = 'rgba(46, 125, 50, 1)';
		header.style.padding = '0.5rem 0';
	} else {
		header.style.backgroundColor = 'rgba(46, 125, 50, 0.9)';
		header.style.padding = '1rem 0';
	}
}

function validateForm(formData) {
	const errors = {};

	if (!formData.get('name').trim()) {
		errors.name = 'El nombre es obligatorio';
	} else if (formData.get('name').trim().length < 2) {
		errors.name = 'El nombre debe tener al menos 2 caracteres';
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!formData.get('email').trim()) {
		errors.email = 'El email es obligatorio';
	} else if (!emailRegex.test(formData.get('email'))) {
		errors.email = 'El formato del email no es válido';
	}

	if (!formData.get('subject')) {
		errors.subject = 'Debes seleccionar un asunto';
	}

	if (!formData.get('message').trim()) {
		errors.message = 'El mensaje es obligatorio';
	} else if (formData.get('message').trim().length < 10) {
		errors.message = 'El mensaje debe tener al menos 10 caracteres';
	}

	return errors;
}

function displayErrors(errors) {
	document.querySelectorAll('.error-message').forEach(el => {
		el.textContent = '';
	});
	document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
		el.classList.remove('error');
	});

	Object.keys(errors).forEach(field => {
		const errorElement = document.getElementById(`${field}-error`);
		const inputElement = document.getElementById(field);

		if (errorElement && inputElement) {
			errorElement.textContent = errors[field];
			inputElement.classList.add('error');
		}
	});
}

function showFormMessage(message, type) {
	const formMessage = document.getElementById('form-message');
	formMessage.textContent = message;
	formMessage.className = `form-message ${type}`;
	formMessage.style.display = 'block';

	setTimeout(() => {
		formMessage.style.display = 'none';
	}, 5000);
}

function handleFormSubmit(e) {
	e.preventDefault();

	const formData = new FormData(e.target);
	const errors = validateForm(formData);

	if (Object.keys(errors).length > 0) {
		displayErrors(errors);
		return;
	}

	showFormMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
	e.target.reset();

	console.log('Form data:', {
		name: formData.get('name'),
		email: formData.get('email'),
		subject: formData.get('subject'),
		message: formData.get('message'),
		newsletter: formData.get('newsletter') === 'on'
	});
}

document.addEventListener('DOMContentLoaded', initPage);