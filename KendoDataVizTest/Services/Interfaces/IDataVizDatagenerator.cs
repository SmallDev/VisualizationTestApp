using KendoDataVizTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoDataVizTest.Services
{
    public interface IDataVizDataGenerator
    {
        RadialGuageData GerRadialGuageValue(RadialGuageData data);

        LinearGuageData GetLinearGuageValue(LinearGuageData data);

    }
}
