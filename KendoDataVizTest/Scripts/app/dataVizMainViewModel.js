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
    this.updateInProgress = false;

    this.startLinearProgress = function () {
        this.set("progressOnPause", false);
        this.set('updateInProgress', false);
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
                    setTimeout(function () { updateProgressDataWorker(that); }, 500);
                }
            },
            cache: false
        });
    };

    function setProgressData(that, data) {
        that.set('limitReached', data.LimitReached);
        if (!that.updateInProgress) {
            that.set('updateInProgress', true);
            setProgressPoints(that, data)
        }
        
    };

    function setProgressPoints(that, data) {
        if (that.progressOnPause)
            return;

        var diffA = data.PointA - that.PointA.toFixed(1);
        var diffB = data.PointB - that.PointB.toFixed(1);
        var diffC = data.PointC - that.PointC.toFixed(1);

        if (diffA == 0 && diffB == 0 && diffC == 0) {
            that.set('updateInProgress', false);
            return;
        }
        if (diffA > 0) {
            that.PointA = Number((that.PointA + 0.1).toFixed(1));
        }

        if (diffB > 0) {
            that.PointB = Number((that.PointB + 0.1).toFixed(1));
        }

        if (diffC > 0) {
            that.PointC = Number((that.PointC + 0.1).toFixed(1));
        }

        console.log("PontA: " + that.PointA + "  PontB: " + that.PointB + "  PontC: " + that.PointC)

        var gauge = $("#linear-progress").data("kendoLinearGauge");
        gauge.pointers[0].value(that.PointA);
        gauge.pointers[1].value(that.PointB);
        gauge.pointers[2].value(that.PointC);

        setTimeout(function () { setProgressPoints(that, data); }, 50);
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