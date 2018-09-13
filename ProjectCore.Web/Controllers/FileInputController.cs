using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Web;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting.Server;

namespace ProjectCore.Web.Controllers
{
    public class FileInputController : Controller
    {
        private readonly IHostingEnvironment _hostingEnv;

        public FileInputController(IHostingEnvironment hostingEnv)
        {
            _hostingEnv = hostingEnv;
        }

        public IActionResult Index()
        {
            return View();
        }

      
        [HttpPost]
        public JsonResult UploadFiles()
        {
            
            // ReSharper disable once TooWideLocalVariableScope
            var fileFullname = "";
            // ReSharper disable once TooWideLocalVariableScope
            var filename = "";
            var result = new List<Dictionary<string, string>>();
            try
            {               
                var files = Request.Form.Files;
                if (files.Count <= 0)
                {
                    return Json(new { code = "1", msg = "上传的文件不存在或没有内容" });
                }
                foreach (var file in files)
                {
                    //获取名称
                    filename = ContentDispositionHeaderValue
                                     .Parse(file.ContentDisposition)
                                     .FileName
                                     .Trim('"');
                    //文件保存的路径
                    var filePath = _hostingEnv.WebRootPath + $@"\images\";

                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    //保存的全路径
                    fileFullname = filePath + filename;
                    
                    using (FileStream fs = System.IO.File.Create(fileFullname))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }

                    result.Add(new Dictionary<string, string>()
                    {
                        { "Code","0" },
                        { "File_BusinessColumn", "dd" },
                        { "File_Name", filename },
                        { "caption" , filename },
                        { "File_Url", fileFullname },
                        { "url",  filePath}
                    });
                }
            }
            catch (Exception e)
            {
                return Json(new { code = 1, msg = e.Message });
            }
            return Json(result);
        }

        public ActionResult DeleteFile(string key)
        {
            string webRootPath = _hostingEnv.WebRootPath + key;
            string result = "删除成功！";
            try
            {
                
                if (System.IO.File.Exists(webRootPath))
                {
                    System.IO.File.Delete(webRootPath);//删除文件
                }
            }
            catch (Exception ex)
            {
                result = "删除失败！" + ex.Message;
            }
            return Json(result);
        }

        public ActionResult DeleteFileId(string key)
        {
            string webRootPath = _hostingEnv.WebRootPath + key;
            string result = "删除成功！";
            try
            {

                if (System.IO.File.Exists(webRootPath))
                {
                    System.IO.File.Delete(webRootPath);//删除文件
                }
            }
            catch (Exception ex)
            {
                result = "删除失败！" + ex.Message;
            }
            return Json(result);
        }

    }
}