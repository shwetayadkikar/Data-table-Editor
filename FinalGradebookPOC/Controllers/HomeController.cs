using FinalGradebookPOC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;



namespace FinalGradebookPOC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<ColumnsModel> model = new List<ColumnsModel>();
            model.Add(new ColumnsModel { ColumnName = "DT_rowid", Index = "0", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment1", Index = "1", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment2", Index = "2", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment3", Index = "3", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment4", Index = "4", Type = "select", PossibleValues = "A,B,C,D,E,F,G" });
            model.Add(new ColumnsModel { ColumnName = "Assignment5", Index = "5", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment6", Index = "6", Type = "select", PossibleValues = "MERIT,DIST,PASS,FAIL" });
            model.Add(new ColumnsModel { ColumnName = "Assignment7", Index = "7", Type = "select", PossibleValues = "GOOD,POOR,GREAT,WELL DONE, SEE ME" });
            model.Add(new ColumnsModel { ColumnName = "Assignment8", Index = "8", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment9", Index = "9", Type = "select", PossibleValues = "MERIT,DIST,PASS,FAIL" });
            model.Add(new ColumnsModel { ColumnName = "Assignment10", Index = "10", Type = "select", PossibleValues = "GOOD,POOR,GREAT,WELL DONE, SEE ME" });
            model.Add(new ColumnsModel { ColumnName = "Assignment11", Index = "11", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment12", Index = "12", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment13", Index = "13", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment14", Index = "14", Type = "select", PossibleValues = "A,B,C,D,E,F,G" });
            model.Add(new ColumnsModel { ColumnName = "Assignment15", Index = "15", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment16", Index = "16", Type = "select", PossibleValues = "A,B,C,D,E,F,G" });
            model.Add(new ColumnsModel { ColumnName = "Assignment17", Index = "17", Type = "string", PossibleValues = null });
            model.Add(new ColumnsModel { ColumnName = "Assignment18", Index = "18", Type = "select", PossibleValues = "MERIT,DIST,PASS,FAIL" });
            model.Add(new ColumnsModel { ColumnName = "Assignment19", Index = "19", Type = "select", PossibleValues = "GOOD,POOR,GREAT,WELL DONE, SEE ME" });
            model.Add(new ColumnsModel { ColumnName = "Assignment20", Index = "20", Type = "string", PossibleValues = null });
            return View(model);

        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult GetData()
        {
            var result = new List<string[]>();
            result.Add(new string[] { "id1", "67%", "45", "90", "A", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "A", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id2", "67%", "45", "90", "B", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "B", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id3", "67%", "45", "90", "C", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "C", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id4", "67%", "45", "90", "A", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "A", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id5", "67%", "45", "90", "A", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "A", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id6", "67%", "45", "90", "D", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "D", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id7", "67%", "45", "90", "A", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "D", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id8", "67%", "45", "90", "E", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "D", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id9", "67%", "45", "90", "A", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "D", "89", "MERIT", "GREAT", "78" });
            result.Add(new string[] { "id10", "67%", "45", "90", "F", "89", "MERIT", "GREAT", "78", "PASS", "WELL DONE", "59", "72%", "82", "D", "55", "D", "89", "MERIT", "GREAT", "78" });

            return Json(new
            {
                draw = 1,
                recordsFiltered = 10,
                recordsTotal = 10,
                data = result
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PostData(DataTableCellPostModel postedData)
        {
           //update database

            return Json("Successfully updated the score.", JsonRequestBehavior.AllowGet);
        }

    }
}