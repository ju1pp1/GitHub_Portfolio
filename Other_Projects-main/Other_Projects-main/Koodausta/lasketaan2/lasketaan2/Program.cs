using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lasketaan2
{
    class Program
    {
        static void Main(string[] args)
        {
            double luku1 = Math.PI();
            double luku2 =
            
            Random r = new Random();
            
            for (int Rivi = 0; Rivi < 2; Rivi++)
            {
                for (int sarake = 0; sarake < 13; sarake++)
                {
                    num = r.Next();
                }
                double luku = r.NextDouble();

                Console.WriteLine("tulos on " + Math.Floor(luku * 3 + 4));
                {
                    double luku = r.NextDouble();
                if (Math.Floor(luku * 3 + 1) == 3)
                {
                    Console.WriteLine("Veikkaus X");
                }
                
                    else
                { 
                    Console.WriteLine("Veikkaus " + Math.Floor(luku * 3 + 1));
                }
            }
            Console.ReadLine();
        }
    }
}
