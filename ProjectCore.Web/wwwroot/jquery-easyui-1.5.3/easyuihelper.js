String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}
var hashMap = {
    Set: function (key, value) { this[key] = value },
    Get: function (key) { return this[key] },
    Contains: function (key) { return this.Get(key) == null ? false : true },
    Remove: function (key) { delete this[key] }
}

function closeWindow() {
    window.opener = null;
    window.open('', '_self', '');
    window.close();
}
function formatCurrency(num) {
    if (num) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    } else {
        return 0;
    }
}

//阻止事件冒泡
function StopPropagation(event) {
    var e = event || window.event;
    if (window.event) {
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }
}
//转换JS日期格式成yyyy-MM-dd格式
function JSFormatDate(date) {
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    //+ " " + date.getHours() + seperator2 + date.getMinutes()
    //+ seperator2 + date.getSeconds();
    return currentdate;
}
//规定送审日期计算
function CaclRuleDate(pp, red, pm) {
    if (pp == "重点项目") {
        //工程竣工结算送审金额在1000万元（含1000万元）以下的，在工程竣工验收之日起30天内报送；送审金额在1000万元至5000万元（含5000万元）的，在工程竣工验收之日起45天内报送；送审金额在5000万元至1亿元（含1亿元）的，在工程竣工验收之日起60天内报送；送审金额在1亿元以上的，在工程竣工验收之日起90天内报送。
        //规定送审日期计算
        if (pm != "") {
            pm = pm * 1;
            if (pm <= 10000000) {
                var now = new Date(red.setDate(red.getDate() + 30));
                return JSFormatDate(now);
            }
            else if (pm > 10000000 && pm <= 50000000) {
                var now = new Date(red.setDate(red.getDate() + 45));
                return JSFormatDate(now);
            }
            else if (pm > 50000000 && pm <= 100000000) {
                var now = new Date(red.setDate(red.getDate() + 60));
                return JSFormatDate(now);
            }
            else if (pm > 100000000) {
                var now = new Date(red.setDate(red.getDate() + 90));
                return JSFormatDate(now);
            }
        }
    } else
        return "";
}
//计算工期
function getDays(strDateStart, strDateEnd) {
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1 = strDateStart.split(strSeparator);
    oDate2 = strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数 
    return iDays + 1;
    //alert(getDays("2012-12-01", "2012-12-25"));
}
//转换JSON日期格式成DATETIME格式
function JsonDateFormat(jsondate) {
    if (jsondate == null) { }
    else {
        //jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        //if (jsondate.indexOf("+") > 0) {
        //    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        //}
        //else if (jsondate.indexOf("-") > 0) {
        //    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        //}

        //var date = new Date(parseInt(jsondate, 10));
        //var month = date.getMonth() + 1;
        //return date.getFullYear() + "-" + month + "-" + date.getDate()
        //+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return jsondate.substr(0, 10);
    }
}
function JsonDateFormatl(jsondate, type) {
    if (jsondate == null) { }
    else {
        //jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        //if (jsondate.indexOf("+") > 0) {
        //    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        //}
        //else if (jsondate.indexOf("-") > 0) {
        //    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        //}

        //var date = new Date(parseInt(jsondate, 10));
        //var month = date.getMonth() + 1;
        //if (type == "") {
        //    return date.getFullYear() + "-" + month + "-" + date.getDate()
        //  + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        //} else {
        //    return date.getFullYear() + "-" + month + "-" + date.getDate();
        //}
        return jsondate.substr(0, 10);
    }
}

Date.prototype.Format = function(fmt)
{
   
    var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
}  


$.ajaxSetup({
    gloabl: true,
    type: 'POST',
    async: true,
    error: function (jqXHR, requestStatus, responseStatus) {
        if (requestStatus == "error")
       $.messager.alert("系统提示", "抱歉!系统服务发生内部错误,请联系管理员.", "error");
       //  $("<div></div>").window({ height: 600,width:900, content: event.responseText, title: event.statusText });
    },
    beforeSend: function (XMLHttpRequest) {
        ShowMask();
    },
    complete: function (XMLHttpRequest, status) {
        HideMask();
    }
});

