document.addEventListener('DOMContentLoaded', function() {
    fetch('data/software_data.json')
        .then(response => response.json())
        .then(data => {
            const tableContainer = document.getElementById('softwareTable');
            let tableHTML = "<table>";
            
            // Dynamically create headers based on unique modalities and other fields
            let headers = ["Name", "Modality", "Language", "Task", "License", "Publication", "Docs", "Tests", "Contact", "Link"];
            tableHTML += "<tr>";
            headers.forEach(header => {
                tableHTML += `<th>${header}</th>`;
            });
            tableHTML += "</tr>";

            // Add rows for each software entry
            data.forEach(software => {
                tableHTML += `<tr>`;
                tableHTML += `<td>${software.name}</td>`;
                tableHTML += `<td>${software.modality}</td>`;
                tableHTML += `<td>${software.language}</td>`;
                tableHTML += `<td>${software.task}</td>`;
                tableHTML += `<td>${software.license}</td>`;
                tableHTML += `<td><a href="${software.publication}">Publication</a></td>`;
                tableHTML += `<td><a href="${software.manual_docs}">Docs</a></td>`;
                tableHTML += `<td>${software.tests}</td>`;
                tableHTML += `<td>${software.contact}</td>`;
                tableHTML += `<td><a href="${software.link}">Link</a></td>`;
                tableHTML += `</tr>`;
            });

            tableHTML += "</table>";
            tableContainer.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading the software data:', error));
});
