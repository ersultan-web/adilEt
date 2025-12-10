const contactBtn = document.getElementById('Contact');
const options = document.getElementById('contactOptions');
const icon = document.getElementById('contactIcon')
// Изначально скрыт
options.style.opacity = "0";
options.style.bottom = "0px";
options.style.pointerEvents = "none";

contactBtn.addEventListener('click', () => {
    if (options.style.opacity === "0") {
        // Появление
        options.style.opacity = "1";
        options.style.bottom = "-100px";
        options.style.pointerEvents = "auto";
        icon.name = 'chevron-up-outline'
    } else {
        // Скрытие
        options.style.opacity = "0";
        options.style.bottom = "0px";
        options.style.pointerEvents = "none";
        icon.name = 'chevron-down-outline'
    }
});

document.addEventListener('click', (e) => {
    if (!options.contains(e.target) && e.target !== contactBtn) {
        options.style.opacity = "0";
        options.style.bottom = "0px";
        options.style.pointerEvents = "none";
    }
})

// let obj = [
//     {
//         id: 1,
//         img:'img/Grudinka.jpg',
//         name: 'Грудинка',
//         price:  4000,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Сочная говяжья грудинка, идеально подходит для тушения и запекания.'
//     },
//     {
//         id: 2,
//         img:'img/Osobuka.jpg',
//         name: 'Оссобука',
//         price:  4000,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Нежная оссобука с тонким мясным вкусом, прекрасно подходит для стейков и жарки.'
//     },
//     {
//         id: 3,
//         img:'img/Fileika.jpg',
//         name: 'Филейка',
//         price:  4300,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Высококачественная говяжья филеика — мягкое мясо для изысканных блюд.'
//     },
//     {
//         id: 4,
//         img:'img/sheika.jpg',
//         name: 'Шейка',
//         price:  4300,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Говяжья шейка с мраморной текстурой, отлично подходит для жарки и тушения.'
//     },
//     {
//         id: 5,
//         img:'img/rebra.jpg',
//         name: 'Ребра',
//         price:  4000,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Сочные говяжьи ребра, идеальные для запекания на гриле или в духовке.'
//     },
//     {
//         id: 6,
//         img:'img/antrekot.jpg',
//         name: 'Антрекот',
//         price:  4300,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Классический говяжий антрекот с насыщенным вкусом и мягкой текстурой.'
//     },
//     {
//         id: 7,
//         img:'img/lopatka.jpg',
//         name: 'Лопатка',
//         price:  4300,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Говяжья лопатка для медленного тушения и приготовления ароматных рагу.'
//     },
//     {
//         id: 8,
//         img:'img/myakot.jpg',
//         name: 'Мякоть',
//         price:  5300,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Нежная говяжья мякоть премиум-класса, подходит для стейков и жарки.'
//     },
//     {
//         id: 9,
//         img:'img/pharsh.jpg',
//         name: 'Фарш',
//         price:  4400,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Свежий говяжий фарш для котлет, тефтелей и разнообразных блюд.'
//     },
//     {
//         id: 10,
//         img:'img/pharsh15%.jpg',
//         name: 'Фарш 15%',
//         price:  4000,
//         cotegory: 'Говядина',
//         inStock: true,
//         description: 'Фарш с 15% жира, идеально подходит для сочных котлет и бургеров.'
//     },
// ];

async function GetInfo() {
    try {
        const getinfo = await fetch('https://675975aa099e3090dbe1bcc7.mockapi.io/api')
        if (!getinfo.ok) { throw new Error('error get info in mock api') }
        const getinfoJson = await getinfo.json()
        return getinfoJson
    } catch (err) {
        console.log(err);
        return null
    }
}


const container = document.getElementById('card'); // элемент-контейнер

function createProductCard(data) {
    // Создаём контейнер карточки
    const card = document.createElement('div');
    card.className = 'w-[47%] h-[100px] shadow-md rounded-xl bg-white relative overflow-visible mb-20';

    // Изображение
    const img = document.createElement('img');
    img.src = data.img;
    img.alt = '';
    img.className = 'w-full h-[100px] object-contain absolute -top-16 left-0';

    // Блок с текстом
    const textBlock = document.createElement('div');
    textBlock.className = 'relative pt-[30px] px-3';

    // Название
    const title = document.createElement('h1');
    title.className = 'font-bold text-sm';
    title.textContent = data.name;

    // Категория
    const categoryEl = document.createElement('p');
    categoryEl.className = 'text-gray-500 text-xs font-semibold';
    categoryEl.textContent = data.cotegory; // у тебя в объекте "cotegory"

    // Цена
    const priceEl = document.createElement('p');
    priceEl.className = 'font-bold text-sm mt-1';
    priceEl.textContent = data.price.toLocaleString('ru-RU') + ' ₸' + '/кг';

    // Добавляем текстовые элементы в блок
    textBlock.appendChild(title);
    textBlock.appendChild(categoryEl);
    textBlock.appendChild(priceEl);

    // Добавляем изображение и текст в карточку
    card.appendChild(img);
    card.appendChild(textBlock);

    card.addEventListener('click', () => {
        openModal(data)
    })
    // Вставляем карточку в контейнер #card
    container.appendChild(card);
}

async function init() {
    const ini = await GetInfo();
    if (!ini) return;

    ini.forEach(element => {
        createProductCard(element);
    });
}

init();


function openModal(product) {
    const modal = document.querySelector('.modal');
    const phone = "77711592023";
    const message = `Здравствуйте, хочу заказать ${product.name} за ${product.price.toLocaleString('ru-RU')} ₸/кг`;
    // Наполняем контент
    modal.querySelector("#WhatsApp").href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    modal.querySelector(".modal-img").src = product.img;
    modal.querySelector(".modal-title").innerText = product.name;
    modal.querySelector(".modal-desc").innerText = product.description;
    modal.querySelector(".modal-price").innerText =
        product.price.toLocaleString('ru-RU') + ' ₸ / кг';

    // 1️⃣ Показываем modal
    modal.classList.remove('hidden');

    // 2️⃣ Даём браузеру применить стили
    requestAnimationFrame(() => {
        modal.classList.remove(
            'translate-y-[600px]',
            'opacity-0',
            'pointer-events-none'
        );
        modal.classList.add('translate-y-0', 'opacity-100');
    });
}


function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('translate-y-0', 'opacity-100');
    modal.classList.add('translate-y-[600px]', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

let close = document.getElementById('close')
close.addEventListener('click', () => {
    closeModal()
})