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

//-------------------Progress Logic-------------------------------------
    this.PointA = 0;
    this.PointB = 0;
    this.PointC = 0;
    this.limitReached = false;
    this.progressOnPause = false;

    this.startLinearProgress = function () {
        this.set("progressOnPause", false);
        updateProgressDataWorker(this);
    };

    this.pauseLinearProgress = function () {
        this.set("progressOnPause", true);
    };

    this.resetLinearProgress = function()
    {
        this.set("progressOnPause", true);
        this.set("limitReached", false);
        this.set('PointA', 0);
        this.set('PointB', 0);
        this.set('PointC', 0);
        setNullProgressPoints();
    }

    function updateProgressDataWorker(that) {
        jQuery.ajax({
            url: "/DataViz/GetLinearGuageData",
            type: "POST",
            data: getProgressData(that),
            success: function (data) {
                setProgressData(that, data);
                if (!that.limitReached && !that.progressOnPause) {
                    setTimeout(function () { updateProgressDataWorker(that); }, 600);
                }
            },
            cache: false
        });
    };

    function setProgressData(that, data) {
        that.set('PointA', data.PointA);
        that.set('PointB', data.PointB);
        that.set('PointC', data.PointC);
        that.set('limitReached', data.LimitReached);
        setProgressPoints(that)
        
    };

    function setProgressPoints(that) {
        var gauge = $("#linear-progress").data("kendoLinearGauge");
        gauge.pointers[0].value(that.PointA);
        gauge.pointers[1].value(that.PointB);
        gauge.pointers[2].value(that.PointC);
    };

    function setNullProgressPoints() {
        var gauge = $("#linear-progress").data("kendoLinearGauge");
        gauge.pointers[0].value(0);
        gauge.pointers[1].value(0);
        gauge.pointers[2].value(0);
    };



    function getProgressData(that) {
        return {
            PointA: that.PointA.toString().replace(/\./g, ','),
            PointB: that.PointB.toString().replace(/\./g, ','),
            PointC: that.PointC.toString().replace(/\./g, ','),
            LimitReached: that.limitReached
        }
    };


}