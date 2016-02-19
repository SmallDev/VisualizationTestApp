using System.Web;
using System.Web.Optimization;

namespace KendoDataVizTest
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                      "~/Scripts/jquery.min.js",
                      "~/Scripts/kendo.all.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/Scripts/app/dataVizMainViewModel.js"));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap/bootstrap-theme.css",
                      "~/Content/bootstrap/bootstrap.css",
                      "~/Content/bootstrap/bootstrap.css.map",
                      "~/Content/kendo/kendo.bootstrap.min.css",
                      "~/Content/kendo/kendo.bootstrap.min.css.map",
                      "~/Content/kendo/kendo.common-bootstrap.min.css",
                      "~/Content/kendo/kendo.common-bootstrap.min.css.map",
                      "~/Content/site.css"));
        }
    }
}
