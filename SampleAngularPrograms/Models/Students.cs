using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularRouting.Models
{
    public class Student
    {
        public int id { get; set; }
        public string name { get; set; }
        public string gender { get; set; }
        public string city { get; set; }
        public static List<Student> stdList = new List<Student>();
        static Student()
        {
            stdList = new List<Student> { 
                    new Student(){ id =1 , name = "Mahesh", gender ="Male", city ="Hyderabad1" },
                    new Student(){ id =2 , name = "Masood", gender ="Male", city ="Hyderabad2" },
                    new Student(){ id =3 , name = "Mohit", gender ="Male", city ="Hyderabad3" },
                    new Student(){ id =5 , name = "Shanmukh", gender ="Male", city ="Hyderabad4" },
                    new Student(){ id =6 , name = "Keerthan", gender ="Male", city ="Hyderabad5" },
                    new Student(){ id =7 , name = "Kalyan", gender ="Male", city ="Hyderabad6" }
            };
        }

        public static List<Student> GetAllStudents()
        {
            return Student.stdList;
        }
        public static Student GetStudent(int id)
        {
            return Student.stdList[id-1];
        }
        public static List<Student> GetStudentbyName(string name)
        {
            List<Student> StudentSearchResults = (from std in Student.stdList
                                                  where std.name.ToUpper().Contains(name.ToUpper())
                                                   select std).ToList<Student>();
            return StudentSearchResults;
        }

    
    }
}