using KendoDataVizTest.Models;
using KendoDataVizTest.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KendoDataVizTest.Controllers
{
    public class DataVizController : Controller
    {
        IDataVizDataGenerator _dataVizService;
        public DataVizController(IDataVizDataGenerator dataVizService)
        {
            if (dataVizService == null) throw new ArgumentNullException();

            _dataVizService = dataVizService;
        }

        public ActionResult Index()
        {
            return View("DataViz");
        }

        [HttpPost]
        public ActionResult GetRadialGuageData(RadialGuageData rdData)
        {
            var resultData = _dataVizService.GerRadialGuageValue(rdData);

            return Json(resultData);
        }

        [HttpPost]
        public ActionResult GetLinearGuageData(LinearGuageData lnData)
        {
            var resultData = _dataVizService.GetLinearGuageValue(lnData);

            return Json(resultData);
        }
    }
}