function getAbsPoint(e) {
    var x = e.offsetLeft, y = e.offsetTop;
    while (e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    return { x: x, y: y }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function replaceSpecialChar(obj) {
    //var pattern = new RegExp("[~!#$%_^&*()=+\\{}\"'/?><`|]", "gi");
    var s = obj.value;
    //s = s.replace(pattern, '');
    obj.value = s.trim();
}

//显示遮罩层
function ShowMask() {
    $("#postData").window("open");
    $("#postData").css("border", "0px");
}

function HideMask() {
    $("#postData").window("close");
}

function getelementByClass(classname, tagname, parentNode) {
    var parent = parentNode || document.body,
           tagname = tagname || '*',
           o = parent.getElementsByTagName(tagname),
           p = [];
    for (var i = -1, l = o.length; ++i < l;) {
        var c = o[i].className.split(' ');
        for (var j = -1, cl = c.length; ++j < cl;) {
            if (classname == c[j]) {
                p.push(o[i]);
                //p[p.length]=o[i];
                break;
            }
        }
    }
    return p;
}
$(function () {

    $("body").append("<div id='postData'><img src='/Content/images/load.gif' style='position:absolute;top:11px;' /><span style='position:absolute;left:30px;top:12px'>系统正在努力运行，请稍候...</span></div>");
    $("#postData").window({
        width: 200, height: 40, title: '', modal: true, closed: true, zIndex: 2147483647
    });

    $(":input[type=text]").attr("AutoComplete", "off").bind("blur", function () {
        replaceSpecialChar(this);
    });
    $("textarea").blur(function () { replaceSpecialChar(this) });

    $(document).on({
        change: function (event) {
            if (/^(\d+)(\.\d+)?$/.test(this.value)) {
                this.value = parseFloat(this.value);
            } else {
                this.value = 0;
            }
        },
        focus: function () {
            if (this.value == 0) {
                this.value = "";
            }
        },
        blur: function () {
            if (this.value == "") {
                this.value = 0;
            }
        }
    }, ".number");


    $(document).on({
        change: function (event) {
            if (/^(\d+)$/.test(this.value)) {
                this.value = parseFloat(this.value);
            } else {
                this.value = 0;
            }
        },
        focus: function () {
            if (this.value == 0) {
                this.value = "";
            }
        },
        blur: function () {
            if (this.value == "") {
                this.value = 0;
            }
        }
    }, ".integer");


    $(document).on({
        change: function (event) {
            if (/^((\-(\d.)?)?(\d+))|((\d.)?\d)$/.test(this.value)) {
                this.value = parseFloat(this.value);
            } else {
                this.value = 0;
            }
        },
        focus: function () {
            if (this.value == 0) {
                this.value = "";
            }
        },
        blur: function () {
            if (this.value == "") {
                this.value = 0;
            }
        }
    }, ".figure");


    $(document).on("focus", "input[readonly=readonly]", function (event) {
        $(this).trigger("mouseover");
    });
    //$(document).on({
    //    mousewheel: function () {
    //        if (this.clientWidth < this.scrollWidth) {
    //            var e = window.event;
    //            var delta = e.wheelDelta;
    //            var left = $(this).scrollLeft() - delta;
    //            $(this).scrollLeft(left);
    //            return false;
    //        }
    //    }
    //}, '.datagrid-body');
});

$.extend($.fn.datagrid.methods, {
    fixRownumber: function (jq) {
        return jq.each(function () {
            var panel = $(this).datagrid("getPanel");
            //获取最后一行的number容器,并拷贝一份
            var clone = $(".datagrid-cell-rownumber", panel).last().clone();
            //由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
            clone.css({
                "position": "absolute",
                left: -1000
            }).appendTo("body");
            var width = clone.width("auto").width();
            //默认宽度是25,所以只有大于25的时候才进行fix
            if (width > 25) {
                //多加5个像素,保持一点边距
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 10);
                //修改了宽度之后,需要对容器进行重新计算,所以调用resize
                $(this).datagrid("resize");
                //一些清理工作
                clone.remove();
                clone = null;
            } else {
                //还原成默认状态
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
            }
        });
    }
});
var detailview = $.extend({
}, $.fn.datagrid.defaults.view, {
    render: function (target, container, frozen) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        if (frozen) {
            if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                return;
            }
        }

        var rows = state.data.rows;
        var fields = $(target).datagrid('getColumnFields', frozen);
        var table = [];
        table.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
        for (var i = 0; i < rows.length; i++) {
            // get the class and style attributes for this row
            var css = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : '';
            var classValue = '';
            var styleValue = '';
            if (typeof css == 'string') {
                styleValue = css;
            } else if (css) {
                classValue = css['class'] || '';
                styleValue = css['style'] || '';
            }

            var cls = 'class="datagrid-row ' + (i % 2 && opts.striped ? 'datagrid-row-alt ' : ' ') + classValue + '"';
            var style = styleValue ? 'style="' + styleValue + '"' : '';
            var rowId = state.rowIdPrefix + '-' + (frozen ? 1 : 2) + '-' + i;
            table.push('<tr id="' + rowId + '" datagrid-row-index="' + i + '" ' + cls + ' ' + style + '>');
            table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
            table.push('</tr>');

            table.push('<tr style="display:none;">');
            if (frozen) {
                table.push('<td colspan=' + (fields.length + 2) + ' style="border-right:0">');
            } else {
                table.push('<td colspan=' + (fields.length) + '>');
            }
            table.push('<div class="datagrid-row-detail">');
            if (frozen) {
                table.push('&nbsp;');
            } else {
                table.push(opts.detailFormatter.call(target, i, rows[i]));
            }
            table.push('</div>');
            table.push('</td>');
            table.push('</tr>');

        }
        table.push('</tbody></table>');

        $(container).html(table.join(''));
    },

    renderRow: function (target, fields, frozen, rowIndex, rowData) {
        var opts = $.data(target, 'datagrid').options;

        var cc = [];
        if (frozen && opts.rownumbers) {
            var rownumber = rowIndex + 1;
            if (opts.pagination) {
                rownumber += (opts.pageNumber - 1) * opts.pageSize;
            }
            cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">' + rownumber + '</div></td>');
        }
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var col = $(target).datagrid('getColumnOption', field);
            if (col) {
                var value = rowData[field];	// the field value
                var css = col.styler ? (col.styler(value, rowData, rowIndex) || '') : '';
                var classValue = '';
                var styleValue = '';
                if (typeof css == 'string') {
                    styleValue = css;
                } else if (cc) {
                    classValue = css['class'] || '';
                    styleValue = css['style'] || '';
                }
                var cls = classValue ? 'class="' + classValue + '"' : '';
                var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');

                cc.push('<td field="' + field + '" ' + cls + ' ' + style + '>');

                if (col.checkbox) {
                    style = '';
                } else if (col.expander) {
                    style = "text-align:center;height:16px;";
                } else {
                    style = styleValue;
                    if (col.align) {
                        style += ';text-align:' + col.align + ';'
                    }
                    if (!opts.nowrap) {
                        style += ';white-space:normal;height:auto;';
                    } else if (opts.autoRowHeight) {
                        style += ';height:auto;';
                    }
                }

                cc.push('<div style="' + style + '" ');
                if (col.checkbox) {
                    cc.push('class="datagrid-cell-check ');
                } else {
                    cc.push('class="datagrid-cell ' + col.cellClass);
                }
                cc.push('">');

                if (col.checkbox) {
                    cc.push('<input type="checkbox" name="' + field + '" value="' + (value != undefined ? value : '') + '">');
                } else if (col.expander) {
                    //cc.push('<div style="text-align:center;width:16px;height:16px;">');
                    cc.push('<span class="datagrid-row-expander datagrid-row-expand" style="display:inline-block;width:16px;height:16px;cursor:pointer;" />');
                    //cc.push('</div>');
                } else if (col.formatter) {
                    cc.push(col.formatter(value, rowData, rowIndex));
                } else {
                    cc.push(value);
                }

                cc.push('</div>');
                cc.push('</td>');
            }
        }
        return cc.join('');
    },

    insertRow: function (target, index, row) {
        var opts = $.data(target, 'datagrid').options;
        var dc = $.data(target, 'datagrid').dc;
        var panel = $(target).datagrid('getPanel');
        var view1 = dc.view1;
        var view2 = dc.view2;

        var isAppend = false;
        var rowLength = $(target).datagrid('getRows').length;
        if (rowLength == 0) {
            $(target).datagrid('loadData', {
                total: 1, rows: [row]
            });
            return;
        }

        if (index == undefined || index == null || index >= rowLength) {
            index = rowLength;
            isAppend = true;
            this.canUpdateDetail = false;
        }

        $.fn.datagrid.defaults.view.insertRow.call(this, target, index, row);

        _insert(true);
        _insert(false);

        this.canUpdateDetail = true;

        function _insert(frozen) {
            var v = frozen ? view1 : view2;
            var tr = v.find('tr[datagrid-row-index=' + index + ']');

            if (isAppend) {
                var newDetail = tr.next().clone();
                tr.insertAfter(tr.next());
            } else {
                var newDetail = tr.next().next().clone();
            }
            newDetail.insertAfter(tr);
            newDetail.hide();
            if (!frozen) {
                newDetail.find('div.datagrid-row-detail').html(opts.detailFormatter.call(target, index, row));
            }
        }
    },

    deleteRow: function (target, index) {
        var opts = $.data(target, 'datagrid').options;
        var dc = $.data(target, 'datagrid').dc;
        var tr = opts.finder.getTr(target, index);
        tr.next().remove();
        $.fn.datagrid.defaults.view.deleteRow.call(this, target, index);
        dc.body2.triggerHandler('scroll');
    },

    updateRow: function (target, rowIndex, row) {
        var dc = $.data(target, 'datagrid').dc;
        var opts = $.data(target, 'datagrid').options;
        var cls = $(target).datagrid('getExpander', rowIndex).attr('class');
        $.fn.datagrid.defaults.view.updateRow.call(this, target, rowIndex, row);
        $(target).datagrid('getExpander', rowIndex).attr('class', cls);

        // update the detail content
        if (this.canUpdateDetail) {
            var row = $(target).datagrid('getRows')[rowIndex];
            var detail = $(target).datagrid('getRowDetail', rowIndex);
            detail.html(opts.detailFormatter.call(target, rowIndex, row));
        }
    },

    bindEvents: function (target) {
        var state = $.data(target, 'datagrid');
        var dc = state.dc;
        var opts = state.options;
        var body = dc.body1.add(dc.body2);
        var clickHandler = ($.data(body[0], 'events') || $._data(body[0], 'events')).click[0].handler;
        body.unbind('click').bind('click', function (e) {
            var tt = $(e.target);
            var tr = tt.closest('tr.datagrid-row');
            if (!tr.length) {
                return
            }
            if (tt.hasClass('datagrid-row-expander')) {
                var rowIndex = parseInt(tr.attr('datagrid-row-index'));
                if (tt.hasClass('datagrid-row-expand')) {
                    $(target).datagrid('expandRow', rowIndex);
                } else {
                    $(target).datagrid('collapseRow', rowIndex);
                }
                $(target).datagrid('fixRowHeight');

            } else {
                clickHandler(e);
            }
            e.stopPropagation();
        });
    },

    onBeforeRender: function (target) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        var t = $(target);
        var hasExpander = false;
        var fields = t.datagrid('getColumnFields', true).concat(t.datagrid('getColumnFields'));
        for (var i = 0; i < fields.length; i++) {
            var col = t.datagrid('getColumnOption', fields[i]);
            if (col.expander) {
                hasExpander = true;
                break;
            }
        }
        if (!hasExpander) {
            if (opts.frozenColumns && opts.frozenColumns.length) {
                opts.frozenColumns[0].splice(0, 0, {
                    field: '_expander', expander: true, width: 24, resizable: false, fixed: true
                });
            } else {
                opts.frozenColumns = [[{
                    field: '_expander', expander: true, width: 24, resizable: false, fixed: true
                }]];
            }

            var t = dc.view1.children('div.datagrid-header').find('table');
            var td = $('<td rowspan="' + opts.frozenColumns.length + '"><div class="datagrid-header-expander" style="width:24px;"></div></td>');
            if ($('tr', t).length == 0) {
                td.wrap('<tr></tr>').parent().appendTo($('tbody', t));
            } else if (opts.rownumbers) {
                td.insertAfter(t.find('td:has(div.datagrid-header-rownumber)'));
            } else {
                td.prependTo(t.find('tr:first'));
            }
        }

        var that = this;
        setTimeout(function () {
            that.bindEvents(target);
        }, 0);
    },

    onAfterRender: function (target) {
        var that = this;
        var state = $.data(target, 'datagrid');
        var dc = state.dc;
        var opts = state.options;
        var panel = $(target).datagrid('getPanel');

        $.fn.datagrid.defaults.view.onAfterRender.call(this, target);

        if (!state.onResizeColumn) {
            state.onResizeColumn = opts.onResizeColumn;
        }
        if (!state.onResize) {
            state.onResize = opts.onResize;
        }
        function setBodyTableWidth() {
            var columnWidths = dc.view2.children('div.datagrid-header').find('table').width();
            dc.body2.children('table').width(columnWidths);
        }

        opts.onResizeColumn = function (field, width) {
            setBodyTableWidth();
            var rowCount = $(target).datagrid('getRows').length;
            for (var i = 0; i < rowCount; i++) {
                $(target).datagrid('fixDetailRowHeight', i);
            }

            // call the old event code
            state.onResizeColumn.call(target, field, width);
        };
        opts.onResize = function (width, height) {
            setBodyTableWidth();
            state.onResize.call(panel, width, height);
        };

        this.canUpdateDetail = true;	// define if to update the detail content when 'updateRow' method is called;

        var footer = dc.footer1.add(dc.footer2);
        footer.find('span.datagrid-row-expander').css('visibility', 'hidden');
        $(target).datagrid('resize');
    }
});

