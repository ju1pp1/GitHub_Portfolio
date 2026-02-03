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
            Console.WriteLine("Anna luku");
            var num = Console.ReadLine();
            int luku = int.Parse(num);

            Console.WriteLine("Anna toinen luku");
            var num2 = Console.ReadLine();
            int luku2 = int.Parse(num2);

            Console.WriteLine("Anna kolmas luku");
            var num3 = Console.ReadLine();
            int luku3 = int.Parse(num3);

            double summa = (luku + luku2 + luku3) / 3.0;
            if (summa < 2)
            {
                Console.WriteLine("Skarppaa vähän");
                Console.ReadLine();
            }
            else
            {
                Console.WriteLine("keskiarvo on " + summa);
                Console.ReadLine();
            }
        }
    }
}
