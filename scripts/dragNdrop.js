// Функция переноса товаров местами.
function dragNdrop(){
	// Получаем html - элеметы.
	const items = document.querySelector('.items_list');
	const itemsListContent = document.querySelectorAll('.items_list_content');
	// Цикл для установки необохдимого свойства.
	for(const item of itemsListContent){
		item.draggable = true;
	}
	// Вешаем оброботчики события добавления и удаления класса, при зажатии и отпуске мышки с товара.
	items.addEventListener('dragstart', (e) => {
		e.target.classList.add('selected');
	});

	items.addEventListener('dragend', (e) =>{
		e.target.classList.remove('selected');
	});
	// Обработчик события при зажатии и переносе товара.
	items.addEventListener('dragover', (e) => {
		// Предотвращаем стандартное поведение браузера
		e.preventDefault();
		// Получаем нажатый товар, и товар на место которого хотим переместить.
		const selectedItem = items.querySelector('.selected');
		const bottomItem = e.target;
		const isMobile = selectedItem !== bottomItem && bottomItem.classList.contains('items_list_content');
		// Проверка.
		if(!isMobile){
			return;
		}
		// Получаем следующий товар вызвав ниже написанную функцию.
		const nextItem = getNextItem(e.clientY, bottomItem);
		// Проверка.
		if(nextItem && selectedItem === nextItem.previousElementSibling || selectedItem === nextItem){
			return;
		}
		// Сдвигаем на -1 товар на место которого хотим поставить выбранный.
		items.insertBefore(selectedItem, nextItem);
	});
	// Функция получения следующего товара.
	const getNextItem = (cursorPosition, bottomItem) => {
		// Получение нижнего товара, его позицию и центр в координатах
		const bottomItemPosition = bottomItem.getBoundingClientRect();
		const bottomItemCenter = bottomItemPosition.y + bottomItemPosition.height / 2;
		// Условие.
		const nextItem = (cursorPosition < bottomItemCenter) ?
		bottomItem : 
		bottomItem.nextElementSibling;
		// Возвращаем новый элемент.
		return nextItem;
	};
}

dragNdrop();