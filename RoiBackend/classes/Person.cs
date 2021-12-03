using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//add
using System.Xml.Linq;

namespace RoiBackend
{
    public class Person
    {
        // TODO add validation for the setters
        #region priv var
        private static string _xmlDataPath = HttpContext.Current.Server.MapPath("~/data/People.xml");
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }

        public Department Department { get; set; }
        public Address Address { get; set; }

        public Person(int id, string name, string phone, Department department, Address address)
        {
            Id = id;
            Name = name;
            Phone = phone;
            Department = department;
            Address = address;
        }

        #region Methods

        #region Reg Methods
        /// <summary>
        ///  Convert the current object into XML format
        /// </summary>
        /// <param name="ns">The default namespace to use.</param>
        /// <returns>return an XElement of the objects</returns>
        public XElement ToXML(XNamespace ns)
        {

            return new XElement(ns + "Person",
            new XAttribute("Id", Id),
             new XElement(ns + "Name", Name),
              new XElement(ns + "Phone", Phone),
               new XElement(ns + "DepartmentId", Department.Id),
                Address.ToXML(ns));

        }
        #endregion

        #region Static Method
        /// <summary>
        /// Get a list of all people from the XML gile 
        /// </summary>
        /// <returns>list of people objects</returns>
        public static List<Person> GetPeople()
        {
            List<Person> personsList = new List<Person>();

            //Load the XML file
            XDocument doc = XDocument.Load(_xmlDataPath);
            var xmlPersonsList = doc.Root.Elements();
            XNamespace ns = doc.Root.GetDefaultNamespace();

            //Get each Department element from the xml
            foreach (var xmlPerson in xmlPersonsList)
            {
                //get department
                int departmentId = int.Parse(xmlPerson.Element(ns + "DepartmentId").Value);
                //get address
                XElement xmlAddress = xmlPerson.Element(ns + "Address");
                Address address = new Address(
                      xmlAddress.Element(ns + "Street").Value,
                      xmlAddress.Element(ns + "City").Value,
                      xmlAddress.Element(ns + "State").Value,
                      xmlAddress.Element(ns + "Zip").Value,
                      xmlAddress.Element(ns + "Country").Value
                    );


                Department department = Department.GetDepartment(departmentId);
                //build department object
                Person person = new Person(
                    int.Parse(xmlPerson.Attribute("Id").Value),
                    xmlPerson.Element(ns + "Name").Value,
                    xmlPerson.Element(ns + "Phone").Value,
                    department,
                    address
                    );
                //add to list 
                personsList.Add(person);
            }
            return personsList;
        }
        public static Person GetPerson(int personId)
        {
            // find matching person and return
            return GetPeople().FirstOrDefault(a => a.Id == personId);
        }

        public static void DeletePerson(int personId)
        {
            try
            {
                // load xml file
                XDocument doc = XDocument.Load(_xmlDataPath);
                XNamespace ns = doc.Root.GetDefaultNamespace();
                // find person in XML doc
                XElement person = doc.Root.Elements().FirstOrDefault(a => a.Attribute("Id").Value == personId.ToString());
                // check if person NOT found - throe exception
                if (person == null)
                {
                    throw new Exception("Person not found.");
                }
                // remove person from XML doc & save
                person.Remove();
                doc.Save(_xmlDataPath);
            }
            catch (Exception)
            {

                throw;
            }


        }
        /// <summary>
        /// Generates the next person ID in the sequence (if not start at 1)
        /// </summary>
        /// <returns>returns the person's ID</returns>
        public static int GetNextPersonId()
        {
            // default starts at 1
            int personId = 1;
            // load XML files
            XDocument doc = XDocument.Load(_xmlDataPath);
            XNamespace ns = doc.Root.GetDefaultNamespace();

            // check for existing persons
            if (doc.Root.Elements(ns + "Person").Any())
            {
                // find max person ID and increment
                personId += doc.Root.Elements(ns + "Person").Max(a => int.Parse(a.Attribute("Id").Value));
            }

            return personId;
        }
        /// <summary>
        /// Add an person to XML file
        /// </summary>
        /// <param name="name">person name</param>
        /// <param name="phone">owner phone</param>
        /// <param name="department">person department</param>
        /// <param name="address">owner address</param>
        /// <returns>return ID of person added</returns>
        public static int AddPerson(string name, string phone, Department department, Address address)
        {
            // get the next person ID (Auto increment if there are existing persons)
            int personId = Person.GetNextPersonId();
            try
            {
                // create person object
                Person person = new Person(personId, name, phone, department, address);
                // load xml file
                XDocument doc = XDocument.Load(_xmlDataPath);
                XNamespace ns = doc.Root.GetDefaultNamespace();
                // convert person to XML
                XElement personXML = person.ToXML(ns);
                // add person to XML doc and save
                doc.Root.Add(personXML);
                doc.Save(_xmlDataPath);
            }
            catch (Exception)
            {

                throw;
            }
            return personId;
        }
        /// <summary>
        /// Update an person in the XML and return the ID
        /// </summary>
        /// <param name="person">The person object to update</param>
        /// <returns>return the updated persons ID</returns>
        public static int UpdatePerson(Person person)
        {

            try
            {
                // load xml file
                XDocument doc = XDocument.Load(_xmlDataPath);
                XNamespace ns = doc.Root.GetDefaultNamespace();
                // find person in XML doc
                XElement xmlPerson = doc.Root.Elements().FirstOrDefault(a => a.Attribute("Id").Value == person.Id.ToString());
                // check if person NOT found - throe exception
                if (person == null)
                {
                    throw new Exception("Person not found.");
                }
                // replace current person element with new persons data
                xmlPerson.ReplaceWith(person.ToXML(ns));
                // save doc
                doc.Save(_xmlDataPath);
            }
            catch (Exception)
            {

                throw;
            }

            return person.Id;
        }
        #endregion 

        #endregion
    }
    #endregion
}