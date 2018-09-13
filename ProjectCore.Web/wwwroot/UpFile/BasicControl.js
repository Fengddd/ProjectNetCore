function InitStyle() {
    if ($("[href = '/Scripts/BasicControl/BasicControl.css']").length == 0) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = 'stylesheet';
        link.href = '/Scripts/BasicControl/BasicControl.css';
        if (window.document.head) {
            window.document.head.appendChild(link);
        } else {
            window.document.appendChild(link);
        }
    }
}


$.fn.extend({

    JQGrid: function (option) {
        var src = $(this);
        alert(src);
        option = option || {};
        option.url = option.url + "?_=" + Math.random();
        option.pageNumber = option.pageNumber || 1;
        option.pageSize = option.pageSize || 20;
        option.pageList = option.pageList || [10, 20, 30];
        option.queryParams = option.queryParams || null;
        option.method = option.method || "post";
        option.nowrap = typeof (option.nowrap) == 'undefined' ? true : option.nowrap;
        option.loadMsg = option.loadMsg || '';
        option.singleSelect = typeof (option.singleSelect) == 'undefined' ? true : option.singleSelect;
        option.autoRowHeight = option.autoRowHeight || false;
        option.striped = typeof (option.striped) == 'undefined' ? true : option.striped;
        option.collapsible = typeof (option.collapsible) == 'undefined' ? true : option.collapsible;
        option.sortName = option.sortName || null;
        option.sortOrder = option.sortOrder || 'desc';
        option.remoteSort = option.remoteSort || false;
        option.idField = option.idField || 'id';
        option.pagination = typeof (option.pagination) == 'undefined' ? true : option.pagination;
        option.rownumbers = typeof (option.rownumbers) == 'undefined' ? true : option.rownumbers;
        option.showFooter = option.showFooter || false;
        option.fitColumns = option.fitColumns || false;
        option.width = option.width || 'auto';
        option.height = option.height || 'auto';
        option.nowrap = false;
        option.checkOnSelect = true;
        option.selectOnCheck = true;
        option.resizeHandle = "both";
        src.datagrid(option);
    },

    BuidFormData: function (option) {
        var elements = $(this).find('input,textarea,select');
        var param = {};
        option = option || {};
        option.Info = option.Info || "info";
        $.each(elements, function (i, item) {

            if (item.type != "button") {
                var value = "";
                if (item.type == "checkbox") {
                    if (item.checked)
                        value = item.value;
                }
                if (item.type == "radio") {
                    if (item.checked)
                        value = item.value;
                }
                if (item.type == "textarea") {
                    value = encodeURI(value);
                }
                if (item.type == "text" || item.type == "hidden") {
                    value = item.value;
                }
                if (item.type == "select-one") {
                    value = item.value;
                }
                if (value) {
                    value = (value + "").replace(/\"/g, "").replace(/\s/g, "");
                    eval("param." + $(item).attr("name") + "=\"" + value + "\"");

                }
            }
        });
        return param;
    },

    AppendEmployee: function (option) {
        for (var i = 0; i < this.length; i++) {
            var rowData = this[i];
            var attrbuteStr = ""
            for (var item in rowData) {
                attrbuteStr += item + "='" + eval("rowData." + item) + "' ";
            }
            var Text = eval("rowData." + option.TextType);
            var li = "<li " + attrbuteStr + ">" +
                        "<div class='selectCont'>" +
                            "<div class='sideleft'><div title='" + Text + "'>" + Text + "</div></div>" +
                            "<div class='sideright'>" +
                                "<a class='glyphicon glyphicon-remove-circle' onclick='DeleteEM(this,\"" + option.suffix + "\")'></a>" +
                                "<a class='glyphicon glyphicon-circle-arrow-down' onclick='MoveDown(this)'></a>" +
                                "<a class='glyphicon glyphicon-circle-arrow-up' onclick='MoveUp(this)'></a>" +
                            "</div>" +
                        "</div>" +
                     "</li>";
            $("#EmpUl" + option.suffix).append(li);
        }
    },
    SetArgumentValue: function (option) {
        var src = $(this);
        var suffix = "_" + src.attr("id");
        src.val("");
        $("#fore" + suffix).val("");
        $("#EmpUl" + suffix).empty();
        for (var item in option) {
            if ($("#" + item + suffix).length > 0) {
                $("#" + item + suffix).val(option[item]);
            }
        }
    },
    ClearEmpSelected: function (option) {
        var src = $(this);
        var suffix = "_" + src.attr("id");
        src.val("");
        $("#fore" + suffix).val("");
        $("#EmpUl" + suffix).empty();

    },
    EmpSelector: function (option) {
        InitStyle();
        var src = $(this);
        option = option || {};
        option.single = typeof (option.single) == "undefined" ? true : option.single;
        option.hidden = typeof (option.hidden) == "undefined" ? false : option.hidden;
        option.EmpData = option.EmpData || [];
        option.Title = option.Title || lang.DialogTitle;
        option.ValueType = option.ValueType || 'User_ID';
        option.TextType = option.TextType || 'User_Name',
        option.unitType = option.unitType || "";
        option.unitName = option.unitName || "";
        option.GetUsersByIdStr = option.GetUsersByIdStr || '/User/GetUsersByIdStr';
        option.GetEmployee = option.GetEmployee || '/User/GetUsers';
        var suffix = "_" + src.attr("id");

        src.hide().before("<input class='form-control em_search' type='text' id='fore" + suffix + "' name='fore" + suffix + "' readonly='readonly' />");

        var $EmpFore = $("#fore" + suffix);
        function SetValue(value) {
            if (src.val().length > 0) {
                $.ajax({
                    url: option.GetUsersByIdStr,
                    data: { idstr: value }, async: true,
                    success: function (data) {
                        var names = '';
                        for (var i = 0; i < data.length; i++) {
                            if (i > 0)
                                names += ';';
                            names += eval("data[i]." + option.TextType);
                        }
                        $EmpFore.val(names);
                    }
                });
            }
        }
        if (!option.hidden) {
            $EmpFore.empty();
            var value = src.val();
            SetValue(value);
        }
        src.change(function () { var value = src.val(); SetValue(value); });
        if (option.IsValidate) {
            $EmpFore.validatebox({ required: true, missingMessage: option.Title });
        }
        if (option.hidden) {
            $EmpFore.hide();
        }
        var html = "<div class='Employee' id='EmpDialog" + suffix + "'>" +
                        "<div class='empcenter'>" +
                            "<div class='contSearch'>" +
                                "<form class='form-inline' role='form'>" +
                                    "<input type='hidden' id='single" + suffix + "' value='" + option.single + "' />" +
                                    "<div class='form-group' style='display:none'>" +
                                        "<label for='UnitType" + suffix + "' class='control-label pr10'>" + lang.UnitType + "</label>" +
                                        "<select class='form-control' id='UnitType" + suffix + "'>" +
                                            "<option value=''>--全部--</option>" +
                                            "<option value='高投'>高投</option>" +
                                            "<option value='学校'>学校</option>" +
                                            "<option value='街道'>街道</option>" +
                                            "<option value='部门及直属单位'>部门及直属单位</option>" +
                                            "<option value='审计局'>审计局</option>" +
                                            "<option value='中介机构'>中介机构</option>" +
                                        "</select>" +
                                    "</div>" +
                                    "<div class='form-group'>" +
                                        "<label for='UnitName" + suffix + "' class='control-label pr10'>" + lang.UnitName + "</label>" +
                                        "<input type='text' class='form-control' id='UnitName" + suffix + "' value='" + option.unitName + "' />" +
                                    "</div>" +
                                    "<div class='form-group'>" +
                                        "<label for='UserName" + suffix + "' class='control-label pr10'>" + lang.EmpName + "</label>" +
                                        "<input type='text' class='form-control' id='UserName" + suffix + "' />" +
                                    "</div>" +
                                    "<div class='form-group'>" +
                                        "<input type='button' class='btn btn-info btn-sm' value='" + lang.Search + "' id='btnSearch" + suffix + "' onclick=\"$(\'#EmpGrid" + suffix + "\').datagrid(\'load\')\" />" +
								        "<input type='button' class='btn btn-info btn-sm' value='" + lang.Reset + "' onclick=\"$('#UnitType" + suffix + "').val('');$('#UnitName" + suffix + "').val('');$('#UserName" + suffix + "').val('');$('#EmpUl" + suffix + "').empty();$(\'#EmpGrid" + suffix + "\').datagrid(\'unselectAll\').datagrid(\'load\')\" />" +
                                    "</div>" +
                                "</form>" +
                            "</div>" +
                            "<table id='EmpGrid" + suffix + "'></table>" +
                        "</div>" +
                        "<div class='empright'><ul id='EmpUl" + suffix + "'></ul></div>" +
                    "</div>";
        $("body").append(html);
        if (option.unitName) {
            $("#UnitName" + suffix).parent().hide();
        }
        if (option.showUnitType) {
            $("#UnitType" + suffix).parent().show();
        }
        var $EmpDialog = $("#EmpDialog" + suffix);
        var $SearchEmpName = $("#UserName" + suffix);
        var $EmpGrid = $("#EmpGrid" + suffix);



        $SearchEmpName.keyup(function (event) {
            event = event || window.event;
            if (event.keyCode == 13) {
                $(this).next().trigger("click");
            }
        });
        var width = window.screen.width * 0.8;
        $EmpDialog.dialog({
            modal: true, width: width, height: 555, title: option.Title, cache: false, closed: true,
            collapsible: true, minimizable: true, maximizable: true,
            onOpen: function () {
                option.single = $("#single" + suffix).val() == "true";
                $EmpDialog.dialog('move', { top: $(document).scrollTop() + window.screen.availHeight / 2 - 350 });
                $SearchEmpName.focus();
                if (!option.hidden) {
                    $("#EmpUl" + suffix).empty();
                    if (src.val().length > 0) {
                        $.ajax({
                            url: option.GetUsersByIdStr,
                            data: { idstr: src.val(), valueType: option.ValueType }, async: true,
                            success: function (data) {
                                $(data).AppendEmployee({ 'suffix': suffix, setFore: true, TextType: option.TextType });
                            }
                        });
                    }
                }

                $EmpGrid.JQGrid({
                    url: option.GetEmployee, pageList: [10, 20], pageSize: 10,
                    idField: 'User_ID', singleSelect: option.single, fitColumns: true,
                    queryParams: {
                        userUnitType: function () { return $("#UnitType" + suffix).val() },
                        unitName: function () { return $("#UnitName" + suffix).val() },
                        userName: function () { return $SearchEmpName.val() },
                        unitType: option.unitType
                    },
                    columns: [[
                        { field: 'ck', title: '', checkbox: !option.single, hidden: option.single },
                        { field: 'User_ID', title: 'User_ID', hidden: true },
                        { field: 'User_Account', title: 'User_Account', hidden: true },
                        { field: 'User_UnitName', title: lang.UnitName, width: 20 },
                        { field: 'User_Name', title: lang.EmpName, width: 4, align: 'center' },
                        { field: 'Role_Name', title: lang.RoleName, width: 10, align: 'center' },
                        { field: 'User_Mobile', title: lang.MobilePhone, width: 7, align: 'center' },
                        { field: 'User_Telephone', title: lang.FixPhone, width: 5, align: 'center' },
                        { field: 'User_Mail', title: lang.MailAddress, width: 11 }
                    ]],
                    onSelect: function (rowIndex, rowData) {
                        if (option.single) {
                            $("#EmpUl" + suffix).empty();
                        }
                        var have = $("#EmpUl" + suffix + " li[User_ID=" + rowData.User_ID + "]");
                        if (have.length == 0) {
                            $(rowData).AppendEmployee({ 'suffix': suffix, TextType: option.TextType });
                        }
                    },
                    onUnselect: function (rowIndex, rowData) {
                        $("#EmpUl" + suffix + " li[User_ID=" + rowData.User_ID + "]").remove();
                    },
                    onSelectAll: function (rows) {
                        for (var i = 0; i < rows.length; i++) {
                            var rowData = rows[i];
                            var have = $("#EmpUl" + suffix + " li[User_ID=" + rowData.User_ID + "]");
                            if (have.length == 0) {
                                $(rowData).AppendEmployee({ 'suffix': suffix, TextType: option.TextType });
                            }
                        }
                    },
                    onUnselectAll: function (rows) {
                        if (option.single == false) {
                            for (var i = 0; i < rows.length; i++) {
                                var rowData = rows[i];
                                $("#EmpUl" + suffix + " li[User_ID=" + rowData.User_ID + "]").remove();
                            }
                        }
                    },
                    onLoadSuccess: function (data) {
                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            var rowData = rows[i];
                            if ($("#EmpUl" + suffix + " li[User_ID=" + rowData.User_ID + "]").length == 0) {
                                $EmpGrid.datagrid('unselectRow', i);
                            }
                        }
                        var $unitType = $("#UnitType" + suffix);
                    }
                });
            },
            buttons: [
                {
                    text: lang.OK,
                    iconCls: 'icon-ok',
                    handler: function () {
                        var rows = $("#EmpUl" + suffix + " li");
                        var names = "", ids = "";
                        for (var i = 0; i < rows.length; i++) {
                            if (ids.length > 0) { ids += ";"; names += ";"; }
                            var id = '';
                            id = $(rows[i]).attr(option.ValueType);
                            ids += id;
                            var name = $(rows[i]).attr(option.TextType);
                            names += name;
                        }
                        $EmpFore.val(names);

                        if (option.IsValidate) {
                            $EmpFore.validatebox("validate");
                        }
                        src.val(ids);
                        if (typeof (option.callback) == "function") {
                            option.callback(rows);
                        }
                        $EmpDialog.dialog('close');
                    }
                },
                {
                    text: lang.Cancel,
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $EmpDialog.dialog('close');
                    }
                }
            ]
        });

        $EmpFore.click(function () { $EmpDialog.dialog('open'); });
    },

    AppendProject: function (data, $ProGrid) {
        var $ProUl = this;
        var rows = $ProGrid.datagrid("getRows");
        $.each(data, function (i, rowData) {
            if ($ProUl.find("li[Project_ID='" + rowData.Project_ID + "']").length == 0) {
                var Text = rowData.Project_EngineeringName;
                var js = JSON.stringify(rowData);
                var li = "<li Project_ID='" + rowData.Project_ID + "'>" +
                            "<div class='selectCont'>" +
                                "<div class='sideleft' style='margin-right:20px'>" +
                                    "<input type='hidden' value='" + js + "' />" +
                                    "<div title='" + Text + "'>" + Text + "</div>" +
                                "</div>" +
                                "<div class='sideright' style='width:20px'>" +
                                    "<a Project_ID=" + rowData.Project_ID + " class='glyphicon glyphicon-remove-circle'></a>" +
                                "</div>" +
                            "</div>" +
                         "</li>";
                $ProUl.append(li);
            }
        });
        $ProUl.find("a").click(function () {
            var li = $(this).parent();
            $.each(rows, function (i, row) {
                if (row.Project_ID == li.attr("Project_ID")) {
                    var index = $ProGrid.datagrid("getRowIndex", row);
                    if (index != -1)
                        $ProGrid.datagrid("uncheckRow", index);
                }
            })
        });
    },
    ProjectSelector: function (option) {
        InitStyle();
        option = option || {};
        option.Title = option.Title || "请选择工程";
        option.singleSelect = typeof (option.singleSelect) == "undefined" ? true : option.singleSelect;
        option.IsMyHandle = typeof (option.IsMyHandle) == "undefined" ? false : option.IsMyHandle;
        option.SST = option.SST || "";
        var $Project = $(this);
        var suffix = "_" + $Project.attr("id");
        $Project.hide().before("<input class='form-control em_search' type='text' id='fore" + suffix + "' name='fore" + suffix + "' readonly='readonly' />");
        var $ForeProject = $("#fore" + suffix);

        if (option.IsValidate) {
            $Project.validatebox({ required: true, missingMessage: option.Title });
        }

        var html = "<div class='Employee' id='ProDialog" + suffix + "'>" +
                        "<div class='empcenter'>" +
                            "<div class='contSearch'>" +
                                "<form class='form-inline' role='form'>" +
                                    "<div class='form-group'>" +
                                        "<label for='ProName" + suffix + "' class='control-label pr10'>工程名称</label>" +
                                        "<input type='text' class='form-control' id='ProName" + suffix + "' />" +
                                    "</div>" +
                                    "<div class='form-group'>" +
                                        "<label for='AuditNo" + suffix + "' class='control-label pr10'>审通号</label>" +
                                        "<input type='text' class='form-control' id='AuditNo" + suffix + "' />" +
                                    "</div>" +
                                    "<input type='button' class='btn btn-info btn-sm' value='查询' onclick=\"$(\'#ProGrid" + suffix + "\').datagrid(\'load\')\" />" +
								    "<input type='button' class='btn btn-info btn-sm' value='重置' onclick=\"$(\'#ProName" + suffix + "\').val('');$(\'#AuditNo" + suffix + "\').val('');$('#ProUl" + suffix + "').empty();$(\'#ProGrid" + suffix + "\').datagrid(\'unselectAll\').datagrid(\'load\')\" />" +
                                "</form>" +
                            "</div>" +
                            "<table id='ProGrid" + suffix + "'></table>" +
                        "</div>" +
                        "<div class='empright'><ul id='ProUl" + suffix + "'></ul></div>" +
                    "</div>";
        $("body").append(html);
        var $ProDialog = $("#ProDialog" + suffix);
        var $ProGrid = $("#ProGrid" + suffix);
        var $ProUl = $("#ProUl" + suffix);
        var width = window.screen.width * 0.8;
        $Project.haveData = [];
        if ($Project.val().length > 0) {
            $.ajax({
                url: '/ProjectInfo/GetProjectsByIdStr',
                data: { idStr: $Project.val() },
                success: function (data) {
                    var names = "";
                    $.each(data, function (i, rowData) {
                        if (names.length > 0)
                            names += ";";
                        names += rowData.Project_EngineeringName;
                    })
                    $ForeProject.val(names);
                    $Project.haveData = data;
                }
            })
        }
        $ProDialog.dialog({
            modal: true, width: width, height: 555, title: "选择工程", cache: false, closed: true,
            collapsible: true, minimizable: true, maximizable: true,
            onOpen: function () {
                $ProDialog.dialog('move', { top: $(document).scrollTop() + window.screen.availHeight / 2 - 350 });
                $ProGrid.JQGrid({
                    url: '/ProjectInfo/GetProjectInfoList',
                    queryParams: {
                        AuditNo: function () { return $("#AuditNo" + suffix).val(); },
                        EngineeringName: function () { return $("#ProName" + suffix).val(); },
                        IsMyHandle: option.IsMyHandle,
                        SST: option.SST
                    },
                    remoteSort: true, idField: 'Project_ID',
                    singleSelect: option.singleSelect,
                    pageList: [10, 20], pageSize: 10,
                    frozenColumns: [[
                        { field: 'ck', checkbox: true, width: 50, hidden: option.singleSelect },
                        { field: 'Project_ID', title: 'Project_ID', hidden: true },
                        { field: 'Project_AuditNo', title: '审通号', sortable: true, width: '9%' },
                        { field: 'Project_EngineeringName', title: '工程名称', sortable: true, width: '30%' }
                    ]],
                    columns: [[
                        { field: 'User_UnitName', title: '建设单位', sortable: true, width: '30%' },
                        { field: 'Project_GroupInfo_IOName', title: '中介机构', sortable: true, width: '30%' },
                        { field: 'Contract_ConstructionUnit', title: '施工单位', sortable: true, width: '30%' },
                    ]],
                    onSelect: function (rowIndex, rowData) {
                        if (option.singleSelect) {
                            $ProUl.empty();
                        }
                        var data = [];
                        data.push(rowData);
                        $ProUl.AppendProject(data, $ProGrid);
                    },
                    onUnselect: function (rowIndex, rowData) {
                        $ProUl.find("li[Project_ID=" + rowData.Project_ID + "]").remove();
                    },
                    onSelectAll: function (rows) {
                        $ProUl.AppendProject(rows, $ProGrid);
                    },
                    onUnselectAll: function (rows) {
                        if (option.singleSelect == false) {
                            for (var i = 0; i < rows.length; i++) {
                                var rowData = rows[i];
                                $ProUl.find("li[Project_ID=" + rowData.Project_ID + "]").remove();
                            }
                        }
                    },
                    onLoadSuccess: function (data) {
                        $.each(data.rows, function (i, rowData) {
                            if ($.find("li[Project_ID=" + rowData.Project_ID + "]").length > 0) {
                                $ProGrid.datagrid('selectRow', i);
                            }
                        })
                    }
                });
                $ProUl.AppendProject($Project.haveData, $ProGrid);
            },
            buttons: [
                {
                    text: lang.OK,
                    iconCls: 'icon-ok',
                    handler: function () {
                        var list = $ProUl.find("li");
                        var data = [];
                        var names = "", ids = "";
                        $.each(list, function (i, item) {
                            var js = $(item).find("input").val();
                            var obj = JSON.parse(js);
                            if (ids.length > 0) { ids += ";"; names += ";"; }
                            var id = '';
                            id = obj.Project_ID;
                            ids += id;
                            var name = obj.Project_EngineeringName;
                            names += name;

                            if (typeof (option.callback) == "function") {

                                if (option.singleSelect) {
                                    data = obj;
                                } else {
                                    data.push(obj);
                                }
                            }
                        });
                        if (option.singleSelect) {
                            $Project.haveData = [data];
                        } else {
                            $Project.haveData = data;
                        }
                        $Project.val(ids);
                        $ForeProject.val(names);

                        if (typeof (option.callback) == "function") {
                            option.callback(data);
                        }
                        $ProDialog.dialog('close');
                    }
                },
                {
                    text: lang.Cancel,
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $ProDialog.dialog('close');
                    }
                }
            ]
        });
        $ForeProject.click(function () {
            $ProDialog.dialog("open");
        })
    },
    FileSelector: function (option) {
        var my = $(this);
        option = option || {};
        option.data = option.data || [];
        option.language = 'zh';
        option.uploadUrl = "/FileInput/UploadFiles";
        option.deleteUrl = typeof (option.deleteUrl) == "undefined" ? "/FileInput/DeleteFile" : option.deleteUrl;
        option.showThumbs = typeof (option.showThumbs) == "undefined" ? false : option.showThumbs;
        option.allowedFileExtensions = option.allowedFileExtensions || ['jpg'];

        option.maxFileSize = option.maxFileSize || 204800;
        option.initialPreview = [];
        option.initialPreviewConfig = [];
        for (var i = 0; i < option.data.length; i++) {
            option.initialPreviewConfig.push({
                type: option.data[i].type,
                caption: option.data[i].caption,
                key: option.data[i].key,
                showDelete: option.data[i].showDelete,
                showMove: false
            });
            option.initialPreview.push(option.data[i].fileUrl);
        }
        option.autoReplace = false;
        option.initialPreviewAsData = true,
        option.overwriteInitial = false,
        option.showUpload = false,
        option.showBrowse = typeof (option.showBrowse) == "undefined" ? true : option.showBrowse;
        option.initialPreviewShowDelete = typeof (option.initialPreviewShowDelete) == "undefined" ? true : option.initialPreviewShowDelete;


        option.showCaption = false;
        option.browseClass = "btn btn-xs btn-primary";
        option.dropZoneEnabled = false,







        option.previewFileType = option.previewFileType || 'image';
        option.browseOnZoneClick = true;
        option.enctype = 'multipart/form-data';
        option.validateInitialCount = true;

        option.msgFilesTooMany = "选择上传的文件数量({n}) 超过允许的最大数值{m}！";

        if (option.showThumbs == false) {
            option.previewClass = "preview";
            option.previewSettings = {
                object: { height: "0px", width: '100%' },
                doc: { height: "0px", width: '100%' },
                docx: { height: "0px", width: '100%' },
                xls: { height: "0px", width: '100%' },
                xlsx: { height: "0px", width: '100%' },
                mpp: { height: "0px", width: '100%' },
                pdf: { height: "0px", width: '100%' },
                png: { height: "0px", width: '100%' },
                image: { height: "0px", width: '100%' },
                jpg: { height: "0px", width: '100%' }
            }
        } else {
            option.previewSettings = {
                image: { height: "160px", width: '100%' }
            }
        }
        option.layoutTemplates = {
            size: '',

        }
        option.previewZoomSettings = {
            image: { width: "100%", height: "" },
            html: { width: "100%", height: "100%", 'min-height': "480px" },
            text: { width: "100%", height: "100%", 'min-height': "480px" },
            video: { width: "auto", height: "100%", 'max-width': "100%" },
            audio: { width: "100%", height: "30px" },
            flash: { width: "auto", height: "480px" },
            object: { width: "auto", height: "480px" },
            pdf: { width: "100%", height: "100%", 'min-height': "480px" },
            other: { width: "auto", height: "100%", 'min-height': "480px" }
        }

        option.showClose = false;
        option.fileActionSettings = {
            showUpload: false,
            showDrag: false,
            showZoom: true,
            indicatorNew: '',
            indicatorSuccess: ''
        };
        option.showRemove = false;
        var $src = $(this);
        var accept = "";
        $.each(option.allowedFileExtensions, function (i, item) {
            if (i > 0)
                accept += ",";
            accept += "." + item;
        });

        $src.attr("accept", accept);
        $src.fileinput(option).on("filebatchselected", function (event, files) {
            $src.fileinput("upload");
        }).on("fileuploaded", function (e, params) {
            $(".kv-upload-progress").hide();
            $(".file-thumb-progress").hide();
            if (params.response.Code) {
                $.messager.alert("提示", params.response.msg, "info");
                $src.fileinput('clear').fileinput('enable');
                $src.parent().prev().hide();
                return;
            }
            if (typeof (option.fileuploaded) == "function") {
                option.fileuploaded(params.response[0]);
            }
        }).on("filesuccessremove", function (e, id) {
            $src.parent().show();
            if (typeof (option.filesuccessremove) == "function") {
                option.filesuccessremove(id);
            }
        }).on('fileerror', function (event, data, msg) {
            $.messager.alert('错误', msg, 'error');
        }).on('filedeleted', function (event, id) {
            $src.parent().show();
            if (typeof (option.filedeleted) == "function") {
                option.filedeleted(id);
            }
        }).on('filepredelete', function (event, key) {
            if (typeof (option.filepredelete) == "function") {
                option.filepredelete(key);
            }
        }).on('fileuploaderror', function (event, data, msg) {
            $.messager.alert("提示", msg, "info", function () { my.fileinput('clear') });
        }).on('fileerror', function (event, data, msg) {
            $.messager.alert("提示", msg, "info", function () { my.fileinput('clear') });
        });
    },
    AppendOffice: function (param) {
        var fileinput = $(this).parents(".file-input");
        var html = '<div name="customer-preview" style="padding:2px 0 2px 0" class="file-preview preview">' +
                      '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + param.File_Name + '"> ' +
                            param.File_Name +
                        '</div>' +
                      '<div class="file-actions">' +
                        '<div class="file-footer-buttons">' +
                            '<button type="button" class="kv-file-remove btn btn-xs btn-default" title="删除文件" url="' + param.File_Url + '" fileid="' + param.key + '" onclick="DeleteFile(this)">' +
                                '<i class="glyphicon glyphicon-trash text-danger"></i>' +
                            '</button> ' +
                            '<button type="button" class="kv-file-zoom btn btn-xs btn-default" title="查看详情" url="' + param.File_Url + '" onclick="ShowDetile(this)">' +
                                '<i class="glyphicon glyphicon-zoom-in"></i>' +
                            '</button>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                '</div>';
        fileinput.before(html);
        if (param.showDelete == false) {
            fileinput.prev().find(".kv-file-remove").remove();
        }
    },

    AppendOfficed: function (param) {
        var fileinput = $(this).parents(".file-input");
        var html = '<div name="customer-preview" style="padding:2px 0 2px 0" class="file-preview preview">' +
                      '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + param.File_Name + '"> ' +
                            param.File_Name +
                        '</div>' +
                      '<div class="file-actions">' +
                        '<div class="file-footer-buttons">';
        if (param.showDelete == true) {
            html += '<button type="button" class="kv-file-remove btn btn-xs btn-default" title="删除文件" url="' + param.File_Url + '" fileid="' + param.key + '" onclick="DeleteFileById(this)">' +
                '<i class="glyphicon glyphicon-trash text-danger"></i>' +
            '</button> '
        }
        html += '<button type="button" class="kv-file-zoom btn btn-xs btn-default" title="查看详情" url="' + param.File_Url + '" onclick="ShowDetile(this)">' +
                                '<i class="glyphicon glyphicon-zoom-in"></i>' +
                            '</button>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                '</div>';
        fileinput.before(html);
    }
});

