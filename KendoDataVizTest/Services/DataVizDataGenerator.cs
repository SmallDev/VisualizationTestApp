using KendoDataVizTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoDataVizTest.Services
{
    public class DataVizDataGenerator : IDataVizDataGenerator
    {
        public RadialGuageData GerRadialGuageValue(RadialGuageData data)
        {
            var rand = new Random();

            if (data.UpDirection == true)
            {
                var upValue = rand.Next(0, 10);
                if(data.CurrentValue + upValue >= data.Max)
                {
                    data.CurrentValue = data.Max;
                    data.UpDirection = false;
                    
                }
                else
                {
                    data.CurrentValue = data.CurrentValue + upValue;
                }                
            }
            else
            {
                var downValue = rand.Next(0, 10);

                if (data.CurrentValue - downValue < data.Min)
                {
                    data.CurrentValue = data.Min;
                    data.UpDirection = true;
                }
                else
                {
                    data.CurrentValue = data.CurrentValue - downValue;
                }
            }

            return data;
        }
    }
}