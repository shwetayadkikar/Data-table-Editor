using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalGradebookPOC.Models
{
    public class DataTableCellPostModel
    {
        public string ColIndex { get; set; }
        public string RowIndex { get; set; }
        public string data { get; set; }
    }
}