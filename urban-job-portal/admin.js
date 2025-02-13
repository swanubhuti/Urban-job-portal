function logout() {
    localStorage.removeItem('role');
    window.location.href = 'login.html';
}

function showServiceForm() {
    document.getElementById('service-form').style.display = 'block';
    document.getElementById('provider-form').style.display = 'none';
}

function loadServices() {
    let services = JSON.parse(localStorage.getItem("services")) || [];
    const servicesTable = document.getElementById('services-table');
    servicesTable.innerHTML = '';
    
    services.forEach((service, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.title}</td>
            <td>${service.description}</td>
            <td>${service.price}</td>
            <td>${service.category}</td>
            <td>
                <button onclick="editService(${index})">Edit</button>
                <button onclick="deleteService(${index})">Delete</button>
            </td>
        `;
        servicesTable.appendChild(row);
    });
}

function addService() {
    const title = document.getElementById('serviceTitle').value;
    const description = document.getElementById('serviceDescription').value;
    const price = document.getElementById('servicePrice').value;
    const category = document.getElementById('serviceCategory').value;
    
    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.push({ title, description, price, category });
    localStorage.setItem("services", JSON.stringify(services));
    
    loadServices();
}

function editService(index) {
    let services = JSON.parse(localStorage.getItem("services")) || [];
    const service = services[index];
    
    const title = prompt('Edit service title:', service.title);
    const description = prompt('Edit service description:', service.description);
    const price = prompt('Edit service price:', service.price);
    const category = prompt('Edit service category:', service.category);
    
    services[index] = { title, description, price, category };
    localStorage.setItem("services", JSON.stringify(services));
    
    loadServices();
}

function deleteService(index) {
    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.splice(index, 1);
    localStorage.setItem("services", JSON.stringify(services));
    
    loadServices();
}

function loadProviders() {
    let providers = JSON.parse(localStorage.getItem("providers")) || [];
    const providersTable = document.getElementById('providers-table');
    providersTable.innerHTML = '';
    
    providers.forEach((provider, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${provider.name}</td>
            <td>${provider.category}</td>
            <td>
                <button onclick="editProvider(${index})">Edit</button>
                <button onclick="deleteProvider(${index})">Delete</button>
            </td>
        `;
        providersTable.appendChild(row);
    });
}

function addProvider() {
    const name = document.getElementById('providerName').value;
    const category = document.getElementById('providerCategory').value;
    
    let providers = JSON.parse(localStorage.getItem("providers")) || [];
    providers.push({ name, category });
    localStorage.setItem("providers", JSON.stringify(providers));
    
    loadProviders();
}

function editProvider(index) {
    let providers = JSON.parse(localStorage.getItem("providers")) || [];
    const provider = providers[index];
    
    const name = prompt('Edit provider name:', provider.name);
    const category = prompt('Edit provider category:', provider.category);
    
    providers[index] = { name, category };
    localStorage.setItem("providers", JSON.stringify(providers));
    
    loadProviders();
}

function deleteProvider(index) {
    let providers = JSON.parse(localStorage.getItem("providers")) || [];
    providers.splice(index, 1);
    localStorage.setItem("providers", JSON.stringify(providers));
    
    loadProviders();
}

loadServices();