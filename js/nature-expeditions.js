class NatureExpeditionManager {
	constructor() {
		this.expeditions = this.loadExpeditions();
		this.init();
	}

	init() {
		this.setupEventListeners();
		this.displayExpeditions();
	}

	setupEventListeners() {
		const expeditionForm = document.getElementById('expedition-form');
		if (expeditionForm) {
			expeditionForm.addEventListener('submit', (e) => this.handleAddExpedition(e));
		}
	}

	loadExpeditions() {
		const storedExpeditions = localStorage.getItem('natureExpeditions');
		if (storedExpeditions) {
			return JSON.parse(storedExpeditions);
		}

		return [
			{
				id: 1,
				name: 'Sendero de los Apalaches',
				location: 'Estados Unidos',
				year: 2023,
				status: 'completed',
				description: 'Trekking completo por una de las rutas de senderismo más largas del mundo, atravesando 14 estados.'
			},
			{
				id: 2,
				name: 'Exploración Amazonía',
				location: 'Brasil',
				year: 2024,
				status: 'active',
				description: 'Expedición para documentar la biodiversidad única de la selva amazónica y sus ecosistemas.'
			},
			{
				id: 3,
				name: 'Ascenso Alpes Suizos',
				location: 'Suiza',
				year: 2024,
				status: 'planned',
				description: 'Ascenso guiado a algunas de las cumbres más emblemáticas de los Alpes europeos.'
			}
		];
	}

	saveExpeditions() {
		localStorage.setItem('natureExpeditions', JSON.stringify(this.expeditions));
	}

	handleAddExpedition(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const newExpedition = {
			id: Date.now(),
			name: formData.get('expeditionName'),
			location: formData.get('expeditionLocation'),
			year: parseInt(formData.get('expeditionYear')),
			status: formData.get('expeditionStatus'),
			description: formData.get('expeditionDescription')
		};

		this.addExpedition(newExpedition);
		e.target.reset();
	}

	addExpedition(expedition) {
		this.expeditions.push(expedition);
		this.saveExpeditions();
		this.displayExpeditions();

		this.showMessage('Expedición agregada correctamente', 'success');
	}

	deleteExpedition(expeditionId) {
		this.expeditions = this.expeditions.filter(expedition => expedition.id !== expeditionId);
		this.saveExpeditions();
		this.displayExpeditions();
		this.showMessage('Expedición eliminada correctamente', 'success');
	}

	displayExpeditions() {
		const expeditionsList = document.getElementById('expeditions-list');
		if (!expeditionsList) return;

		if (this.expeditions.length === 0) {
			expeditionsList.innerHTML = '<div class="no-expeditions">No hay expediciones registradas</div>';
			return;
		}

		expeditionsList.innerHTML = this.expeditions.map(expedition => `
            <div class="expedition-item" data-id="${expedition.id}">
                <div class="expedition-header">
                    <div class="expedition-title-container">
                        <h4 class="expedition-title">${expedition.name}</h4>
                        <span class="expedition-year">${expedition.year}</span>
                    </div>
                    <div class="expedition-actions">
                        <span class="expedition-status status-${expedition.status}">
                            ${this.getStatusText(expedition.status)}
                        </span>
                        <button class="delete-button" data-id="${expedition.id}" title="Eliminar expedición">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="expedition-location">${expedition.location}</div>
                <p class="expedition-description">${expedition.description}</p>
            </div>
        `).join('');

		this.addDeleteEventListeners();
	}

	addDeleteEventListeners() {
		const deleteButtons = document.querySelectorAll('.delete-button');
		deleteButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				const expeditionId = parseInt(e.currentTarget.getAttribute('data-id'));
				this.deleteExpedition(expeditionId);
			});
		});
	}

	getStatusText(status) {
		const statusMap = {
			'planned': 'Planificada',
			'active': 'Activa',
			'completed': 'Completada',
			'cancelled': 'Cancelada'
		};
		return statusMap[status] || status;
	}

	showMessage(message, type) {
		const messageEl = document.createElement('div');
		messageEl.className = `form-message ${type}`;
		messageEl.textContent = message;
		messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            max-width: 300px;
            padding: 1rem;
            border-radius: 8px;
            font-weight: 500;
        `;

		document.body.appendChild(messageEl);

		setTimeout(() => {
			messageEl.remove();
		}, 3000);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new NatureExpeditionManager();
});