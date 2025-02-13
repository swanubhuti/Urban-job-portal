function loadProviderCategories() {
    const providerCategory = document.getElementById("providerCategory");
    providerCategory.innerHTML = "";

    let services = JSON.parse(localStorage.getItem("services")) || [];
    let categories = [...new Set(services.map(service => service.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        providerCategory.appendChild(option);
    });
}

function showRequests() {
    const providerCategory = document.getElementById("providerCategory").value;
    const requestList = document.getElementById("requestList");
    requestList.innerHTML = "";

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    let filteredRequests = requests.filter(req => req.category === providerCategory);

    if (filteredRequests.length > 0) {
        filteredRequests.forEach((req, index) => {
            let requestDiv = document.createElement("div");
            requestDiv.classList.add("request-item");
            requestDiv.innerHTML = `
                <strong>Issue:</strong> ${req.description} <br>
                <strong>Category:</strong> ${req.category}
                <br><button class="accept-btn" onclick="acceptRequest(${index})">Accept</button>
                <button class="reject-btn" onclick="rejectRequest(${index})">Reject</button>
            `;
            requestList.appendChild(requestDiv);
        });
    } else {
        requestList.innerHTML = "<p>No requests available for this category.</p>";
    }
}

function acceptRequest(index) {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    let acceptedRequests = JSON.parse(localStorage.getItem("acceptedRequests")) || [];

    let acceptedRequest = requests[index];
    acceptedRequest.status = "Accepted";

    acceptedRequests.push(acceptedRequest);
    localStorage.setItem("acceptedRequests", JSON.stringify(acceptedRequests));

    requests.splice(index, 1);
    localStorage.setItem("requests", JSON.stringify(requests));

    showRequests();
    alert("Request accepted successfully!");
}

function rejectRequest(index) {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.splice(index, 1);
    localStorage.setItem("requests", JSON.stringify(requests));

    showRequests();
    alert("Request rejected successfully!");
}

loadProviderCategories();