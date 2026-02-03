using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LuokatKotitehtava
{
    class Program
    {
        static void Main(string[] args)
        {
            Tervehtijä tervehtijä = new Tervehtijä("Moi vaan!");
            tervehtijä.AsetaTervehtijä("Mitä kuuluu?");

            Tulosta(tervehtijä);
            Console.ReadLine();
        }
            private static void Tulosta(Tervehtijä tervehtijä)
            {
            Console.WriteLine(tervehtijä.HaeTervehtijä());
            }
        }
    }

