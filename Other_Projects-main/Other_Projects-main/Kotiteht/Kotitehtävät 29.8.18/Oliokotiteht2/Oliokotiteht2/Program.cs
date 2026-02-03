using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oliokotiteht2
{
    class Program
    {
        static void Main(string[] args)
        {
            

            Console.WriteLine("Yhteen- vai vähennyslasku? (+/-)");

            
            string laskutoimitus = Console.ReadLine();
            Console.WriteLine(laskutoimitus);

            if (laskutoimitus == "+")

            {
                Console.WriteLine("Anna eka luku ");
                var num = Console.ReadLine();
                int luku1 = int.Parse(num);

                Console.WriteLine("Anna toka luku");
                var num2 = Console.ReadLine();
                int luku2 = int.Parse(num2);

                int summa = (luku1 + luku2);
                Console.WriteLine("Summa on " + summa);
            }
            if (laskutoimitus == "-")
             {
                Console.WriteLine("Anna eka luku ");
                var num = Console.ReadLine();
                int luku1 = int.Parse(num);

                Console.WriteLine("Anna toka luku");
                var num2 = Console.ReadLine();
                int luku2 = int.Parse(num2);

                int erotus = (luku1 - luku2);
                Console.WriteLine("Erotus on " + erotus);
            }
            Console.ReadLine();
            }
        }
}
