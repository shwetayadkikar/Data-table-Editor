var tableEditor = {
    table: '',

    fields: [],

    currentCell: {},

    currentRowIndex: -1,

    currentColIndex: -1,

    currentCellOldValue: {},

    oldCellText: {},

    keyPressed : false,

    ajax: '',

    init: function (inputTable, inputFields) {
        this.table = inputTable;
        this.fields = inputFields;
        this.setArrowKeysNavigation();
    },

    isCellInEditMode: function (cell) {
        return !($(cell).find('select').length <= 0 && $(cell).find('input[type="text"]').length <= 0);
    },

    makeCellEditable: function (cell) {
        if (this.currentCell != cell || (this.currentCell == cell && !this.isCellInEditMode(cell))) {
            //save for key navigation
            this.oldCellText = this.currentCellOldValue;

            var self = this;
            console.log('inside makeEditable');
            //remove input controls in other cells when any cell is clicked
            //var otherEditableCells = $(this.table).find('tbody td').not(this.currentCell).filter(function () { return ($(this).find('select').length > 0 || $(this).find('input[type="text"]').length > 0) });

            //otherEditableCells.each(function () {
            //    self.updateCell(this);
            //});

            var colIndex = $(cell).closest('table').find('th').eq($(cell).index()).data("id");
            var type = this.fields[colIndex].type;
            this.currentCell = cell;

            this.currentCellOldValue = $(cell).text();

            this.currentRowIndex = mytable.row($(tableEditor.currentCell).parent()).index() + 1;
            this.currentColIndex = $(tableEditor.currentCell).index();

            //create an input element on the basis of type
            if (type.toUpperCase() === "SELECT") {
                var options = this.fields[colIndex].options;
                elem = $('<select id ="' + colIndex + '" class="dropdown">');
                for (var i = 0; i < options.length; i++) {
                    if (options[i].toUpperCase() === $(cell).text().toUpperCase()) {
                        elem.append('<option value="' + options[i] + '" selected="selected">' + options[i] + '</option>');
                    }
                    else {
                        elem.append('<option value="' + options[i] + '">' + options[i] + '</option>');
                    }
                }
            }
            else {
                elem = $('<input id ="' + colIndex + '" type="text" value="' + $(cell).text() + '" style="width:75%">');
            }
            $(cell).html(elem);
            $("#" + colIndex).focus();
            
        }
    },

    updateCell: function (cell) {
        var newval = $(cell).find("select").length > 0 ? $(cell).find("select").val() : $(cell).find("input[type='text']").val();
        console.log("updating " + newval);
        $(cell).text(newval);
        this.postData(cell);
    },

    postData: function (cell) {
        console.log("this.oldCellText " + this.oldCellText);
        console.log("current cell text " + $(cell).text());
       
        if (((!this.keyPressed) && this.currentCellOldValue != $(cell).text()) || (this.keyPressed && this.oldCellText != $(cell).text())) {
            var postModel = {
                ColIndex: $(cell).closest('table').find('th').eq($(cell).index()).data("id"),
                RowIndex: mytable.data()[this.currentRowIndex][0],
                data: $(cell).text()
            };
           
            console.log("post now: " + postModel.data);
            ////ajax call
            $.ajax({
                url: "PostData",
                data: postModel,
                cache: false,
                type: "POST",
                success: function (data) {
                    toastr.success(data);
                }
            });
            this.keyPressed = false;
        }
        //this.currentCell = {};
        //this.currentRowIndex = -1;
        //this.currentColIndex = -1;
    },

    setArrowKeysNavigation: function () {
        var self = this;
        $(this.table).on('blur', 'tbody td', function (e) {
            console.log('inside blur');
            tableEditor.updateCell(this);            
        });

        $(document).keydown(function (e) {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    console.log("left clicked");
                    if (self.currentColIndex > 0) {
                        self.currentColIndex = self.currentColIndex - 1;
                    }
                    console.log("col : " + self.currentColIndex);
                    console.log("row : " + self.currentRowIndex);
                    var newCell = $($('#myDataTable tr')[self.currentRowIndex]).find('td')[self.currentColIndex];
                    console.log("newcell : " + $(newCell).text());
                    self.keyPressed = true;
                    self.makeCellEditable(newCell);
                    break;
                //case 38:
                //    console.log("up");
                //    if (self.currentColIndex > 0) {
                //        self.currentRowIndex = self.currentRowIndex - 1;
                //    }
                //    console.log("col : " + self.currentColIndex);
                //    console.log("row : " + self.currentRowIndex);
                //    var newCell = $($('#myDataTable tr')[self.currentRowIndex]).find('td')[self.currentColIndex];
                //    console.log("newcell : " + $(newCell).text());
                //    self.keyPressed = true;
                //    self.makeCellEditable(newCell);
                //    break;
                case 39:
                    console.log("right");
                    if (self.currentColIndex < self.fields.length) {
                        self.currentColIndex = self.currentColIndex + 1;
                    }
                    console.log("col : " + self.currentColIndex);
                    console.log("row : " + self.currentRowIndex);
                    var newCell = $($('#myDataTable tr')[self.currentRowIndex]).find('td')[self.currentColIndex];
                    console.log("newcell : " + $(newCell).text());
                    self.keyPressed = true;
                    self.makeCellEditable(newCell);
                    break;
                case 9:
                    console.log("down");
                    if (self.currentRowIndex < 10) {
                        self.currentRowIndex = self.currentRowIndex + 1;
                    }
                    console.log("col : " + self.currentColIndex);
                    console.log("row : " + self.currentRowIndex);
                    var newCell = $($('#myDataTable tr')[self.currentRowIndex]).find('td')[self.currentColIndex];
                    console.log("newcell : " + $(newCell).text());
                    self.keyPressed = true;
                    self.makeCellEditable(newCell);
                    break;
            }
        });
    }

}

