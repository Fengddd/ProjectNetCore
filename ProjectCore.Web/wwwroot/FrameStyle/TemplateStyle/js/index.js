(function ($) {
    $.learuntab = {
        requestFullScreen: function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen: function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },
        refreshTab: function () {
            var currentId = $('.page-tabs-content').find('.active').attr('data-id');
            var target = $('.LRADMS_iframe[data-id="' + currentId + '"]');
            var url = target.attr('src');
            //$.loading(true);
            target.attr('src', url).load(function () {
                //$.loading(false);
            });
        },
        activeTab: function () {
            var currentId = $(this).data('id');
            if (!$(this).hasClass('active')) {
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == currentId) {
                        $(this).show().siblings('.LRADMS_iframe').hide();
                        return false;
                    }
                });
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $.learuntab.scrollToTab(this);
            }
        },
        closeOtherTabs: function () {
            $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').not(".active").each(function () {
                $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).remove();
            });
            $('.page-tabs-content').css("margin-left", "0");
        },
        closeTab: function () {
            var closeTabId = $(this).parents('.menuTab').data('id');
            var currentWidth = $(this).parents('.menuTab').width();
            if ($(this).parents('.menuTab').hasClass('active')) {
                if ($(this).parents('.menuTab').next('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').next('.menuTab:eq(0)').data('id');
                    $(this).parents('.menuTab').next('.menuTab:eq(0)').addClass('active');

                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                    if (marginLeftVal < 0) {
                        $('.page-tabs-content').animate({
                            marginLeft: (marginLeftVal + currentWidth) + 'px'
                        }, "fast");
                    }
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
                if ($(this).parents('.menuTab').prev('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').prev('.menuTab:last').data('id');
                    $(this).parents('.menuTab').prev('.menuTab:last').addClass('active');
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
            }
            else {
                $(this).parents('.menuTab').remove();
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        addTab: function () {
            debugger;
            $(".navbar-custom-menu>ul>li.open").removeClass("open");
            
            var dataId = $(this).attr('data-id');
            var dataUrl = $(this).attr("mark");
            var menuName = $.trim($(this).text());
          

            var flag = true;
            if (dataUrl == undefined || $.trim(dataUrl).length == 0) {
                return false;
            }
            $('.menuTab').each(function () {
                if ($(this).data('id') === dataUrl) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.menuTab').removeClass('active');
                        $.learuntab.scrollToTab(this);
                        $('.mainContent .LRADMS_iframe').each(function () {
                            if ($(this).data('id') === dataUrl) {
                                $(this).show().siblings('.LRADMS_iframe').hide();
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-remove"></i></a>';
                $('.menuTab').removeClass('active');
                var str1 = '<iframe class="LRADMS_iframe" id="iframe' + dataId + '" name="iframe' + dataId + '"  width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                $('.mainContent').find('iframe.LRADMS_iframe').hide();
                $('.mainContent').append(str1);
                //$.loading(true);
                $('.mainContent iframe:visible').load(function () {
                    //$.loading(false);
                });
                $('.menuTabs .page-tabs-content').append(str);
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        scrollTabRight: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                if (scrollVal > 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: 0 - scrollVal + 'px'
                    }, "fast");
                }
            }
        },
        scrollTabLeft: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                if ($.learuntab.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                    while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                        offsetVal += $(tabElement).outerWidth(true);
                        tabElement = $(tabElement).prev();
                    }
                    scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                }
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        scrollToTab: function (element) {
            var marginLeftVal = $.learuntab.calSumWidth($(element).prevAll()), marginRightVal = $.learuntab.calSumWidth($(element).nextAll());
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").outerWidth() < visibleWidth) {
                scrollVal = 0;
            } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
                if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                    scrollVal = marginLeftVal;
                    var tabElement = element;
                    while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                        scrollVal -= $(tabElement).prev().outerWidth();
                        tabElement = $(tabElement).prev();
                    }
                }
            } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
                scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        calSumWidth: function (element) {
            var width = 0;
            $(element).each(function () {
                width += $(this).outerWidth(true);
            });
            return width;
        },
        init: function () {
           
           // $('.menuItem').on('click', $.learuntab.addTab);
            $('.menuTabs').on('click', '.menuTab i', $.learuntab.closeTab);
            $('.menuTabs').on('click', '.menuTab', $.learuntab.activeTab);
            $('.tabLeft').on('click', $.learuntab.scrollTabLeft);
            $('.tabRight').on('click', $.learuntab.scrollTabRight);
            $('.tabReload').on('click', $.learuntab.refreshTab);
            $('.tabCloseCurrent').on('click', function () {
                $('.page-tabs-content').find('.active i').trigger("click");
            });
            $('.tabCloseAll').on('click', function () {
                $('.page-tabs-content').children("[data-id]").find('.fa-remove').each(function () {
                    $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                    $(this).parents('a').remove();
                });
                $('.page-tabs-content').children("[data-id]:first").each(function () {
                    $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').show();
                    $(this).addClass("active");
                });
                $('.page-tabs-content').css("margin-left", "0");
            });
            $('.tabCloseOther').on('click', $.learuntab.closeOtherTabs);
            $('.fullscreen').on('click', function () {
                if (!$(this).attr('fullscreen')) {
                    $(this).attr('fullscreen', 'true');
                    $.learuntab.requestFullScreen();
                } else {
                    $(this).removeAttr('fullscreen')
                    $.learuntab.exitFullscreen();
                }
            });
        }
    };

    $.learunindex = {
        load: function () {
            $("body").removeClass("hold-transition")
            $("#content-wrapper").find('.mainContent').height($(window).height() - 100);
            $(window).resize(function (e) {
                $("#content-wrapper").find('.mainContent').height($(window).height() - 100);
            });
            $(".sidebar-toggle").click(function () {
                if (!$("body").hasClass("sidebar-collapse")) {
                    $("body").addClass("sidebar-collapse");
                } else {
                    $("body").removeClass("sidebar-collapse");
                }
            })
            $(window).load(function () {
                window.setTimeout(function () {
                    $('#ajax-loader').fadeOut();
                }, 300);
            });
        },
        jsonWhere: function (data, action) {
            if (action == null) return;
            var reval = new Array();
            $(data).each(function (i, v) {
                if (action(v)) {
                    reval.push(v);
                }
            })
            return reval;
        },
        loadMenu: function () {
            //var data = [{ "F_ModuleId": "1", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "系统管理", "F_Icon": "fa fa-desktop", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "8", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "机构管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "https://www.baidu.com/", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "7ae94059-9aa5-48eb-8330-4e2a6565b193", "F_ParentId": "1", "F_EnCode": "AreaManage", "F_FullName": "行政区域", "F_Icon": "fa fa-leaf", "F_UrlAddress": "https://www.baidu.com/", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "行政区域管理", "F_CreateDate": "2015-11-12 14:38:20", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:05:33", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "34e362f4-c220-4fb7-b3f0-288c83417cb3", "F_ParentId": "7cec0a0f-7204-4240-b009-312fa0c11cbf", "F_EnCode": "DataBaseLink", "F_FullName": "数据库连接", "F_Icon": "fa fa-plug", "F_UrlAddress": "/SystemManage/DataBaseLink/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "动态链接数据库", "F_CreateDate": "2015-11-24 09:50:22", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:07:45", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "1b642904-d674-495f-a1e1-4814cc543870", "F_ParentId": "5", "F_EnCode": "发起流程", "F_FullName": "发起流程", "F_Icon": "fa fa-edit", "F_UrlAddress": "/FlowManage/FlowLaunch/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 22:12:27", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-01-12 17:39:01", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "a977d91e-77b7-4d60-a7ad-dfbc138f7c0a", "F_ParentId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3", "F_EnCode": "企业号设置", "F_FullName": "企业号设置", "F_Icon": "fa fa-plug", "F_UrlAddress": "/WeChatManage/Token/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-12-22 17:20:21", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2015-12-29 19:05:02", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "00ae31cf-b340-4c17-9ee7-6dd08943df02", "F_ParentId": "458113c6-b0be-4d6f-acce-7524f4bc3e88", "F_EnCode": "FormCategory", "F_FullName": "表单类别", "F_Icon": "fa fa-tags", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=FormSort", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-27 10:30:47", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2015-12-01 09:42:16", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClientBaseData", "F_FullName": "基础设置", "F_Icon": "fa fa fa-book", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 1, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "客户基础资料", "F_CreateDate": "2016-03-11 11:51:34", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-03-29 09:41:15", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "92a535c9-4d4b-4500-968d-a142e671c09b", "F_ParentId": "6", "F_EnCode": "ReportTemp", "F_FullName": "报表管理", "F_Icon": "fa fa-cogs", "F_UrlAddress": "/ReportManage/Report/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 1, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "报表模板管理", "F_CreateDate": "2016-01-13 17:21:17", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:14:56", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "e35d24ce-8a6a-46b9-8b3f-6dc864a8f342", "F_ParentId": "4", "F_EnCode": "NewManage", "F_FullName": "新闻中心", "F_Icon": "fa fa-feed", "F_UrlAddress": "/PublicInfoManage/News/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-27 09:47:16", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:17:09", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "3b03806d-98d8-40fe-9895-01633119458c", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_ProductInfo", "F_FullName": "产品信息", "F_Icon": "fa fa-shopping-bag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_ProductInfo", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "销售产品信息", "F_CreateDate": "2016-03-11 16:42:57", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-03-23 16:36:07", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "27b6c487-a2d9-4a3a-a40d-dbba27a53d26", "F_ParentId": "b5cb98f6-fb41-4a0f-bc11-469ff117a411", "F_EnCode": "FlowMonitor", "F_FullName": "流程监控", "F_Icon": "fa fa-eye", "F_UrlAddress": "/FlowManage/FlowProcess/MonitoringIndex", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 21:58:17", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-26 12:06:13", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "6252983c-52f5-402c-991b-ad19a9cb1f94", "F_ParentId": "4", "F_EnCode": "NoticeManage", "F_FullName": "通知公告", "F_Icon": "fa fa-volume-up", "F_UrlAddress": "/PublicInfoManage/Notice/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-27 09:47:33", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:17:39", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "66f6301c-1789-4525-a7d2-2b83272aafa6", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClientChance", "F_FullName": "商机管理", "F_Icon": "fa fa-binoculars", "F_UrlAddress": "/CustomerManage/Chance/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "商机管理", "F_CreateDate": "2016-03-11 11:55:16", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-29 14:19:13", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "affacee1-41a3-4c7b-8804-f1c1926babbd", "F_ParentId": "6", "F_EnCode": "PurchaseReport", "F_FullName": "采购报表", "F_Icon": "fa fa-bar-chart", "F_UrlAddress": "/ReportManage/ReportDemo/Purchase", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-01-04 16:29:07", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-29 14:15:19", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "6be31cc9-4aee-4279-8435-4b266cec33f0", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_Trade", "F_FullName": "客户行业", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_Trade", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-11 16:45:14", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-03-23 16:36:23", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "5cc9d2d9-e097-4b51-9b9e-84ca9f1a0ab5", "F_ParentId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3", "F_EnCode": "企业号部门", "F_FullName": "企业号部门", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "/WeChatManage/Organize/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-12-22 17:20:38", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:10:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "08dfd779-92d5-4cd8-9982-a76176af0f7c", "F_ParentId": "458113c6-b0be-4d6f-acce-7524f4bc3e88", "F_EnCode": "FlowCategory", "F_FullName": "流程类别", "F_Icon": "fa fa-tags", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=FlowSort", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 14:42:18", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2015-11-27 10:41:42", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "c4d7ce1f-72de-4651-b495-6c466261e9af", "F_ParentId": "7cec0a0f-7204-4240-b009-312fa0c11cbf", "F_EnCode": "DataBaseBackup", "F_FullName": "数据库备份", "F_Icon": "fa fa-cloud-download", "F_UrlAddress": "/SystemManage/DataBaseBackup/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "数据备份、数据还原", "F_CreateDate": "2015-11-24 09:55:52", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:08:22", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "691f3810-a602-4523-8518-ce5856482d48", "F_ParentId": "5", "F_EnCode": "草稿流程", "F_FullName": "草稿流程", "F_Icon": "fa fa-file-text-o", "F_UrlAddress": "/FlowManage/FlowRoughdraft/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 22:13:21", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-03-19 16:15:15", "F_ModifyUserId": "24a055d6-5924-44c5-be52-3715cdd68011", "F_ModifyUserName": "陈彬彬" }, { "F_ModuleId": "9", "F_ParentId": "2", "F_EnCode": "DepartmentManage", "F_FullName": "部门管理", "F_Icon": "fa fa-th-list", "F_UrlAddress": "/BaseManage/Department/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:57:20", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "2", "F_ParentId": "0", "F_EnCode": "BaseManage", "F_FullName": "单位组织", "F_Icon": "fa fa-coffee", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-03-11 11:02:06", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "4efd37bf-e3ef-4ced-8248-58eba046d78b", "F_ParentId": "1", "F_EnCode": "DataItemManage", "F_FullName": "通用字典", "F_Icon": "fa fa-book", "F_UrlAddress": "/SystemManage/DataItemDetail/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 2, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "通用数据字典", "F_CreateDate": "2015-11-12 14:37:04", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:06:26", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "5", "F_ParentId": "0", "F_EnCode": "FlowManage", "F_FullName": "工作流程", "F_Icon": "fa fa-share-alt", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-11 10:21:44", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "7adc5a16-54a4-408e-a101-2ddab8117d67", "F_ParentId": "1", "F_EnCode": "CodeRule", "F_FullName": "单据编码", "F_Icon": "fa fa-barcode", "F_UrlAddress": "/SystemManage/CodeRule/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "自动产生号码", "F_CreateDate": "2015-11-12 14:47:51", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-05-03 15:56:56", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "11", "F_ParentId": "2", "F_EnCode": "RoleManage", "F_FullName": "角色管理", "F_Icon": "fa fa-paw", "F_UrlAddress": "/BaseManage/Role/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-05-23 18:12:29", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "a57993fa-5a94-44a8-a330-89196515c1d9", "F_ParentId": "458113c6-b0be-4d6f-acce-7524f4bc3e88", "F_EnCode": "FormDesign", "F_FullName": "表单设计", "F_Icon": "fa fa-puzzle-piece", "F_UrlAddress": "/FlowManage/FormDesign/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-27 10:29:53", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2015-12-01 09:41:58", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "4d0f2e44-f68f-41fd-a55c-40ac67453ef4", "F_ParentId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3", "F_EnCode": "企业号成员", "F_FullName": "企业号成员", "F_Icon": "fa fa-users", "F_UrlAddress": "/WeChatManage/User/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-12-22 17:20:53", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:11:24", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "c30310a7-d0a5-4bf6-8655-c3834a8cc73d", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_Sort", "F_FullName": "客户类别", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_Sort", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-11 16:47:39", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-03-23 16:36:33", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "ff1823b5-a966-4e6c-83de-807854f4f0fb", "F_ParentId": "6", "F_EnCode": "SalesReport", "F_FullName": "销售报表", "F_Icon": "fa fa-line-chart", "F_UrlAddress": "/ReportManage/ReportDemo/Sales", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-01-04 16:29:46", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-29 14:15:34", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "021a59b0-2589-4f9e-8140-6052177a967c", "F_ParentId": "5", "F_EnCode": "我的流程", "F_FullName": "我的流程", "F_Icon": "fa fa-file-word-o", "F_UrlAddress": "/FlowManage/FlowMyProcess/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-19 13:32:54", "F_CreateUserId": "24a055d6-5924-44c5-be52-3715cdd68011", "F_CreateUserName": "陈彬彬", "F_ModifyDate": "2016-03-22 20:02:21", "F_ModifyUserId": "24a055d6-5924-44c5-be52-3715cdd68011", "F_ModifyUserName": "陈彬彬" }, { "F_ModuleId": "1d3797f6-5cd2-41bc-b769-27f2513d61a9", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClientInfoManage", "F_FullName": "客户管理", "F_Icon": "fa fa-suitcase", "F_UrlAddress": "/CustomerManage/Customer/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "客户管理", "F_CreateDate": "2016-03-11 11:57:48", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-29 14:19:05", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020", "F_ParentId": "4", "F_EnCode": "ResourceFileManage", "F_FullName": "文件资料", "F_Icon": "fa fa-jsfiddle", "F_UrlAddress": "/PublicInfoManage/ResourceFile/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "文件管理", "F_CreateDate": "2015-11-27 09:47:48", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-21 15:06:21", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "2f820f6e-ae2e-472f-82cc-0129a2a57597", "F_ParentId": "7cec0a0f-7204-4240-b009-312fa0c11cbf", "F_EnCode": "DataBaseTable", "F_FullName": "数据表管理", "F_Icon": "fa fa-table", "F_UrlAddress": "/SystemManage/DataBaseTable/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "数据库表结构", "F_CreateDate": "2015-11-24 09:53:42", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:08:55", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "c0544bfd-a557-45fc-a856-a678a1e88bfc", "F_ParentId": "b5cb98f6-fb41-4a0f-bc11-469ff117a411", "F_EnCode": "FlowDelegate", "F_FullName": "流程指派", "F_Icon": "fa fa-random", "F_UrlAddress": "/FlowManage/FlowProcess/DesignationIndex", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 3, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 21:58:36", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-26 12:06:40", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "901e6122-985d-4c84-8d8c-56560520f6ed", "F_ParentId": "6", "F_EnCode": "StorageReport", "F_FullName": "仓存报表", "F_Icon": "fa fa-area-chart", "F_UrlAddress": "/ReportManage/ReportDemo/Store", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-01-04 16:30:25", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-29 14:15:52", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "aed02ee7-322f-47f0-8ad6-ab0a2172628f", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_Degree", "F_FullName": "客户程度", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_Degree", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-11 16:49:46", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-06 10:23:36", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "5f1fa264-cc9b-4146-b49e-743e4633bb4c", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClientInvoice", "F_FullName": "客户开票", "F_Icon": "fa fa-coffee", "F_UrlAddress": "/CustomerManage/Invoice/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "开票管理", "F_CreateDate": "2016-04-01 10:40:18", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:20:23", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "aa844d70-7211-41d9-907a-f9a10f4ac801", "F_ParentId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3", "F_EnCode": "企业号应用", "F_FullName": "企业号应用", "F_Icon": "fa fa-safari", "F_UrlAddress": "/WeChatManage/App/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-12-22 17:21:25", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2015-12-25 10:34:44", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "f63a252b-975f-4832-a5be-1ce733bc8ece", "F_ParentId": "458113c6-b0be-4d6f-acce-7524f4bc3e88", "F_EnCode": "FlowDesign", "F_FullName": "流程设计", "F_Icon": "fa fa-share-alt", "F_UrlAddress": "/FlowManage/FlowDesign/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 14:42:43", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2015-11-27 10:41:09", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "0d296398-bc0e-4f38-996a-6e24bc88cc53", "F_ParentId": "5", "F_EnCode": "待办流程", "F_FullName": "待办流程", "F_Icon": "fa fa-hourglass-half", "F_UrlAddress": "/FlowManage/FlowBeforeProcessing/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 22:13:39", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-03-23 18:07:42", "F_ModifyUserId": "24a055d6-5924-44c5-be52-3715cdd68011", "F_ModifyUserName": "陈彬彬" }, { "F_ModuleId": "7cec0a0f-7204-4240-b009-312fa0c11cbf", "F_ParentId": "1", "F_EnCode": "DatabaseManage", "F_FullName": "数据管理", "F_Icon": "fa fa-database", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-12 15:03:09", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-03-11 12:10:01", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "6", "F_ParentId": "0", "F_EnCode": "ReportManage", "F_FullName": "报表中心", "F_Icon": "fa fa-area-chart", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 4, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-11 10:21:54", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "4", "F_ParentId": "0", "F_EnCode": "CommonInfo", "F_FullName": "公共信息", "F_Icon": "fa fa-globe", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 5, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-11 10:21:59", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "13", "F_ParentId": "2", "F_EnCode": "PostManage", "F_FullName": "岗位管理", "F_Icon": "fa fa-graduation-cap", "F_UrlAddress": "/BaseManage/Post/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 5, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:59:17", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "923f7d65-e307-45f7-8f96-73ecbf23b324", "F_ParentId": "5", "F_EnCode": "已办流程", "F_FullName": "已办流程", "F_Icon": "fa fa-flag", "F_UrlAddress": "/FlowManage/FlowAferProcessing/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 5, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 22:14:03", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-03-25 11:39:51", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "52fe82f8-41ba-433e-9351-ef67e5b35217", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_Level", "F_FullName": "客户级别", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_Level", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 5, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-11 16:52:08", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-06 10:23:29", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "b352f049-4331-4b19-ac22-e379cb30bd55", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClientOrder", "F_FullName": "客户订单", "F_Icon": "fa fa-modx", "F_UrlAddress": "/CustomerManage/Order/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 5, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "客户订单管理", "F_CreateDate": "2016-03-11 12:01:30", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-29 14:20:16", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3", "F_ParentId": "1", "F_EnCode": "WeChatManage", "F_FullName": "微信管理", "F_Icon": "fa fa-weixin", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 5, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-12-22 16:42:12", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2015-12-22 18:20:30", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "9db71a92-2ecb-496c-839f-7a82bc22905d", "F_ParentId": "6", "F_EnCode": "MoneyReport", "F_FullName": "对账报表", "F_Icon": "fa fa-pie-chart", "F_UrlAddress": "/ReportManage/ReportDemo/Reconciliation", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 5, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "现金银行报表", "F_CreateDate": "2016-01-04 16:31:03", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-29 14:16:09", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "c6b80ed5-b0cb-4844-ba1a-725d2cb4f935", "F_ParentId": "4", "F_EnCode": "EmailManage", "F_FullName": "邮件中心", "F_Icon": "fa fa-send", "F_UrlAddress": "/PublicInfoManage/Email/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "邮件管理", "F_CreateDate": "2015-11-27 09:48:38", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-21 15:06:31", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "23713d3a-810f-422d-acd5-39bec28ce47e", "F_ParentId": "4", "F_EnCode": "ScheduleManage", "F_FullName": "日程管理", "F_Icon": "fa fa-calendar", "F_UrlAddress": "/PublicInfoManage/Schedule/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "日程管理", "F_CreateDate": "2016-04-21 14:15:30", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-21 16:08:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_ParentId": "0", "F_EnCode": "CustomerManage", "F_FullName": "客户关系", "F_Icon": "fa fa-briefcase", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "客户关系管理", "F_CreateDate": "2016-03-11 10:53:05", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-21 16:00:07", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "be9cbe61-265f-4ddd-851e-d5a1cef6011b", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_ChanceSource", "F_FullName": "商机来源", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_ChanceSource", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-12 11:01:38", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-03-23 16:36:58", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "535d92e9-e066-406c-b2c2-697150a5bdff", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClienReceivable", "F_FullName": "收款管理", "F_Icon": "fa fa-money", "F_UrlAddress": "/CustomerManage/Receivable/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "收款管理", "F_CreateDate": "2016-04-06 16:04:16", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:20:56", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "6a67a67f-ef07-41e7-baa5-00bc5f662a76", "F_ParentId": "5", "F_EnCode": "工作委托", "F_FullName": "工作委托", "F_Icon": "fa fa-coffee", "F_UrlAddress": "/FlowManage/FlowDelegate/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 22:14:20", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-03-28 17:34:24", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "12", "F_ParentId": "2", "F_EnCode": "JobManage", "F_FullName": "职位管理", "F_Icon": "fa fa-briefcase", "F_UrlAddress": "/BaseManage/Job/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 12:00:32", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "f21fa3a0-c523-4d02-99ca-fd8dd3ae3d59", "F_ParentId": "1", "F_EnCode": "SystemLog", "F_FullName": "系统日志", "F_Icon": "fa fa-warning", "F_UrlAddress": "/SystemManage/Log/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 6, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "登录日志、操作日志。异常日志", "F_CreateDate": "2015-11-12 15:04:58", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:12:14", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "14", "F_ParentId": "2", "F_EnCode": "UserGroupManage", "F_FullName": "用户组管理", "F_Icon": "fa fa-group", "F_UrlAddress": "/BaseManage/UserGroup/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 7, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 12:01:17", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "21", "F_ParentId": "1", "F_EnCode": "SystemModule", "F_FullName": "系统功能", "F_Icon": "fa fa-navicon", "F_UrlAddress": "/AuthorizeManage/Module/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 7, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "系统导航功能", "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 14:13:00", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "1ef31fba-7f0a-46f7-b533-49dd0c2e51e0", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClienReceivableReport", "F_FullName": "收款报表", "F_Icon": "fa fa-bar-chart", "F_UrlAddress": "/CustomerManage/ReceivableReport/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 7, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "收款报表", "F_CreateDate": "2016-04-20 09:41:51", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:21:24", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "80620d6f-55bd-492b-9c21-1b04ca268e75", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_ChancePhase", "F_FullName": "商机阶段", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_ChancePhase", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 7, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-12 11:02:09", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-03-23 16:37:06", "F_ModifyUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_ModifyUserName": "佘赐雄" }, { "F_ModuleId": "458113c6-b0be-4d6f-acce-7524f4bc3e88", "F_ParentId": "5", "F_EnCode": "流程配置", "F_FullName": "流程配置", "F_Icon": "fa fa-wrench", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 7, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-27 10:39:01", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-03-19 13:34:52", "F_ModifyUserId": "24a055d6-5924-44c5-be52-3715cdd68011", "F_ModifyUserName": "陈彬彬" }, { "F_ModuleId": "b0261df5-7be0-4c8e-829c-15836e200af0", "F_ParentId": "1", "F_EnCode": "SystemForm", "F_FullName": "系统表单", "F_Icon": "fa fa-paw", "F_UrlAddress": "/AuthorizeManage/ModuleForm/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 8, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "系统功能自定义表单", "F_CreateDate": "2016-04-11 11:19:06", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:14:02", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "9fc384f5-efb7-439e-9fe1-3e50807e6399", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClienExpenses", "F_FullName": "支出管理", "F_Icon": "fa fa-credit-card-alt", "F_UrlAddress": "/CustomerManage/Expenses/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 8, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "支出管理", "F_CreateDate": "2016-04-20 11:31:56", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-29 14:21:50", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "77f13de5-32ad-4226-9e24-f1db507e78cb", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_PaymentMode", "F_FullName": "收支方式", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_PaymentMode", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 8, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-14 19:49:53", "F_CreateUserId": "0f36148c-719f-41e0-8c8c-16ffbc40d0e0", "F_CreateUserName": "佘赐雄", "F_ModifyDate": "2016-04-20 09:55:52", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "b5cb98f6-fb41-4a0f-bc11-469ff117a411", "F_ParentId": "5", "F_EnCode": "FlowManage", "F_FullName": "流程管理", "F_Icon": "fa fa-cogs", "F_UrlAddress": null, "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 8, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2015-11-23 10:20:00", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-03-19 13:33:50", "F_ModifyUserId": "24a055d6-5924-44c5-be52-3715cdd68011", "F_ModifyUserName": "陈彬彬" }, { "F_ModuleId": "cfa631fe-e7f8-42b5-911f-7172f178a811", "F_ParentId": "1", "F_EnCode": "CodeCreate", "F_FullName": "快速开发", "F_Icon": "fa fa-code", "F_UrlAddress": "/GeneratorManage/Template/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 8, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "自动生成代码、自动生成功能", "F_CreateDate": "2015-11-12 15:21:38", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-12 10:52:30", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "10", "F_ParentId": "2", "F_EnCode": "UserManage", "F_FullName": "用户管理", "F_Icon": "fa fa-user", "F_UrlAddress": "/BaseManage/User/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 8, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:51:54", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "a653a69e-5dcc-4ece-b457-fc0875271a88", "F_ParentId": "1", "F_EnCode": "AppCreate", "F_FullName": "移动开发", "F_Icon": "fa fa-file-code-o", "F_UrlAddress": "/AppManage/AppProjects/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 9, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "手机移动端开发", "F_CreateDate": "2016-06-14 15:57:59", "F_CreateUserId": "24a055d6-5924-44c5-be52-3715cdd68011", "F_CreateUserName": "陈彬彬", "F_ModifyDate": "2016-06-15 16:27:42", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "dec79ca7-3b54-432a-be1e-c96e7a2c7150", "F_ParentId": "ad147f6d-613f-4d2d-8c84-b749d0754f3b", "F_EnCode": "ClienCashBalanceReport", "F_FullName": "现金报表", "F_Icon": "fa fa-bar-chart", "F_UrlAddress": "/CustomerManage/CashBalanceReport/Index", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 9, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": "收支报表", "F_CreateDate": "2016-04-28 15:12:16", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-05-27 16:29:15", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "ddce0dc1-3345-41b7-9716-22641fbbfaed", "F_ParentId": "6", "F_EnCode": "rpt001", "F_FullName": "销售日报表", "F_Icon": "fa fa-pie-chart", "F_UrlAddress": "/ReportManage/Report/ReportPreview?keyValue=a9762855-cd45-4815-a8e1-c8b818f79ad5", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 9, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-03-22 16:55:20", "F_CreateUserId": "eab01522-f4fe-48ce-8db6-76fd7813cdf5", "F_CreateUserName": "刘晓雷", "F_ModifyDate": "2016-03-29 16:53:54", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_PaymentAccount", "F_FullName": "收支账户", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_PaymentAccount", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 9, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-04-20 09:54:48", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-20 09:55:13", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }, { "F_ModuleId": "eab4a37f-d976-42b7-9589-489ed0678151", "F_ParentId": "16d4e2d5-d154-455f-94f7-63bf80ab26aa", "F_EnCode": "Client_ExpensesType", "F_FullName": "支出种类", "F_Icon": "fa fa-tag", "F_UrlAddress": "/SystemManage/DataItemList/Index?ItemCode=Client_ExpensesType", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 0, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 10, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": "2016-04-20 15:06:10", "F_CreateUserId": "System", "F_CreateUserName": "超级管理员", "F_ModifyDate": "2016-04-20 15:06:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" }];

            $.post("/Home/MenuPermissions", function(data) {

                var _html = "";
                $.each(data, function (i) {
                    var row = data[i];
                    if (row.parentMenuId === 0) {
                        if (i === 0) {
                            _html += '<li class="treeview active">';
                        } else {
                            _html += '<li class="treeview">';
                        }
                        _html += '<a href="#">'
                        _html += '<i class="' + row.menuIcon + '"></i><span>' + row.menuName + '</span><i class="fa fa-caret-left pull-right"></i>';
                        _html += '</a>'
                        var childNodes = $.learunindex.jsonWhere(data, function (v) { return v.parentMenuId === row.menuId });
                        if (childNodes.length > 0) {
                            _html += '<ul class="treeview-menu">';
                            $.each(childNodes, function (i) {
                                var subrow = childNodes[i];
                                var subchildNodes = $.learunindex.jsonWhere(data, function (v) { return v.parentMenuId === subrow.menuId });
                                _html += '<li>';
                                if (subchildNodes.length > 0) {
                                    _html += '<a href="#"><i class="' + subrow.menuIcon + '"></i>' + subrow.menuName + '';
                                    _html += '<i class="fa fa-caret-left pull-right"></i></a>';
                                    _html += '<ul class="treeview-menu">';
                                    $.each(subchildNodes, function (i) {
                                        var subchildNodesrow = subchildNodes[i];
                                        _html += '<li><a class="menuItem" data-id="' + subchildNodesrow.menuId + '"  mark="' + subchildNodesrow.menuUrl + '" href="'+subchildNodesrow.menuUrl+'"><i class="' + subchildNodesrow.menuIcon + '"></i>' + subchildNodesrow.menuName + '</a></li>';
                                    });
                                    _html += '</ul>';

                                } else {
                                    _html += '<a class="menuItem" data-id="' + subrow.menuId + '"  mark="' + subrow.menuUrl + '" href="' + subrow.menuUrl + '"><i class="' + subrow.menuIcon + '"></i>' + subrow.menuName + '</a>';
                                }
                                _html += '</li>';
                            });
                            _html += '</ul>';
                        }
                        _html += '</li>';
                    }
                });
               
                $("#sidebar-menu").append(_html);

                $("#sidebar-menu li a").click(function () {
                    var d = $(this), e = d.next();
                    if (e.is(".treeview-menu") && e.is(":visible")) {
                        e.slideUp(500,
                            function () {
                                e.removeClass("menu-open");
                            }),
                            e.parent("li").removeClass("active");
                    } else if (e.is(".treeview-menu") && !e.is(":visible")) {
                        var f = d.parents("ul").first(),
                            g = f.find("ul:visible").slideUp(500);
                        g.removeClass("menu-open");
                        var h = d.parent("li");
                        e.slideDown(500,
                            function () {
                                e.addClass("menu-open"),
                                    f.find("li.active").removeClass("active"),
                                    h.addClass("active");

                                var height1 = $(window).height() - $("#sidebar-menu >li.active").position().top - 41;
                                var height2 = $("#sidebar-menu li > ul.menu-open").height() + 10;
                                if (height2 > height1) {
                                    $("#sidebar-menu >li > ul.menu-open").css({
                                        overflow: "auto",
                                        height: height1
                                    });
                                }
                            });
                    }
                    e.is(".treeview-menu");
                });
                //有tab标签
                //$('.menuItem').on('click', $.learuntab.addTab);
            });

          
        }
    };
    $(function () {
        $.learunindex.load();
        $.learunindex.loadMenu();
        $.learuntab.init();
    });
})(jQuery);