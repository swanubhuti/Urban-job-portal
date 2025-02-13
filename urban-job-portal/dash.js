let services = JSON.parse(localStorage.getItem("services")) || [];
        let currentPage = 1;
        const itemsPerPage = 3;

        function renderServices(filteredServices = services) {
            const serviceList = document.getElementById('service-list');
            serviceList.innerHTML = '';

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentServices = filteredServices.slice(startIndex, endIndex);

            currentServices.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                serviceCard.onclick = redirectToLogin;

                const h3 = document.createElement('h3');
                h3.textContent = service.title;

                const p = document.createElement('p');
                p.textContent = service.description;

                const price = document.createElement('p');
                price.className = 'price';
                price.textContent = `Price: $${service.price}`;

                serviceCard.appendChild(h3);
                serviceCard.appendChild(p);
                serviceCard.appendChild(price);

                serviceList.appendChild(serviceCard);
            });

            document.getElementById('pageNumber').textContent = currentPage;
        }

        function searchService() {
            const query = document.getElementById('searchService').value.toLowerCase();
            const filtered = services.filter(service => 
                service.title.toLowerCase().includes(query)
            );
            renderServices(filtered);
        }

        function filterByPrice() {
            const min = parseInt(document.getElementById('minPrice').value) || 0;
            const max = parseInt(document.getElementById('maxPrice').value) || Infinity;

            const filtered = services.filter(service => 
                service.price >= min && service.price <= max
            );
            renderServices(filtered); //Filter logic
        }

        function sortServices() {
            const sortOption = document.getElementById('sortPrice').value;
            if (sortOption === "lowToHigh") {
                services.sort((a, b) => a.price - b.price);
            } else if (sortOption === "highToLow") {
                services.sort((a, b) => b.price - a.price);
            }
            renderServices();
        }

        function nextPage() {
            if ((currentPage * itemsPerPage) < services.length) {
                currentPage++;
                renderServices();
            }
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderServices();
            }
        }

        function redirectToLogin() {
            window.location.href = "login.html";
        }

        renderServices();