$.extend($.fn.datagrid.methods, {
    fixDetailRowHeight: function (jq, index) {
        return jq.each(function () {
            var opts = $.data(this, 'datagrid').options;
            if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                return;
            }
            var dc = $.data(this, 'datagrid').dc;
            var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
            var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
            // fix the detail row height
            if (tr2.is(':visible')) {
                tr1.css('height', '');
                tr2.css('height', '');
                var height = Math.max(tr1.height(), tr2.height());
                tr1.css('height', height);
                tr2.css('height', height);
            }
            dc.body2.triggerHandler('scroll');
        });
    },
    getExpander: function (jq, index) {	// get row expander object
        var opts = $.data(jq[0], 'datagrid').options;
        return opts.finder.getTr(jq[0], index).find('span.datagrid-row-expander');
    },
    // get row detail container
    getRowDetail: function (jq, index) {
        var opts = $.data(jq[0], 'datagrid').options;
        var tr = opts.finder.getTr(jq[0], index, 'body', 2);
        return tr.next().find('div.datagrid-row-detail');
    },
    expandRow: function (jq, index) {
        return jq.each(function () {
            var opts = $(this).datagrid('options');
            var dc = $.data(this, 'datagrid').dc;
            var expander = $(this).datagrid('getExpander', index);
            if (expander.hasClass('datagrid-row-expand')) {
                expander.removeClass('datagrid-row-expand').addClass('datagrid-row-collapse');
                var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
                var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
                tr1.show();
                tr2.show();
                $(this).datagrid('fixDetailRowHeight', index);
                if (opts.onExpandRow) {
                    var row = $(this).datagrid('getRows')[index];
                    opts.onExpandRow.call(this, index, row);
                }
            }
        });
    },
    collapseRow: function (jq, index) {
        return jq.each(function () {
            var opts = $(this).datagrid('options');
            var dc = $.data(this, 'datagrid').dc;
            var expander = $(this).datagrid('getExpander', index);
            if (expander.hasClass('datagrid-row-collapse')) {
                expander.removeClass('datagrid-row-collapse').addClass('datagrid-row-expand');
                var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
                var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
                tr1.hide();
                tr2.hide();
                dc.body2.triggerHandler('scroll');
                if (opts.onCollapseRow) {
                    var row = $(this).datagrid('getRows')[index];
                    opts.onCollapseRow.call(this, index, row);
                }
            }
        });
    }
});



