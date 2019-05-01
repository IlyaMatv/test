(function() {
    var resultBtn       = document.querySelector('.filter__blue-btn');
    var resetBtn        = document.querySelector('.filter__gray-btn');
    var checkboxes      = document.querySelectorAll('.manufacturer .item input[type="checkbox"]');
    var productsTitles  = document.querySelectorAll('section.products .item span.item__title');
    var checkedBoxes    = [];
    var checked         = false;

    //функция возвращает всем товарам дисплей блок и убираем класс finded если уже происходила сортировка
    function resetValues() {
        productsTitles.forEach(function(item) {
            item.parentElement.classList.remove('finded');
            item.parentElement.style.display = "block";
        });
    };

    // если нажат хотя бы один инпут разрешаем фильтрацию
    function checkInputs() {
        for(var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checked = true;
            };
        };
    };

    // прослушка на чекбоксы
    checkboxes.forEach(function(item) {
        item.addEventListener('click', function() {
            checkInputs();
        });
    });

    // прослушка для кнопки "Показать результат"
    resultBtn.addEventListener('click', function() {
        checkInputs();
        
        if (checked) {
            resetValues();
            // смотрим какие боксы отмечены и собираем наименования в массив
            checkboxes.forEach(function(item) {
                if (item.checked) {
                    checkedBoxes.push(item.nextElementSibling.textContent);
                };
            });
            // запускаем цикл где проверяем есть ли хотя бы одно наименование из массива в названии товара
            productsTitles.forEach(function(item) {
                for(var i = 0; i < checkedBoxes.length; i++) {
                    if (item.textContent.indexOf(checkedBoxes[i]) !== -1) {
                        item.parentElement.classList.add('finded');
                    };
                };
            });
            // смотри какие айтемы не имеют класс finded и скрываем их
            productsTitles.forEach(function(item){
                if (!item.parentElement.classList.contains('finded')) {
                    item.parentElement.style.display = "none";
                };
            });
            checkedBoxes = []; 
            checked = false;
        } else {
            resetValues();
        };
    });

    // прослушка для кнопки "Очистить фильтр"
    resetBtn.addEventListener('click', function() {
        resetValues();
        checkboxes.forEach(function(item) {
            item.checked = false;
        });
    });
})();
