using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoDataVizTest.Models
{
    public class RadialGuageData
    {
        public int Min { get; set; }
        public int Max { get; set; }
        public int CurrentValue { get; set; }
        public bool UpDirection { get; set; }
    }
}