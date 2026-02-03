using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hellooo
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("What's your last name?"); //cwTABTAB = Console.Writeline
            var Lname = Console.ReadLine();
            Console.WriteLine("What's your first name?");
            string Fname = Console.ReadLine();
            Console.WriteLine($"Hello " + Lname + " " + Fname + "!");
            Console.ReadLine(); // pysähtyy tähän
        }
    }
}
