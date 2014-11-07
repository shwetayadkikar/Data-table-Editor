var editor, mytable, carousel;
var columns = [];
var fields = [];
var visibleColumns = 10; //number of visible columns
$(document).ready(function () {

    //get dynamically generated columns and fields for binding
    getDataForBinding();


    console.log(fields);
   

    $('#myDataTable').on('click', 'tbody td', function (e) {
        tableEditor.makeCellEditable(this);
    });



    // set up datatable options
    mytable = $('#myDataTable').DataTable({
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
            //var midIndex = $("input[name='midDiv']").val();
            //console.log(midIndex);
            //carousel.goToSlide(midIndex - 4);
            tableEditor.init("#myDataTable", fields, 'PostData', mytable);
        }
    });

    //carousel settings
    carousel = $('#carousel').bxSlider({
        slideWidth: 90,
        minSlides: 1,
        maxSlides: 10,
        infiniteLoop: false,
        hideControlOnEnd: true,
        moveSlides: 1,
        pager: false,
        slideMargin: 10,
        onSliderLoad: function (currIndex) { _onSliderLoad(currIndex); },
        onSlideNext: function ($slide, oldIndex, newIndex) { _onSliderNext($slide, oldIndex, newIndex); },
        onSlidePrev: function ($slide, oldIndex, newIndex) { _onSlidePrev($slide, oldIndex, newIndex); }
    });
});

function getDataForBinding() {
    var colCount = $("input[name='colCount']").val();

    for (var k = 0; k < colCount; k++) {
        columns.push({ "data": k.toString(), "width": "80px" });
        var type = $("input[name='colType']").filter(function () { return $(this).data('id') === k; }).val();
        var options = [];
        if (type == "select") {
            var strPossValues = $("input[name='colPossValues']").filter(function () { return $(this).data('id') === k; }).val();
            var possValues = [];
            if (strPossValues) {
                options = strPossValues.split(",");
            }

            fields[k] =
           {
               "type": type,
               "options": options

           };
        }
        else {
            fields[k] =
                {
                    "type": type,
                };
        }
    }

}


function _onSliderLoad(currentIndex) {
    // alert("loading");
    console.log("Loaded Slider");
    //show only first %visibleColumns% cols 

    mytable.columns().visible(false);
    for (i = 1; i <= visibleColumns; i++) {
        mytable.column(i).visible(true);
    }
}


function _onSliderNext($slide, oldIndex, newIndex) {
    var totalColumns = mytable.column()[0].length;
    var columnToShowIndex = (newIndex + visibleColumns);
    if (columnToShowIndex <= totalColumns) {
        console.log("Show : " + columnToShowIndex);
        console.log("Hide : " + oldIndex);
        //hide first column
        mytable.columns(oldIndex).visible(false);
        //show new column
        mytable.columns(columnToShowIndex).visible(true);
        // var options = { direction: "right" }; $('#myDataTable').effect("slide", options, 1000);
    }
}

function _onSliderNext_slideAll($slide, oldIndex, newIndex) {
    var totalColumns = mytable.column()[0].length;
    //var columnToShowIndex = (newIndex + visibleColumns);

    var newIndexIncrementer = newIndex * visibleColumns;
    var oldIndexIncrementer = oldIndex * visibleColumns;
    console.log("Show : " + newIndexIncrementer);
    console.log("Hide : " + oldIndexIncrementer);
    if (newIndexIncrementer < totalColumns) {
        //hide curr visible columns
        for (i = 1; (i <= visibleColumns && i + oldIndexIncrementer >= 0 && i + oldIndexIncrementer < totalColumns) ; i++) {
            mytable.column(i + oldIndexIncrementer).visible(false);
        }

        ////show next lot of new columns
        for (i = 1; (i <= visibleColumns && i + newIndexIncrementer >= 0 && i + newIndexIncrementer < totalColumns) ; i++) {
            mytable.column(i + newIndexIncrementer).visible(true);
        }
    }
    //var options = { direction: "right" }; $('#gradebookDataTable').effect("slide", options, 1000);
}



function _onSlidePrev($slide, oldIndex, newIndex) {
    var totalColumns = mytable.column()[0].length;
    var columnToHideIndex = (oldIndex + visibleColumns);
    if (newIndex >= 0 && columnToHideIndex < totalColumns) {
        console.log("Show : " + newIndex);
        console.log("Hide : " + columnToHideIndex);
        //hide first column
        mytable.columns(columnToHideIndex).visible(false);
        //show new column
        mytable.columns(newIndex + 1).visible(true);
        // var options = { direction: "left" }; $('#gradebookDataTable').effect("slide", options, 1000);
    }
}


function _onSlidePrev_slideAll($slide, oldIndex, newIndex) {
    var totalColumns = mytable.column()[0].length;
    //var columnToShowIndex = (newIndex + visibleColumns);

    var newIndexIncrementer = newIndex * visibleColumns;
    var oldIndexIncrementer = oldIndex * visibleColumns;
    console.log("Show : " + newIndexIncrementer);
    console.log("Hide : " + oldIndexIncrementer);
    if (newIndexIncrementer >= 0) {
        //hide curr visible columns
        for (i = 1; (i <= visibleColumns && i + oldIndexIncrementer >= 0 && i + oldIndexIncrementer < totalColumns) ; i++) {
            mytable.column(i + oldIndexIncrementer).visible(false);
        }

        ////show next lot of new columns
        for (i = 1; (i <= visibleColumns && i + newIndexIncrementer >= 0 && i + newIndexIncrementer < totalColumns) ; i++) {
            mytable.column(i + newIndexIncrementer).visible(true);
        }
    }
    //var options = { direction: "left" }; $('#gradebookDataTable').effect("slide", options, 1000);
}
