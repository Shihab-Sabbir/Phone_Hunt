const showModal = async (id) => {
    let url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const details = data.data;
    const feature = details.mainFeatures;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    <div class="modal-header">
            <h5 class="modal-title">${details.name}</h5>
        </div>
        <div class="modal-body">
            <p><strong> Release Date :</strong> ${details.releaseDate ? details.releaseDate : 'No Data Found'}</p>
            <p><strong> Memory :</strong> ${feature.memory ? feature.memory : 'No Data Found'}</p>
            <p><strong> Chipset :</strong> ${feature.chipSet ? feature.chipSet : 'No Data Found'}</p>
            <p><strong> Display :</strong> ${feature.displaySize ? feature.displaySize : 'No Data Found'}</p>
            <p><strong> Storage :</strong> ${feature.storage ? feature.storage : 'No Data Found'}</p>
            <p class='text-wrap'><strong> Sensors :</strong> ${feature.sensors ? feature.sensors : 'No Data Found'}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `;

}