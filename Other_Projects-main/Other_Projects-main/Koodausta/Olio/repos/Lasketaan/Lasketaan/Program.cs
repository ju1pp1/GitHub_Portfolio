using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lasketaan
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Anna luku");
            string teksti = Console.ReadLine();
            double luku = double.Parse(teksti);
            double tulos = Math.Sqrt(luku);
                Console.WriteLine("Tulos on" + tulos);

        }
    }
}
