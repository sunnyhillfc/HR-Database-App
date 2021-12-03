using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace RoiBackend
{
    public class Department
    {
        private static string _xmlDataPath = HttpContext.Current.Server.MapPath("~/data/Departments.xml");
        public int Id { get; set; }
        public string Name { get; set; }

        public Department(int id, string name)
        {
            Id = id;
            Name = name;
        }
        public XElement ToXML(XNamespace ns)
        {

            return new XElement(ns + "Department",
            new XAttribute("Id", Id),
             new XElement(ns + "Name", Name)
                );

        }
        internal static List<Department> GetAllDepartments()
        {
            List<Department> speciesList = new List<Department>();

            //Load the XML file
            XDocument doc = XDocument.Load(_xmlDataPath);
            var xmlDepartmentList = doc.Root.Elements();

            XNamespace ns = doc.Root.GetDefaultNamespace();
            //Get each Department element from the xml
            foreach (var xmlDepartment in xmlDepartmentList)
            {
                //build species object
                Department species = new Department(
                    int.Parse(xmlDepartment.Attribute("Id").Value), xmlDepartment.Element(ns + "Name").Value);
                //add to list 
                speciesList.Add(species);
            }
            return speciesList;
        }

        public static Department GetDepartment(int speciesId)
        {
            //find matching Department and return
            return GetAllDepartments().FirstOrDefault(species => species.Id == speciesId);
        }
    }
}