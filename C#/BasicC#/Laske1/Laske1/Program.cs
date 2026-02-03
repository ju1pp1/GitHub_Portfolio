using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Laske1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Anna eka luku"); // tulosta 
            var num = Console.ReadLine(); // lue rivi tekstinä
            int luku = int.Parse(num); //muuta "num" numeroksi

            Console.WriteLine("Anna toinen luku"); // tulosta 
            var num2 = Console.ReadLine(); // lue rivi tekstinä
            int luku2 = int.Parse(num2); //muuta "num" numeroksi

            Console.WriteLine("Anna viimeinen luku"); // tulosta 
            var num3 = Console.ReadLine(); // lue rivi tekstinä
            int luku3 = int.Parse(num3); //muuta "num" numeroksi

            double summa = (luku + luku2+luku3) /3.0; //laske
            // tulosta
            if (summa < 2)
            {
                Console.WriteLine("Skarppaa vähän");
            }
            else
            {
                Console.WriteLine(summa);
            }
        }
    }
}