function ShowDetile(item) {
    var btn = $(item);
    var url = btn.attr("url");
    var ext = url.substr(url.lastIndexOf('.') + 1);
    switch (ext.toLowerCase()) {
        case "doc":
        case "docx":
        case "xls":
        case "xlsx":
            window.open("/office/WordEditor?url=" + url);
            break;
        case "gcfx":
        case "gcf":
        case "ysd":
        case "dwg":
        case "rar":
            window.open(url);
            break;
        default:
            break;
    }

}

function DeleteFile(item) {
    var btn = $(item);
    var filebroswer = btn.parents(".file-preview").next().show().find(".btn-file");
    debugger;
    if (btn.attr("fileid") != 'undefined') {
        $.ajax({
            url: '/FileInput/DeleteFileById',
            data: { key: btn.attr("fileid") },
            success: function () {
                btn.parents("div[name='customer-preview']").remove();
                filebroswer.show();
                return false;
            }
        });
    } else {
        $.ajax({
            url: '/FileInput/DeleteFile',
            data: { key: btn.attr("url") },
            success: function () {
                btn.parents("div[name='customer-preview']").remove();
                filebroswer.show();
                return false;
            }
        });
    }
    return false;
}
function DeleteFileById(item) {
    var btn = $(item);
    var filebroswer = btn.parents(".file-preview").next().show().find(".btn-file");
    $.ajax({
        url: '/FileInput/DeleteFileById',
        data: { key: btn.attr("fileid") },
        success: function () {
            btn.parents("div[name='customer-preview']").remove();

            return false;
        }
    });
    return false;
}
var userfunction = null;
function MoveUp(element) {
    var preNode = $(element).parent().prev();
    if (preNode.length == 0) return;
    preNode.before($(element).parent());
}
function MoveDown(element) {
    var nextNode = $(element).parent().next();
    if (nextNode.length == 0) return;
    nextNode.after($(element).parent());
}
function DeleteEM(element, suffix) {
    var currentNode = $(element).parent();
    var rows = $("#EmpGrid" + suffix).datagrid('getRows');
    for (var i = 0; i < rows.length; i++) {
        var rowData = rows[i];
        if (rowData.User_ID == currentNode.attr("User_ID")) {
            $("#EmpGrid" + suffix).datagrid('unselectRow', i);
            break;
        }
    }
    currentNode.remove();
}
lang = {
    DialogTitle: "选择人员",
    Search: "查询",
    Reset: "重置",
    EmpName: "姓名",
    FixPhone: "固定电话",
    MobilePhone: "移动电话",
    MailAddress: "邮箱地址",
    Department: "部门",
    ProjectKey: "项目关键字",
    ProjectCode: "项目编号",
    ProjectName: "项目名称",
    UnitType: "单位类型",
    UnitName: '单位',
    RoleName: '角色',
    OK: "确认",
    Cancel: "取消"
}