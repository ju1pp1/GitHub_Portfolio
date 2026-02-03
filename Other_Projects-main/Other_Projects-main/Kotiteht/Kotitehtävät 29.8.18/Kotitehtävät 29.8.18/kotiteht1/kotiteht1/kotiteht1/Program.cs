using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace kotiteht1
{
    class Program
    {
        static void Main(string[] args)
        {
            
            int lukumaara = 0, luku = 0, i;
            double summa = 0, KA;
            Console.WriteLine("Montako lukua");
            lukumaara = int.Parse(Console.ReadLine());

            for (i = 0; i < lukumaara; i++)
            {
                luku = int.Parse(Console.ReadLine());
                summa += luku;
            }
            KA = summa / lukumaara;
            Console.WriteLine("Lukujen summa on: " + summa);
            Console.WriteLine("Lukujen keskiarvo on: " + KA);

            Console.ReadLine();
        }
    }
}
