using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalGradebookPOC.Models
{
    public class ColumnsModel
    {

        public string ColumnName { get; set; }
        public string Index { get; set; }
        public string Type { get; set; }
        public string PossibleValues { get; set; }

    }
}