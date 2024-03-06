const scriptId =
  "AKfycbwO_GdzEfWlvpTuAKh4vt4Uy7H1bRZ9P138uO9ckDRUbwZ6xFI9-pjAUw3dmeEXWk9m";
const action = "read";
const url = `https://script.google.com/macros/s/${scriptId}/exec?action=${action}`;


let data = []; // Store fetched data here
var obj = {};

let fetchData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // obj = data;
      resolve(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      reject(error);
    }
  });
};

fetchData()
  .then((d1) => {
    obj = d1;
    console.log("Data fetched successfully:", obj);
    renderTable(obj);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });




  function renderTable(obj) {
    const tableHead = document.getElementById("thead");
  const tableBody = document.getElementById("myTbody");
  const filterDropdown = document.getElementById("filter");
  const pageSize = 20;
  let currentPage = 1;
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";
  let heading = document.createElement("tr");
  let customHeadings = ["Task Id ", "Step Code"];

    // applyFilter(obj.details)
  // Create Custem Heading
  tableHead.appendChild(createTableHead(obj, customHeadings));

  //create Heading
  // for (let a in obj.details[0]) {
  //   let headtd = document.createElement("td");
  //   headtd.textContent = a;
  //   heading.appendChild(headtd);
  // }
  // console.log(heading);
  // tableHead.appendChild(heading);

  // Create custem  body rows
  for (let i = 0; i < obj.details.length; i++) {
    let forid = i;
    let ss = obj.details[forid];
    let row = document.createElement("tr");
    row.innerHTML = `
               <td>${ss.tasknumber}</td>
               <td>${ss.stepcode}</td>
              `;
    tableBody.appendChild(row);
  }

  // Create body rows
  /*const headers = Object.keys(obj.details[0]);
    obj.details.forEach(rowData => {
      const row = document.createElement('tr');
      headers.forEach(header => {
        const cell = document.createElement('td');
        cell.textContent = rowData[header];
        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    });*/
}
function createTableHead(obj, customHeadings) {
  let heading = document.createElement("tr");

  // If customHeadings array is provided, use it, else use object keys from obj.details[0]
  let keys = customHeadings ? customHeadings : Object.keys(obj.details[0]);

  for (let a of keys) {
    let headtd = document.createElement("td");
    headtd.textContent = a;
    heading.appendChild(headtd);
  }

  return heading;
}





  
/*
function applyFilter(data) {
  let filteredData = obj.details;
  const filterValue = filterDropdown.value;
  if (filterValue === "all") {
    return data;
  }
  else{
    filterDropdown.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const filterKey = checkbox.id;
        filteredData = obj.details.filter(item => item[filterKey] === checkbox.checked);
        renderPage(currentPage);
      });
    });







  return data.filter((item) => item.category === filterValue);
}

}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / pageSize);
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      currentPage = i;
      renderTable(data);
    });
    pagination.appendChild(button);
  }
}
*/

// const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const filteredData = applyFilter(obj.details);
  // const paginatedData = filteredData.slice(startIndex, endIndex);
  // paginatedData.forEach((item) => {
  //   const row = document.createElement("tr");
  //   row.innerHTML = `
  //     <td>${item.id}</td>
  //     <td>${item.name}</td>
  //     <!-- Add more cells if needed -->
  //   `;
  //   tableBody.appendChild(row);
  // });
  // renderPagination(filteredData.length);
