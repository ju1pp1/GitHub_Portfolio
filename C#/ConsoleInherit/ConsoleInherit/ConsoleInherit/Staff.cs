using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleInherit
{
    class Staff : Person
    {
        public int Palkka { get; set; }
        // KORVAA OLETUSTOTEUTUS
        public override string ToString()
        {
            return base.ToString() + ", " + Palkka+"e";
        }
    }

    
}
