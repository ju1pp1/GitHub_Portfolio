using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleInherit
{
    class Teacher : Staff
    {
        public string Pääaine { get; set; }
        public override string ToString()
        {
            return base.ToString() + ", "+ Pääaine;
        }
    }
}
