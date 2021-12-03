using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace RoiBackend
{
    public class Address
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZIP { get; set; }
        public string Country { get; set; }

        public Address(string street, string city, string state, string zip, string country)
        {
            Street = street;
            City = city;
            State = state;
            ZIP = zip;
            Country = country;
        }
        /// <summary>
        /// Convert current object into xml format 
        /// </summary>
        /// <param name="ns">The default namespace to use</param>
        /// <returns></returns>
        public XElement ToXML(XNamespace ns)
        {
            return new XElement(ns + "Address",
                        new XElement(ns + "Street", Street),
                        new XElement(ns + "City", City),
                        new XElement(ns + "State", State),
                        new XElement(ns + "Zip", ZIP),
                        new XElement(ns + "Country", Country)
                );


        }
    }
}