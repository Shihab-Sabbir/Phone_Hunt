const loading = (isLoading) => {
    const loading = document.getElementById('loading');
    const noData = document.getElementById('noData');
    const viewAll = document.getElementById('viewAll');
    const showLess = document.getElementById('showLess');
    const phoneContainer = document.getElementById('phone-container');
    function hide(name) { name.classList.add('d-none') };
    if (isLoading === true) { loading.classList.remove('d-none'); hide(noData); hide(viewAll); hide(showLess); hide(phoneContainer) }
    else { hide(loading); phoneContainer.classList.remove('d-none')};
};
const displayData = (phones, limit = 6) => {
    const parent = document.getElementById('phone-container');
    parent.innerHTML = '';
    let newPhones = viewLimit(phones, limit);
    document.getElementById('viewAll').addEventListener('click', function () {
        displayData(phones, phones.length); //to show all
        showHide('showLess', 'viewAll');
    })
    document.getElementById('showLess').addEventListener('click', function () {
        displayData(phones, 6); // to show less
        showHide('viewAll', 'showLess');
    })
    for (const phone of newPhones) {
        let { brand, phone_name, image, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.classList.add('shadow');
        phoneDiv.innerHTML = `
            <div class="card p-2">
                <img src="${image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title text-center">${brand}</h5>
                    <p class="card-text text-center">${phone_name}</p>
                </div>
                <button class='btn btn-outline-info w-50 mx-auto fw-bold'data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showModal('${slug}')">DETAILS</button>
            </div>
    `;
        parent.appendChild(phoneDiv);
    }
    loading(false);
    return phones;
};

const loadData = async (search) => {
    loading(true);
    const noData = document.getElementById('noData');
    let url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
    if (data.data.length === 0) { noData.classList.remove('d-none') }
    else { noData.classList.add('d-none') }
};

const search = () => {
    this.event.preventDefault();
    loading(true);
    const searchData = document.getElementById('search-input');
    loadData(searchData.value);
};

function viewLimit(phones, limit) {
    const viewAll = document.getElementById('viewAll');
    if (phones.length > 6) { phones = phones.slice(0, limit); showHide('viewAll', 'showLess'); }
    else { phones = phones; viewAll.classList.add('d-none') };
    return phones;
}

function showHide(show, hide) {
    document.getElementById(hide).classList.add('d-none');
    document.getElementById(show).classList.remove('d-none');
}

// call with category

let categotyButtons = document.querySelectorAll('.dropdown-item');
for (const button of categotyButtons) {
    button.addEventListener('click', function (event) {
        loadData(event.target.innerText);
    })
}

// deafult call with random;

const random = Math.round(Math.random() * 10);

switch (true) {
    case random >= 0 && random <= 2: loadData('samsung'); loading(true); break;
    case random >= 3 && random <= 5: loadData('oppo'); loading(true); break;
    case random >= 6 && random <= 8: loadData('Huawei'); loading(true); break;
    case random >= 9 && random <= 10: loadData('iphone'); loading(true); break;
    default: loadData('iphone'); break;
}

// reload
function reload() {
    loading(true);
    location.reload();
}
