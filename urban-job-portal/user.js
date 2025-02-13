let services = JSON.parse(localStorage.getItem("services")) || [];
        let bookedServices = JSON.parse(localStorage.getItem("bookedServices")) || [];
        let currentPage = 1;
        const itemsPerPage = 3;
        let filteredServices = [...services];

        function renderServices() {
            const serviceList = document.getElementById('service-list');
            serviceList.innerHTML = '';

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentServices = filteredServices.slice(startIndex, endIndex);

            currentServices.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';

                serviceCard.innerHTML = `
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <p class="price">Price: $${service.price}</p>
                    <button class="book-btn" onclick="bookService('${service.title}', ${service.price})">Book Now</button>
                `;

                serviceList.appendChild(serviceCard);
            });

            document.getElementById('pageNumber').textContent = currentPage;
        }

        function bookService(title, price) {
            const userRequest = prompt("Enter your request details:");
            if (userRequest) {
                bookedServices.push({ title, price, request: userRequest });
                localStorage.setItem("bookedServices", JSON.stringify(bookedServices));

                let providerRequests = JSON.parse(localStorage.getItem("requests")) || [];
                providerRequests.push({ description: userRequest, category: title });
                localStorage.setItem("requests", JSON.stringify(providerRequests));

                loadBookings();
            }
        }

        function loadBookings() {
            const bookingList = document.getElementById('booking-list');
            bookingList.innerHTML = '';

            bookedServices.forEach((booking, index) => {
                const bookingCard = document.createElement('div');
                bookingCard.className = 'booking-card';

                bookingCard.innerHTML = `
                    <h3>${booking.title}</h3>
                    <p>${booking.request}</p>
                    <p class="price">Price: $${booking.price}</p>
                    <button class="edit-btn" onclick="editBooking(${index})">Edit</button>
                    <button class="cancel-btn" onclick="cancelBooking(${index})">Cancel</button>
                `;

                bookingList.appendChild(bookingCard);
            });

            localStorage.setItem("bookedServices", JSON.stringify(bookedServices));
        }

        function editBooking(index) {
            const newRequest = prompt("Edit your request details:", bookedServices[index].request);
            if (newRequest) {
                bookedServices[index].request = newRequest;
                localStorage.setItem("bookedServices", JSON.stringify(bookedServices));
                loadBookings();
            }
        }

        function cancelBooking(index) {
            bookedServices.splice(index, 1);
            localStorage.setItem("bookedServices", JSON.stringify(bookedServices));
            loadBookings();
        }

        function sortServices() {
            const sortOption = document.getElementById('sortPrice').value;

            if (sortOption === "lowToHigh") {
                filteredServices.sort((a, b) => a.price - b.price);
            } else if (sortOption === "highToLow") {
                filteredServices.sort((a, b) => b.price - a.price);
            }

            renderServices();
        }

        function searchService() {
            const query = document.getElementById('searchService').value.toLowerCase();
            filteredServices = services.filter(service => service.title.toLowerCase().includes(query));
            renderServices();
        }

        function filterByPrice() {
            const minPrice = document.getElementById('minPrice').value;
            const maxPrice = document.getElementById('maxPrice').value;

            filteredServices = services.filter(service => {
                const price = service.price;
                return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
            });

            renderServices();
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderServices();
            }
        }

        function nextPage() {
            if (currentPage * itemsPerPage < filteredServices.length) {
                currentPage++;
                renderServices();
            }
        }

        renderServices();