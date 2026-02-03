using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace statickotitehtava
{
    class Program
    {
        static void Main(string[] args)
        {
            MinunLuokka.Nimi = "Oma luokka";
            Console.WriteLine(MinunLuokka.TulostaNimi());
        }
    }
}
