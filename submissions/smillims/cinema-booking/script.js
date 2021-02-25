const formSeating = document.querySelector('.form-seating');

const asideMenuGreen = document.querySelector('.aside-menu-tickets-green');
const asideMenuYellow = document.querySelector('.aside-menu-tickets-yellow');
const asideMenuBlue = document.querySelector('.aside-menu-tickets-blue');

function checkClick(e) {
	const targetSeating = e.target.closest('.seating-input');

	if(!targetSeating) return;

	numberOfTickets(targetSeating);
}

function numberOfTickets(target) {
	const targetInputValue = target.value
	const [row, seat] = targetInputValue.split('-');

	if(target.getAttribute('name') === 'green' && target.checked || target.getAttribute('name') === 'yellow' && target.checked || target.getAttribute('name') === 'blue' && target.checked) {
		generateBlock(target, row, seat, targetInputValue);
	} else if (!target.checked) {
		removeBlock(targetInputValue);
	}
}

function generateBlock(target, row, seat, id) {
	const divMoviePlace = document.createElement('div');
	
	divMoviePlace.classList.add('movie-block-inside');
	divMoviePlace.dataset.id = id;
	divMoviePlace.innerHTML = `<div class="movie-first-column">
											<p class="movie-place">Row: ${row}</p>
											<p class="movie-row">Place: ${seat}</p>
										</div>
										<div class="movie-second-column">
											<p class="movie-text-1">Have</p>
											<p class="movie-text-2">good</p>
											<p class="movie-text-3">day!</p>
										</div>`;

	if(target.getAttribute('name') === 'green' && target.checked){
		asideMenuGreen.appendChild(divMoviePlace);
	} else if(target.getAttribute('name') === 'yellow' && target.checked) {
		asideMenuYellow.appendChild(divMoviePlace);
	} else if(target.getAttribute('name') === 'blue' && target.checked) {
		asideMenuBlue.appendChild(divMoviePlace);
	}
}

function removeBlock(id) {
	const qqq = document.querySelectorAll('.movie-block-inside');
	qqq.forEach(item => {
		if (item.dataset.id === id){
			item.remove();
		}
	});
}

formSeating.addEventListener('click', checkClick);
