using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lista2
{
    class Person
    {
        string firstname;
        string lastname;
        // muodostin
        public Person() { }

        public Person(string v1, string v2)
        {
            firstname = v1;
            lastname = v2;
        }        

        public string Tulosta()
        {
            return firstname + " " + lastname;
        }

        public void SetFirstName(string v)
        {
            firstname = v;
        }

        public void SetLastName(string v)
        {
            lastname = v;
        }
    }
}
