using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hello1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Etunimesi on?"); // cw<TAB><TAB>
            var etunimi = Console.ReadLine();
            
            Console.WriteLine("Sukunimesi on?"); 
            string sukunimi = Console.ReadLine();

            Console.WriteLine("Hello " + sukunimi + " "+etunimi + "!");
            Console.ReadLine(); // pysähtyy tähän
        }
    }
}
