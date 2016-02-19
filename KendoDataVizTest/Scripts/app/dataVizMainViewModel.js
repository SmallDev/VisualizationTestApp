function DataVizViewModel() {
    var self = this;
    this.radialGaugeIsVisible = true;
    this.linearGaugeIsVisible = false;

    this.showRadialGauge = function () {
        this.set("radialGaugeIsVisible", true);
        this.set("linearGaugeIsVisible", false);
    };

    this.showLinearGauge = function () {
        this.set("radialGaugeIsVisible", false);
        this.set("linearGaugeIsVisible", true);
    };

    this.updateData = false;

    this.toggleUpdateState = function(){
        if(this.updateData){
            this.set("updateData", false);
        }
        else {
            this.set("updateData", true);
            updateDataWorker(this);
        }
    };

    this.minValue = 0;
    this.maxValue = 100;
    this.currentValue = 1;
    this.upDirection = true;

    this.onChangeMinValue = function () {
        var gauge = $("#radial-gauge-mv").data("kendoRadialGauge");
        var ranges = gauge.options.scale.ranges;
        ranges[0].from = this.minValue;
        this.set('currentValue', this.minValue);
        gauge.redraw();
    };

    this.onChangeMaxValue = function () {
        var gauge = $("#radial-gauge-mv").data("kendoRadialGauge");
        var ranges = gauge.options.scale.ranges;
        ranges[0].to = this.maxValue;
        this.set('currentValue', this.minValue);
        gauge.redraw();
    };

    function updateDataWorker(that) {
        jQuery.ajax({
            url: "/DataViz/GetRadialGuageData",
            type: "POST",
            data: getData(that),
            success: function (data) {
                setData(that, data);
                if (that.updateData) {
                    setTimeout(function () { updateDataWorker(that); }, 1000);
                }
            },
            cache: false
        });
    };

    function setData(that, data) {
        that.set('minValue', data.Min);
        that.set('maxValue', data.Max);
        that.set('currentValue', data.CurrentValue);
        that.set('upDirection', data.UpDirection);
    };

    function getData(that) {
        return {
            Min: that.minValue,
            Max: that.maxValue,
            CurrentValue: that.currentValue,
            UpDirection: that.upDirection
        }
    };
}