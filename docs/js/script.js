document.addEventListener('DOMContentLoaded', function() {
    fetch('data/software_data.json')
        .then(response => response.json())
        .then(data => {
            const tableContainer = document.getElementById('softwareTable');
            let tableHTML = "<table>";
            // Dynamically create headers based on unique modalities
            let headers = new Set();
            data.forEach(category => {
                category.applications.forEach(app => {
                    app.modalities.forEach(modality => headers.add(modality));
                });
            });
            tableHTML += "<tr><th>Application</th>";
            headers.forEach(header => {
                tableHTML += `<th>${header}</th>`;
            });
            tableHTML += "</tr>";

            // Add rows per category
            data.forEach(category => {
                tableHTML += `<tr><td colspan="${headers.size + 1}" style="background-color: #f0f0f0;"><strong>${category.category}</strong></td></tr>`;
                category.applications.forEach(app => {
                    tableHTML += `<tr><td>${app.name}</td>`;
                    headers.forEach(header => {
                        if (app.modalities.includes(header)) {
                            tableHTML += `<td><a href="${app.link}">Link</a></td>`;
                        } else {
                            tableHTML += "<td></td>";
                        }
                    });
                    tableHTML += "</tr>";
                });
            });
            tableHTML += "</table>";
            tableContainer.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading the software data:', error));
});