$.extend($.fn.validatebox.defaults.rules, {
    time: {
        validator: function (value, param) {
            if (value) {
                return /^((1|0?)[0-9]|2[0-3])(\.(0|5))?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的工时(小数点后为0或5)'
    },
    qq: {
        validator: function (value, param) {
            if (value) {
                return /^d[5,15]$/.test(value);
            } else {
                return true;
            }
        },
        message: '无效的QQ号码'
    },
    idcard: {
        validator: function (value, param) {
            if (value) {
                return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
            } else {
                return true;
            }
        },
        message: '无效的身份证号'
    },
    bankcard: {
        validator: function (value, param) {
            if (value) {
                return /^(\d{16}|\d{19})$/.test(value);
            } else {
                return true;
            }
        },
        message: '无效的银行卡号'
    },
    equals: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '两次输入的密码不一致'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少{0}个字'
    },
    maxLength: {
        validator: function (value, param) {
            return value.length < param[0];
        },
        message: '最多只能输入{0}个字'
    },
    //根据业务系统的金额调整
    money: {
        validator: function (value, param) {
            if (value) {
                return /^(([1-9]\d*|[1-9]\d{0,2}(,\d{3})*)|(0))(\.(\d){1,2})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的金额'
    },

    moneyd: {
        validator: function (value, param) {
            if (value) {
                return /^((-)?([1-9]{1}\d{0,6})|([0]{1}))(\.(\d){1,2})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的金额'
    },

    temp: {
        validator: function (value, param) {
            if (value) {
                return /^((-)?([1-9]{1}\d{0,6})|([0]{1}))(\.(\d){1,2})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的温度'
    },
    weight: {
        validator: function (value, param) {
            if (value) {
                return /^(([1-9]{1}\d{0,6})|([0]{1}))(\.(\d){1,2})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的重量'
    },
    number: {
        validator: function (value, param) {
            if (value) {
                return /^[0-9]*[1-9][0-9]*$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正整数'
    },
    integer: {
        validator: function (value, param) {
            if (value) {
                return /^\+?(0|[1-9][0-9]*)$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正整数'
    },

    http: {
        validator: function (value, param) {
            if (value) {
                return /^(http(s?):\/\/)+(\w*.)*$/.test(value);
            } else {
                return true;
            }
        },
        message: '无效的网址！'
    },
    zip: {
        validator: function (value, param) {
            return /[1-9]\d{5}(?!\d)/.test(value);
        },
        message: '邮政编码不存在'
    },
    mobilephone: {
        validator: function (value, param) {
            if (value) {
                return /^1\d{10}$/.test(value);
            } else {
                return true;
            }
        },
        message: '无效的移动电话号码'
    },
    phone: {
        validator: function (value, param) {

            if (value) {
                return /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(value);
            } else {
                return true;
            }
        },
        message: '无效的电话号码'
    },
    email: {
        validator: function (value, param) {

            if (value) {
                return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value);
            } else {
                return true;
            }
        },
        message: '无效的电子邮件'
    },
    width: {
        validator: function (value, param) {
            if (value) {
                return /^(([1-9]{1}\d{0,6})|([0]{1}))(\.(\d){1,2})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的宽度'
    },
    height: {
        validator: function (value, param) {
            if (value) {
                return /^(([1-9]{1}\d{0,6})|([0]{1}))(\.(\d){1,2})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的高度'
    },
    long: {
        validator: function (value, param) {
            if (value) {
                return /^(([1-9]{1}\d{0,6})|([0]{1}))(\.(\d){1,2})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '请输入正确的长度'
    },
    SmalFloat: {
        validator: function (value, param) {
            if (value) {
                //   ^\d+(\.\d{2})?$
                var isOK = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/.test(value);
                if (isOK) {
                    value = parseFloat(value);
                    if (value >= 0.1 && value <= 5) {
                        return true;
                    } else return false;
                } else return false;

            } else {
                return true;
            }
        },
        message: '请输入0.1到5之间的数值'
    },
    FloatPaid: {//百分比
        validator: function (value, param) {
            if (value) {
                //   ^\d+(\.\d{2})?$
                var isOK = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/.test(value);
                if (isOK) {
                    value = parseFloat(value);
                    if (value >= 0.1 && value <= 100) {
                        return true;
                    } else return false;
                } else return false;

            } else {
                return true;
            }
        },
        message: '请输入0.1到100之间的数值'
    }
});

function CheckVesion() {
    var browser = navigator.appName
    var b_version = navigator.appVersion
    var version = b_version.split(";");
    if (browser == "Microsoft Internet Explorer") {
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (trim_Version == "MSIE8.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE6.0") {
            dynamicLoading.css("/App_Themes/Default/ie8font.css");
        }
        else {
            dynamicLoading.css("/App_Themes/Default/otherfont.css");
        }
    }
    else {
        dynamicLoading.css("/App_Themes/Default/otherfont.css");
    }
}
var dynamicLoading = {
    css: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}
//(function ($) {
//    var printAreaCount = 0;
//    $.fn.printArea = function () {
//        var ele = $(this);
//        var idPrefix = "printArea_";
//        removePrintArea(idPrefix + printAreaCount);
//        printAreaCount++;
//        var iframeId = idPrefix + printAreaCount;
//        var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
//        iframe = document.createElement('IFRAME');
//        $(iframe).attr({
//            style: iframeStyle,
//            id: iframeId
//        });
//        document.body.appendChild(iframe);
//        var doc = iframe.contentWindow.document;
//        $(document).find("link").filter(function () {
//            return $(this).attr("rel").toLowerCase() == "stylesheet";
//        }).each(
//                function () {
//                    doc.write('<link type="text/css" rel="stylesheet" href="'
//                            + $(this).attr("href") + '" >');
//                });
//        doc.write('<div class="' + $(ele).attr("class") + '">' + $(ele).html()
//                + '</div>');
//        doc.close();
//        var frameWindow = iframe.contentWindow;
//        framewindow.close();
//        frameWindow.focus();
//        frameWindow.print();
//    }
//    var removePrintArea = function (id) {
//        $("iframe#" + id).remove();
//    };
//})(jQuery);