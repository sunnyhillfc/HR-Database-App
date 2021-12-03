using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace RoiBackend
{
    /// <summary>
    /// Summary description for RoiWebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class RoiWebService : System.Web.Services.WebService
    {

        [WebMethod(Description = "Get all departments"), ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public string GetDepartments()
        {
            try
            {
                // Response code ok (200)
                Context.Response.StatusCode = 200;
                //serialise the data to JSON format
                return new JavaScriptSerializer().Serialize(Department.GetAllDepartments());


            }
            catch (Exception)
            {
                // error out the arse (500)
                Context.Response.StatusCode = 500;
                List<Department> spiciesList = new List<Department>();
                return new JavaScriptSerializer().Serialize(new List<Department>());
            }

        }


        [WebMethod(Description = "Get all people"), ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public string GetPeople()
        {
            try
            {
                // Response code ok (200)
                Context.Response.StatusCode = 200;

                //serialise the data to JSON format
                return new JavaScriptSerializer().Serialize(Person.GetPeople());


            }
            catch (Exception)
            {
                // error out the arse (500)
                Context.Response.StatusCode = 500;
                List<Department> spiciesList = new List<Department>();
                return new JavaScriptSerializer().Serialize(new List<Department>());
            }

        }
        [WebMethod(Description = "Get a person by ID"), ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public string GetPerson(int personId)
        {
            try
            {
                //get a person by id
                Person person = Person.GetPerson(personId);

                //check if person doesnt exist 
                if (person == null)
                {
                    Context.Response.StatusCode = 404;
                    return new JavaScriptSerializer().Serialize(new { Message = "Person does not exist." });
                }

                // Response code ok (200)
                Context.Response.StatusCode = 200;

                //serialise the data to JSON format
                return new JavaScriptSerializer().Serialize(person);


            }
            catch (Exception ex )
            {
                // error out the arse (500)
                Context.Response.StatusCode = 500;
                
                //return error message
                return new JavaScriptSerializer().Serialize(new { Message = "problem getting animal from file " + ex.Message });
            }


        }
        [WebMethod(Description = "Delete a person by ID"), ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public string DeletePerson(int personId)
        {
            try
            {
                //get a person by id
                Person person = Person.GetPerson(personId);

                //check if person doesnt exist 
                if (person == null)
                {
                    Context.Response.StatusCode = 404;
                    return new JavaScriptSerializer().Serialize(new { Message = "Person does not exist." });
                }
                //remove an animal from the xml file 
                Person.DeletePerson(personId);

                // Response code ok (200)
                Context.Response.StatusCode = 200;

                //serialise the data to JSON format
                return new JavaScriptSerializer().Serialize(new { personId = personId });


            }
            catch (Exception ex)
            {
                // error out the arse (500)
                Context.Response.StatusCode = 500;

                //return error message
                return new JavaScriptSerializer().Serialize(new { Message = "problem deleting person from file " + ex.Message });
            }

        }
        [WebMethod(Description = "Add a person"), ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public string AddPerson(string name, string phone, int departmentId, string street, string city, string state, string zip, string country)
        {
            try
            {
                //check if department exists
                if (departmentId <0)
                {
                    Context.Response.StatusCode = 400;
                    return new JavaScriptSerializer().Serialize(new { Message = "Department does not exist."});
                }
                //get a department by id
                Department department = Department.GetDepartment(departmentId);

                //check if person doesnt exist 
                if (department == null)
                {
                    Context.Response.StatusCode = 404;
                    return new JavaScriptSerializer().Serialize(new { Message = "department does not exist." });
                }
                //add the person into the xml file 
                int personId = Person.AddPerson(name, phone, department,
                    new Address(street, city, state, zip, country));

                // Response code ok (200)
                Context.Response.StatusCode = 200;

                //serialise the data to JSON format
                return new JavaScriptSerializer().Serialize(new { personId = personId });


            }
            catch (Exception ex)
            {
                // error out the arse (500)
                Context.Response.StatusCode = 500;

                //return error message
                return new JavaScriptSerializer().Serialize(new { Message = "problem saving from file " + ex.Message });
            }


        }
        [WebMethod(Description = "edit a person"), ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public string UpdatePerson(int personId, string name, string phone, int departmentId, string street, string city, string state, string zip, string country)
        {
            try
            {
                //check if department exists
                if (departmentId < 0)
                {
                    Context.Response.StatusCode = 400;
                    return new JavaScriptSerializer().Serialize(new { Message = "Department does not exist." });
                }
                //get a person by id
                Person person = Person.GetPerson(personId);

                //check if person doesnt exist 
                if (person == null)
                {
                    Context.Response.StatusCode = 404;
                    return new JavaScriptSerializer().Serialize(new { Message = "person does not exist." });
                }
                //get a department by id
                Department department = Department.GetDepartment(departmentId);
                
                //check if person doesnt exist 
                if (department == null)
                {
                    Context.Response.StatusCode = 404;
                    return new JavaScriptSerializer().Serialize(new { Message = "department does not exist." });
                }
                //update the person object data 
                person.Name = name;
                person.Phone = phone;
                person.Department = department;
                person.Address = new Address(
                    street, city, state, zip, country);

                //Update the person in the XML file 
                Person.UpdatePerson(person);

                // Response code ok (200)
                Context.Response.StatusCode = 200;

                //Return the person ID
                return new JavaScriptSerializer().Serialize(new { personId });


            }
            catch (Exception ex)
            {
                // error out the arse (500)
                Context.Response.StatusCode = 500;

                //return error message
                return new JavaScriptSerializer().Serialize(new { Message = "problem saving from file " + ex.Message });
            }


        }
    }
}
