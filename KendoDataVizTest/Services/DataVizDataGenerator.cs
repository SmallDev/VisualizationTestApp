using KendoDataVizTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoDataVizTest.Services
{
    public class DataVizDataGenerator : IDataVizDataGenerator
    {
        private const float APointStep = 1.5f;
        private const float BPointStep = 2f;
        private const float CPointStep = 4f;
        private const float progressLimit = 100f;

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

        public LinearGuageData GetLinearGuageValue(LinearGuageData data)
        {
            if(data.PointA + APointStep > progressLimit)
            {
                data.PointA = progressLimit;
            }
            else
            {
                data.PointA = data.PointA + APointStep;
            }

            if (data.PointB + BPointStep > progressLimit)
            {
                data.PointB = progressLimit;
            }
            else
            {
                data.PointB = data.PointB + BPointStep;
            }

            if (data.PointC + CPointStep > progressLimit)
            {
                data.PointC = progressLimit;
            }
            else
            {
                data.PointC = data.PointC + CPointStep;
            }

            if(data.PointA == progressLimit && data.PointB == progressLimit && data.PointC == progressLimit)
            {
                data.LimitReached = true;
            }

            return data;
        }
    }
}