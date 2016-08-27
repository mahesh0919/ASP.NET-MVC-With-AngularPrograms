using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularRouting.Models;
using System.Collections;

namespace AngularRouting.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Home()
        {
            return View();
        }

        public ActionResult Courses()
        {
            return View();
        }

        public ActionResult Students()
        {
            return View();
        }

        public ActionResult StudentsSearchResults()
        {
            return View();
        }

        public JsonResult GetListofStudents()
        {
            System.Threading.Thread.Sleep(2000);
            List<Student> stdList = Student.GetAllStudents();
            return Json(stdList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult studentDetails()
        {
            return View();
        }

        public ActionResult StudentParent()
        {
            return View();
        }

        public JsonResult GetParentMessage()
        {
            //List<string> ParentMessages = new List<string>() { "I am available to both child", "I am available to only one child" };
            return Json("I am available to both child", JsonRequestBehavior.AllowGet);
        }
        public ActionResult studentsTotal()
        {
            return View();
        }

        public ActionResult TestDirectives()
        {
            return View();
        }
        public ActionResult TemplateString()
        {

            return View();
        }

        public JsonResult GetStudent(int? id)
        {
            if (id == null)
                id = 1;
            int stdIndex = Convert.ToInt32(id);
            Student std = Student.GetStudent(stdIndex);
            return Json(std, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentbyName(string name)
        {
            List < Student > stdResult = Student.GetStudentbyName(name);
            return Json(stdResult, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Nestedscope()
        {
            return View();
        }
        public ActionResult DirectiveScope()
        {

            return View();
        }

        public ActionResult serviceVsFactory()
        {
            return View();
        }


    }
}
