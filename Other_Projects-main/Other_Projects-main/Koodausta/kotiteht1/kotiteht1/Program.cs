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
            Console.WriteLine("Anna kolme lukua");
            Console.WriteLine("Anna eka luku ");
            var num = Console.ReadLine();
            int luku = int.Parse(num);

            Console.WriteLine("Anna toka luku ");
            var num2 = Console.ReadLine();
            int luku2 = int.Parse(num2);

            Console.WriteLine("Anna kolmas luku ");
            var num3 = Console.ReadLine();
            int luku3 = int.Parse(num3);


            int tulos = (luku + luku2 + luku3) / 3;
            Console.WriteLine("Lukujen keskiarvo on " + tulos);
            Console.ReadLine();
           
            
        }
    }
}
