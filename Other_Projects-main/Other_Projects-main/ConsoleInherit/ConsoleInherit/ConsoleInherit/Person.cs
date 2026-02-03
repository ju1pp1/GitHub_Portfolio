using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleInherit
{
    class Person
    {
        public string Etunimi { get; set; }
        public string Sukunimi { get; set; }

        public Person() { }

        public Person(string etu, string suku)
        {
            Etunimi = etu;
            Sukunimi = suku;
        }

        public override string ToString()
        {
            return Etunimi + " " + Sukunimi;
        }
    }
}
