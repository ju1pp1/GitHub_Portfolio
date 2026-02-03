using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleInherit
{
    class Student : Person
    {
        public int Opintopisteet { get; set; }
        public Student() {  }

        public Student(string etu, string suku)
        {
            Etunimi = etu;
            Sukunimi = suku;
        }
    }
}
