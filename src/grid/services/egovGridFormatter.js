angular.module('egov.ui.grid')
.provider('egovGridFormatter',function() {
		var insertedFormatter = {},
				boxDataSet = {},
				$scopes = {};
				
		this.setFormatatter = function(name, func) {
			insertedFormatter[name] = func;
		};

		this.$get = function() {
			var formatters = {
				checkmark : CheckmarkFormatter,
				percentComplete : PercentCompleteBarFormatter,
				percentCompleteBar : PercentCompleteBarFormatter
			};

			function getFormatter (id) {
				return formatters[id];
			}

			function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
				if (value === null || value === "") {
					return "-";
				} else if (value < 50) {
					return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
				} else {
					return "<span style='color:green'>" + value + "%</span>";
				}
			}

			function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
				if (value === null || value === "") {
					return "";
				}

				var color;

				if (value < 30) {
					color = "red";
				} else if (value < 70) {
					color = "silver";
				} else {
					color = "green";
				}

				return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
			}


			function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
				return value ? "<span class='check-mark'></span>" : "";
			}

			angular.extend(formatters, insertedFormatter);

			return {
				getFormatter : getFormatter
			};
		};
});