const loading = (isLoading) => {
    const viewAll = document.getElementById('loading');
    if (isLoading) { noData.classList.remove('d-none') }
    else { noData.classList.add('d-none') }
};
const displayData = (phones) => {
    const parent = document.getElementById('phone-container');
    parent.innerHTML = '';
    const viewAll = document.getElementById('viewAll');
    if (phones.length > 6) { phones = phones.slice(0, 6); viewAll.classList.remove('d-none') }
    else { viewAll.classList.add('d-none') };
    for (const phone of phones) {
        let { brand, phone_name, image, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
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
    const searchData = document.getElementById('search-input');
    loadData(searchData.value);
};

const viewAllPhones = () => {
    console.log(4)
};

// deafult call with random;

const random = Math.round(Math.random() * 10);

switch (true) {
    case random >= 0 && random <= 2: loadData('samsung'); break;
    case random >= 3 && random <= 5: loadData('oppo'); break;
    case random >= 6 && random <= 8: loadData('Huawei'); break;
    case random >= 9 && random <= 10: loadData('iphone'); break;
    default: loadData('iphone'); break;
}

