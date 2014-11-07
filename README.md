Data-table-Editor
=================

A plugin which allows editing a Jquery Data Table (1.10.2)

###It provides following features:
1. In place editing for jquery Data tables
2. Update cell data on blur
3. Navigate through the tabel cells using keyboard
   1. Tab => move down
   2. Left arrow key => move left
   3. Right arrow key => move right
4. Cell data validation

###Using Data table editor

1. Copy tableEditor.js file in your script folder and refer it properly
2. Below is an example of how to use the editor in code

```
var columns = [];
columns.push({ "data": "col1", "width": "80px" });
columns.push({ "data": "col2", "width": "80px" });
columns.push({ "data": "col3", "width": "80px" });
columns.push({ "data": "col4", "width": "80px" });
columns.push({ "data": "col5", "width": "80px" });

var fields = [];
var options = [];
options.push('opt1');
options.push('opt2');
options.push('opt3');
fields.push({  "type": "text" });
fields.push({  "type": "text" });
fields.push({  "type": "select",
               "options": options });
fields.push({  "type": "select",
               "options": options });
fields.push({  "type": "text" });

 var mytable = $('#myDataTable').DataTable({
        dom: "Tfrtip",
        ajax: 'Home/GetData',
        searching: false,
        paging: false,
        ordering: false,
        columns: columns,
        drawCallback: function (settings) {
            console.log('DataTables has redrawn the table');
        },
        initComplete: function () {
            tableEditor.init("#myDataTable", fields, 'Home/PostData', mytable);// parameters :tableId, fields types, ajax url for posting data, Datatable object
        }
    });

```

###Validations:
In order for validations to work, create a hidden field in <th> of every column with name "colInputType" and set the type as either 'string','%', 'Float'. Strings will allow all possible strings. '%' is for percentages, 'Float' is for numbers


P.S. : Editor uses tostr.js for displaying errors. So include that.
