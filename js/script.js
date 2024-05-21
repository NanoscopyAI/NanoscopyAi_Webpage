document.addEventListener('DOMContentLoaded', function() {
    fetch('data/software_data.json') 
        .then(response => response.json())
        .then(data => {
            const matrixContainer = document.getElementById('matrixTable');
            const tableContainer = document.getElementById('softwareTable');
            let matrixHTML = "<table>";
            let tableHTML = "<table>";

            // Define applications and input types
            const applications = ["Data Packaging", "Data Processing (reconstruction)", "Data Analysis", "Statistical Analysis"];
            const inputTypes = ["Point cloud (SMLM)", "Pixel/Voxel"];

            // Create headers for the matrix table
            matrixHTML += "<tr><th>Application / Input Type</th>";
            inputTypes.forEach(type => {
                matrixHTML += `<th>${type}</th>`;
            });
            matrixHTML += "</tr>";

            // Create matrix table rows
            applications.forEach(app => {
                matrixHTML += `<tr><td>${app}</td>`;
                inputTypes.forEach(type => {
                    matrixHTML += "<td>";
                    data.filter(item => item.application === app && item.inputType === type)
                        .forEach(item => {
                            matrixHTML += `<a href="#${item.name.replace(/\s+/g, '')}">${item.name}</a><br>`;
                        });
                    matrixHTML += "</td>";
                });
                matrixHTML += "</tr>";
            });
            matrixHTML += "</table>";
            matrixContainer.innerHTML = matrixHTML;

            // Headers for the detailed software table
            tableHTML += "<tr><th>Name</th><th>Modality</th><th>Language</th><th>Task</th><th>License</th><th>Publication</th><th>Docs</th><th>Tests</th><th>Contact</th><th>Link</th></tr>";

            // Rows for the detailed table
            data.forEach(software => {
                tableHTML += `<tr id="${software.name.replace(/\s+/g, '')}">`;
                tableHTML += `<td>${software.name}</td><td>${software.modality}</td><td>${software.language}</td><td>${software.task}</td><td>${software.license}</td>`;
                tableHTML += `<td><a href="${software.publication}">Publication</a></td>`;
                tableHTML += `<td><a href="${software.manual_docs}">Docs</a></td>`;
                tableHTML += `<td>${software.tests}</td><td>${software.contact}</td>`;
                tableHTML += `<td><a href="${software.link}">Link</a></td>`;
                tableHTML += `</tr>`;
            });
            tableHTML += "</table>";
            tableContainer.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading the software data:', error));
});
