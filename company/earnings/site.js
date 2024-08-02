$(document).ready(function() {
    // Sample data for demonstration
    const storeEarningsClaims = [
        { 
            id: "1", 
            storeId: 1, 
            price: 100, 
            soldTime: "2024-07-01T12:00:00Z", 
            withDrawStatus: "NoAction", 
            currency: "USD",
            product: { title: "Product A", productImages: [{ imageUrl: "https://via.placeholder.com/50" }] }
        },
        { 
            id: "2", 
            storeId: 1, 
            price: 200, 
            soldTime: "2024-07-03T12:00:00Z", 
            withDrawStatus: "NoAction", 
            currency: "USD",
            product: { title: "Product B", productImages: [{ imageUrl: "https://via.placeholder.com/50" }] }
        },
        { 
            id: "3", 
            storeId: 1, 
            price: 50, 
            soldTime: "2024-07-05T12:00:00Z", 
            withDrawStatus: "Paid", 
            currency: "USD",
            product: { title: "Product C", productImages: [{ imageUrl: "https://via.placeholder.com/50" }] }
        },
        // Add more data as needed
    ];

    const totalUnpaidIncome = storeEarningsClaims
        .filter(claim => claim.withDrawStatus === "NoAction")
        .reduce((sum, claim) => sum + claim.price, 0);

    const last7DaysSales = storeEarningsClaims
        .filter(claim => {
            const soldDate = new Date(claim.soldTime);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - soldDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7;
        })
        .reduce((sum, claim) => sum + claim.price, 0);

    const totalEarnings = storeEarningsClaims.reduce((sum, claim) => sum + claim.price, 0);

    const totalPaidIncome = storeEarningsClaims
        .filter(claim => claim.withDrawStatus === "Paid")
        .reduce((sum, claim) => sum + claim.price, 0);

    $('#totalUnpaidIncome').text(`$${totalUnpaidIncome}`);
    $('#last7DaysSales').text(`$${last7DaysSales}`);
    $('#totalEarnings').text(`$${totalEarnings}`);
    $('#totalPaidIncome').text(`$${totalPaidIncome}`);

    const earningsData = {
        labels: storeEarningsClaims.map(claim => new Date(claim.soldTime).toLocaleDateString()),
        datasets: [{
            label: 'Earnings',
            data: storeEarningsClaims.map(claim => claim.price),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const ctx = document.getElementById('earningsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: earningsData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Populate datatable
    $('#earningsTable').DataTable({
        data: storeEarningsClaims,
        columns: [
            { data: 'id' },
            { data: 'storeId' },
            { data: 'product.title', render: function(data, type, row) {
                return `<div><img src="${row.product.productImages[0].imageUrl}" alt="Product Image" style="width: 50px; height: 50px;"> ${data}</div>`;
            }},
            { data: 'price' },
            { data: 'soldTime', render: function(data) { return new Date(data).toLocaleString(); } },
            { data: 'withDrawStatus' },
            { data: 'currency' }
        ]
    });

    // Handle claim earnings button
    $('#claimEarningsBtn').click(function() {
        alert(`Claiming earnings: $${totalUnpaidIncome}`);
        // Add logic to handle earnings claim
    });

    // Handle no data case
    if (storeEarningsClaims.length === 0) {
        alert("No data available");
        // Animate the related fields
        $('.card-body h5').text('$0');
        $('#earningsChart').hide();
        $('#earningsTable').hide();
    }
});
