// Асинхронная функция получения товаров, привязанная к кнопке.
async function getItems(){
	// Переменные(запрос, html-элементы).
	var response = await fetch('https://dummyjson.com/products').then(res => res.json());
	var getValue = document.querySelector('.get_value').value;
	const items = document.querySelector('.items_list');
	// Получение значения из input'а.
	response = response.products.splice(0, getValue);
	items.innerHTML = '';
	// Вызов функий отображения и сортировки товаров.
	showItems(response, items);
	sortItems(response, items);
}
// Функция сортировки(принимает запрос и маркированный список).
function showItems(response, items){
	// Цикл для прохождения по всем товарам.
	for(let i = 0; i < response.length; i++){
		// Вставляем в html.
		items.innerHTML += 
		`
		<li class="items_list_content" draggable = "true" id = "ufo">
			<span class="items_list_content_title">${response[i].title}</span>
		</li>
		<li class="items_drop_content">
			<span class="items_drop_content_title">${response[i].title}</span>
			<span class="items_drop_content_brand">Brand:${response[i].brand}</span>
			<span class="items_drop_content_category">Category: ${response[i].category}</span>
			<img class="items_drop_content_picture" src="${response[i].thumbnail}">
			<span class="items_drop_content_description">${response[i].description}</span><br>
			<span class="items_drop_content_rating">Rating:${response[i].rating}</span>
			<span class="items_drop_content_price">${response[i].price}$</span>
		</li>
		`
		// Цикл для отображения drop-элемента при наведении и наоборот.
		var okay = document.getElementsByClassName('items_list_content')
		for (let j = 0; j < okay.length; j++){
			okay[j].onmouseover = function() {
				// При наведении на title, отображает элемент справа.
				var dropMenu = document.getElementsByClassName('items_drop_content');
				var drop = dropMenu[j];
				drop.style.display = "block";
			}
			// Если мышь убрана с title, элемент становится none.
			okay[j].onmouseout = function() {
				var dropMenu = document.getElementsByClassName('items_drop_content');
				var drop = dropMenu[j];
				drop.style.display = "none";
			}
		}
	}
}
// Функция сортировки(принимает запрос и маркированный список).
function sortItems(response, items){
	// Получаем select.
	const selectedSort = document.querySelector('.items_sort')
	// Вешаем обработчик события на select.
	selectedSort.addEventListener('change', e => {
		const itemsListContent = document.querySelectorAll('.items_list_content');
		const itemsDropContent = document.querySelectorAll('.items_drop_content');
		const sortBy = e.target.value;
		// Удаляем товары.
		itemsListContent.forEach(item => {
			item.remove();
		});
		itemsDropContent.forEach(item => {
			item.remove();
		})
		// Условия сортировки.
		if(sortBy === 'default'){
			response.sort((a, b) => (a.id > b.id ? 1 : -1));
		} else if(sortBy === 'price'){
			response.sort((a, b) => (a.price > b.price ? 1 : -1));
		}
		// Вызов функции отображения.
		showItems(response, items)
	})
}

getItems()