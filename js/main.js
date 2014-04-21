var main = function () {
    var cronSight = {
        template: _.template($("#scheduled-executions-template").html(), null, {variable: 'data'})
    };
    cronSight.parseString = function (string) {
        var cronPattern = /^\s*(@(yearly|annually|monthly|weekly|daily|midnight|hourly)\s+|([^\s]+)(\s+([^\s]+)){4})(.*)$/i;
        var match = cronPattern.exec(string);
        if (match) {
            var cronExpression = match[1];
            var sch = later.parse.cron(cronExpression);

            later.date.localTime();

            var displayItems = _.map(later.schedule(sch).next(10),
                function (date) {
                    var sm = moment(date);
                    return [sm.format('ddd, MMM DD YYYY, hh:mm:ss a')];
                });

            $("#next-10-executions").html(this.template({executions: displayItems}));
            $(".next-10").fadeIn();
        }
    };
    return cronSight;
}();

$(function () {
    $("#go-btn").click(
        function () {
            main.parseString($("#cron-text").val());
        });
});